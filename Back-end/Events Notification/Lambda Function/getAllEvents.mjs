import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

// Initialize the DynamoDB client
const client = new DynamoDB({ region: "ap-southeast-2" });
const docClient = DynamoDBDocumentClient.from(client);

// Define the table name for the attractions
const resultTableName = "Events";

export const handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  // DynamoDB scan parameters to fetch all attractions from the table
  const scanParams = {
    TableName: resultTableName,
  };

  try {
    // Execute the Scan command to retrieve all items from the table
    const scanCommand = new ScanCommand(scanParams);
    const scanResult = await docClient.send(scanCommand);

    console.log("Scan Result:", JSON.stringify(scanResult, null, 2));

    // Check if no items were returned
    if (!scanResult.Items || scanResult.Items.length === 0) {
      console.log("No attractions found.");
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        },
        body: JSON.stringify([]), // Return an empty array if no items found
      };
    }

    // Return the fetched events
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: JSON.stringify(scanResult.Items),
    };

  } catch (error) {
    console.error("Error processing the request:", error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: JSON.stringify({ 
        message: "An error occurred while fetching data",
        error: error.message 
      }),
    };
  }
};
