import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDB({ region: "ap-southeast-2" });
const docClient = DynamoDBDocumentClient.from(client);
const tableName = "VisitorInfo";

export const handler = async (event) => {
  // Log the entire event to see what the Lambda function receives
  console.log("Received event:", JSON.stringify(event, null, 2));

  // Extract the city parameter from the query string
  const params = event.queryStringParameters || {};
  const { city = "" } = params;

  // Log the extracted city parameter
  console.log("Received City Parameter:", city);

  // Trim whitespace from the input
  const trimmedCity = city.trim();

  // Check if the input is empty after trimming
  if (!trimmedCity) {
    console.log("City parameter is empty after trimming.");
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET'
      },
      body: JSON.stringify({
        message: "Please provide a city name for the search.",
      }),
    };
  }

  // Log the trimmed city
  console.log("Trimmed City Parameter:", trimmedCity);

  // DynamoDB query parameters to perform a fuzzy search by city
  let dbParams = {
    TableName: tableName,
    FilterExpression: "contains(#c, :city)",
    ExpressionAttributeValues: {
      ":city": trimmedCity
    },
    ExpressionAttributeNames: {
      "#c": "City"
    }
  };

  try {
    const command = new ScanCommand(dbParams);
    const result = await docClient.send(command);

    // Log the query result
    console.log("DynamoDB Query Result:", JSON.stringify(result.Items));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET'
      },
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error("Error querying DynamoDB:", error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET'
      },
      body: JSON.stringify({ 
        message: "An error occurred while processing your request",
        error: error.message 
      }),
    };
  }
};
