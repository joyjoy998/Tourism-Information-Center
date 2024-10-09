import json
import boto3
import logging
import uuid
from datetime import datetime
from decimal import Decimal  # Import Decimal to handle numbers
import pytz

# Configure logging
logging.basicConfig(level=logging.INFO)

# Initialize DynamoDB resources
dynamodb = boto3.resource('dynamodb')
booking_table = dynamodb.Table('TourBookingInfo')  # Corrected name
tour_table = dynamodb.Table('ToursInfo')  # Corrected name

def lambda_handler(event, context):
    # Log the entire event for debugging
    logging.info(f"Received event: {json.dumps(event)}")

    # Check if 'body' is present and not None
    if event.get('body') is None:
        logging.error("Request body is missing or None")
        return {
            'statusCode': 400,
            'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' 
                },
            'body': json.dumps({'error': 'Request body is missing or empty'})
        }

    # Parse the request body
    try:
        body = json.loads(event['body'])
        logging.info(f"Parsed body: {body}")
    except json.JSONDecodeError as e:
        logging.error(f"JSON Decode Error: {str(e)}")
        return {
            'statusCode': 400,
            'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' 
                },
            'body': json.dumps({'error': 'Invalid JSON format'})
        }

    # Generate unique OrderID
    order_id = str(uuid.uuid4())

    # Capture current booking time
    australia_tz = pytz.timezone('Australia/Sydney')
    booking_time = datetime.now(australia_tz).strftime('%d/%m/%Y %H:%M:%S')

    # Retrieve tour price from ToursInfo table based on AttractionID and StartDate
    try:
        tour_response = tour_table.get_item(Key={
            'AttractionID': body['AttractionID'],
            'StartDate': body['StartDate']
        })

        if 'Item' not in tour_response:
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' 
                },
                'body': json.dumps({'error': 'Tour not found'})
            }

        # Extract the price per seat from the tour info
        tour_info = tour_response['Item']
        price_per_seat = Decimal(str(tour_info['Price']))
    except Exception as e:
        logging.error(f"Error retrieving tour info: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' 
                },
            'body': json.dumps({'error': 'Internal server error', 'details': str(e)})
        }

    # Calculate the total price based on seats booked
    seats_booked = int(body['SeatsBooked'])
    total_price = price_per_seat * seats_booked

    # Prepare the booking data to insert into DynamoDB, using Decimal for numbers
    booking_data = {
        'OrderID': order_id,
        'AttractionID': body['AttractionID'],
        'BookingTime': booking_time,
        'BookingStatus': 'Booked',  # Default status when booking is made
        'customerID': body['customerID'],
        'customerName': body['customerName'],
        'PhoneNumber': body['PhoneNumber'],
        'SeatsBooked': seats_booked,  
        'StartDate': body['StartDate'],
        'TotalPrice': total_price  # Calculated total price
    }

    # Insert booking data into DynamoDB
    try:
        logging.info(f"Inserting booking data into DynamoDB: {booking_data}")
        booking_table.put_item(Item=booking_data)  # Corrected the booking table variable
    except Exception as e:
        logging.error(f"Error inserting data into DynamoDB: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' 
                },
            'body': json.dumps({'error': 'Internal server error', 'details': str(e)})
        }

    # Return a success response including additional information
    return {
        'statusCode': 200,
        'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' 
                },
        'body': json.dumps({
            'message': 'Booking created successfully',
            'OrderID': order_id,
            'BookingTime': booking_time,
            'customerID': body['customerID'],
            'customerName': body['customerName'],
            'PhoneNumber': body['PhoneNumber'],
            'SeatsBooked': seats_booked,
            'StartDate': body['StartDate'],
            'TotalPrice': float(total_price)  # Return as float for the response
        })
    }