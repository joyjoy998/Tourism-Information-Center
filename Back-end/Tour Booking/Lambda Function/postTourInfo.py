import json
import boto3
import logging
import uuid
import requests
from datetime import datetime
import pytz

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')
booking_table = dynamodb.Table('Payments')

# Configure logging
logging.basicConfig(level=logging.INFO)

# URL for update API
UPDATE_BOOKING_STATUS = "https://ola38vny51.execute-api.ap-southeast-2.amazonaws.com/test/updateBookingStatus"
UPDATE_SEATS_API_URL = "https://wgjwr0556i.execute-api.ap-southeast-2.amazonaws.com/test/updateSeats"

def lambda_handler(event, context):
    # Handle CORS preflight request
    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        }
    
    try:
        # Parse the incoming request body
        body = json.loads(event['body'])
        order_id = body['OrderID']
        amount = body['Amount']

        # Generate PaymentID and PaymentDate
        payment_id = str(uuid.uuid4())
        australia_tz = pytz.timezone('Australia/Sydney')
        payment_date = datetime.now(australia_tz).strftime('%d/%m/%Y')

        # Define the new payment data
        payment_data = {
            'PaymentID': payment_id,
            'OrderID': order_id,
            'Amount': amount,
            'PaymentDate': payment_date,
            'PaymentMethod': 'credit card',  # Default payment method
            'PaymentStatus': 'success'       # Default payment status
        }

        # Insert the data into the DynamoDB Payments table
        booking_table.put_item(Item=payment_data)
        
        # Log the successful operation
        logging.info(f"Payment added successfully for OrderID: {order_id}")

        headers = {'Content-Type': 'application/json'}
        
        # Call external APIs to update booking status and seats
        update_booking_status_response = requests.put(UPDATE_BOOKING_STATUS, json={"OrderID": order_id}, headers=headers)
        update_seats_response = requests.put(UPDATE_SEATS_API_URL, json={"OrderID": order_id}, headers=headers)

        # Check responses from the external APIs
        if update_booking_status_response.status_code != 200:
            logging.error(f"Failed to update booking status for OrderID: {order_id}. Response: {update_booking_status_response.text}")
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                'body': json.dumps({"message": "Failed to update booking status."})
            }

        if update_seats_response.status_code != 200:
            logging.error(f"Failed to update seats for OrderID: {order_id}. Response: {update_seats_response.text}")
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                'body': json.dumps({"message": "Failed to update seats."})
            }

        # Create the response
        response = {
            "message": "Booking confirmed!",
            "OrderID": order_id
        }

        # Return the response with CORS headers
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',  # Allow requests from any origin
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps(response)
        }

    except Exception as e:
        logging.error(f"Error processing payment: {e}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',  # CORS headers for error response as well
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps({"message": "An error occurred while processing the payment."})
        }