import json
import boto3
import logging

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')
tour_table = dynamodb.Table('ToursInfo')
booking_table = dynamodb.Table('TourBookingInfo')

# Configure logging
logging.basicConfig(level=logging.INFO)

def lambda_handler(event, context):
    try:
        # Log the entire event for debugging
        logging.info(f"Received event: {json.dumps(event)}")

        # Ensure the 'body' key exists in the event and parse it as JSON
        if 'body' not in event or not event['body']:
            logging.error("Request body is missing")
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  
                    'Access-Control-Allow-Methods': 'PUT, OPTIONS'
                },
                'body': json.dumps({'error': 'Request body is missing or empty'})
            }

        # Parse the request body
        body = json.loads(event['body'])

        # Log the parsed body for debugging
        logging.info(f"Parsed body: {body}")

        # Extract the OrderID from the request
        order_id = body.get('OrderID')

        if not order_id:
            logging.error("OrderID is missing in the request")
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  
                    'Access-Control-Allow-Methods': 'PUT, OPTIONS'
                },
                'body': json.dumps({'error': 'OrderID is required'})
            }

        # Retrieve the booking info from the TourBookingInfo table
        booking_response = booking_table.get_item(Key={'OrderID': order_id})

        if 'Item' not in booking_response:
            logging.error("Booking not found")
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  
                    'Access-Control-Allow-Methods': 'PUT, OPTIONS'
                },
                'body': json.dumps({'error': 'Booking not found'})
            }

        # Extract relevant fields from the booking
        booking = booking_response['Item']
        attraction_id = booking['AttractionID']
        start_date = booking['StartDate']
        seats_booked = booking['SeatsBooked']

        # Retrieve the tour info from the ToursInfo table using AttractionID and StartDate
        tour_response = tour_table.get_item(Key={'AttractionID': attraction_id, 'StartDate': start_date})

        if 'Item' not in tour_response:
            logging.error("Tour not found")
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  
                    'Access-Control-Allow-Methods': 'PUT, OPTIONS'
                },
                'body': json.dumps({'error': 'Tour not found'})
            }

        # Extract available seats from the tour info
        tour_info = tour_response['Item']
        available_seats = tour_info['AvailableSeats']

        # Reduce the available seats in the ToursInfo table
        new_available_seats = int(available_seats) - int(seats_booked)
        if new_available_seats < 0:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  
                    'Access-Control-Allow-Methods': 'PUT, OPTIONS'
                },
                'body': json.dumps({'error': 'Not enough seats available'})
            }

        # Update the available seats in the ToursInfo table
        tour_table.update_item(
            Key={'AttractionID': attraction_id, 'StartDate': start_date},
            UpdateExpression='SET AvailableSeats = :new_seats',
            ExpressionAttributeValues={':new_seats': int(new_available_seats)}
        )

        # Return success response
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',  
                'Access-Control-Allow-Methods': 'PUT, OPTIONS'
            },
            'body': json.dumps({
                'message': 'Seats updated!',
                'RemainingSeats': new_available_seats
            })
        }

    except Exception as e:
        logging.error(f"Error updating seats: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',  
                'Access-Control-Allow-Methods': 'PUT, OPTIONS'
            },
            'body': json.dumps({'error': 'Internal server error', 'details': str(e)})
        }