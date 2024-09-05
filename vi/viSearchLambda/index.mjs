const AWS = require("aws-sdk");

AWS.config.update({ region: "ap-southeast-2" });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = "VisitorInfo";

exports.handler = async (event) => {
  const params = event.queryStringParameters || {}; // Get query string parameters
  const { name, state, city } = params; // Query parameters entered by the user

  let dbParams = {
    TableName: tableName,
  };

  if (name || state || city) {
    // Construct Scan operation parameters
    dbParams.FilterExpression = "";
    dbParams.ExpressionAttributeValues = {};

    // Fuzzy search by attraction name
    if (name) {
      dbParams.FilterExpression += "contains(Name, :name)";
      dbParams.ExpressionAttributeValues[":name"] = name;
    }

    // Fuzzy search by state
    if (state) {
      if (dbParams.FilterExpression) dbParams.FilterExpression += " OR ";
      dbParams.FilterExpression += "contains(State, :state)";
      dbParams.ExpressionAttributeValues[":state"] = state;
    }

    // Fuzzy search by city
    if (city) {
      if (dbParams.FilterExpression) dbParams.FilterExpression += " OR ";
      dbParams.FilterExpression += "contains(City, :city)";
      dbParams.ExpressionAttributeValues[":city"] = city;
    }
  } else {
    // If no query parameters provided, return an error message
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Please provide Name, State, or City for the search",
      }),
    };
  }

  try {
    const result = await dynamodb.scan(dbParams).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error("Error querying DynamoDB:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server Error" }),
    };
  }
};
