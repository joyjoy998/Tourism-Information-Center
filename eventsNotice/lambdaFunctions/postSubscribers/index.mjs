// Use modern import syntax for AWS SDK and Luxon
import AWS from 'aws-sdk';
import { DateTime } from 'luxon';

// Initialize DynamoDB client
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
    // Parse the incoming request body (JSON)
    const body = JSON.parse(event.body);

    // Extract email from request body
    const email = body.email;
    
    // Get the current date in Australia/Sydney timezone
    const subscriptionDate = DateTime.now().setZone('Australia/Sydney').toISO(); 

    // Define the DynamoDB put parameters
    const params = {
        TableName: 'Subscribers',
        Item: {
            email: email, // Primary key
            subscription_date: subscriptionDate // Subscription date in Sydney timezone
        }
    };

    try {
        // Insert data into DynamoDB
        await dynamoDb.put(params).promise();

        // Return success response with CORS headers
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow all origins
                'Access-Control-Allow-Headers': 'Content-Type', // Allow specific headers
                'Access-Control-Allow-Methods': 'POST, OPTIONS' // Allow specific methods
            },
            body: JSON.stringify({ message: 'Subscription successful!' })
        };
    } catch (error) {
        // Log error and return failure response with CORS headers
        console.error('Error saving subscription:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*', // CORS header for error response as well
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify({ message: 'Subscription failed', error: error.message })
        };
    }
};
