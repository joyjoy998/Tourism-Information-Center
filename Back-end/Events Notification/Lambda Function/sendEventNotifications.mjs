import AWS from 'aws-sdk';
import { DateTime } from 'luxon';  // for timezone and time manipulation

const dynamodb = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES();

// Define table names
const EVENTS_TABLE = 'Events';
const SUBSCRIBERS_TABLE = 'Subscribers';

// Get upcoming events
const getUpcomingEvents = async () => {
  // Set the duration to 7 days
  const now = DateTime.now().setZone('Australia/Sydney');
  const nextWeek = now.plus({ days: 7 });

  const params = {
    TableName: EVENTS_TABLE,
    FilterExpression: '#start_date BETWEEN :now AND :nextWeek',
    ExpressionAttributeNames: {
      '#start_date': 'start_date',
    },
    ExpressionAttributeValues: {
      ':now': now.toISODate(),
      ':nextWeek': nextWeek.toISODate(),
    },
  };

  const result = await dynamodb.scan(params).promise();
  return result.Items;
};

// Get all subscribers
const getSubscribers = async () => {
  const params = {
    TableName: SUBSCRIBERS_TABLE,
  };

  const result = await dynamodb.scan(params).promise();
  return result.Items.map(item => item.email);
};

// Send email notification
const sendEmail = async (email, events) => {
  const eventDetails = events.map(event => `
    <p><strong>${event.event_name}</strong></p>
    <p>${event.description}</p>
    <p><strong>Date:</strong> ${event.start_date} - ${event.end_date}</p>
    <p><strong>Location:</strong> ${event.address}</p>
    <p><a href="${event.organiser_website}">More details</a></p>
  `).join('<hr/>');

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <h1>Upcoming Events for the Next Week</h1>
            ${eventDetails}
          `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Upcoming Events for Next Week',
      },
    },
    Source: 'quillaho@outlook.com', 
  };

  await ses.sendEmail(params).promise();
};

// Lambda handler function
export const handler = async (event) => {
  try {
    // Get all events happening in the upcoming week
    const events = await getUpcomingEvents();
    if (events.length === 0) {
      console.log('No upcoming events found.');
      return;
    }

    // Get subscribers
    const subscribers = await getSubscribers();
    if (subscribers.length === 0) {
      console.log('No subscribers found.');
      return;
    }

    // Send email to subscribers
    for (const email of subscribers) {
      await sendEmail(email, events);
    }

    console.log('Emails sent successfully!');
  } catch (error) {
    console.error('Error sending emails:', error);
  }
};
