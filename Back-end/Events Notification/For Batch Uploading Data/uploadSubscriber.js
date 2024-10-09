const AWS = require("aws-sdk");

AWS.config.update({ region: "ap-southeast-2" });

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = "Subscribers";

//upload a subscription record for testing purposes
const subscriberData = {
  email: "quillaho@outlook.com", 
  subscription_date: new Date().toISOString() 
};

const uploadSubscriber = async () => {
  const params = {
    TableName: tableName,
    Item: subscriberData
  };

  try {
    await dynamodb.put(params).promise();
    console.log(`Successfully added subscriber: ${subscriberData.email}`);
  } catch (error) {
    console.error("Unable to add subscriber:", error.message);
  }
};

uploadSubscriber();
