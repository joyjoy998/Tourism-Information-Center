import json
import boto3
import logging

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')
booking_table = dynamodb.Table('TourBookingInfo')

# Configure logging
logging.basicConfig(level=logging.INFO)

def lambda_handler(event, context):
    try:
        # Log the entire event for debugging
        logging.info(f"Received event: {json.dumps(event)}")

        # Parse the request body with error handling
        if 'body' not in event or not event['body']:
            print("No body in event")
            return {
                'statusCode': 400,
                'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',  
                'Access-Control-Allow-Methods': 'PUT, OPTIONS'
            },
            'body': json.dumps({'error': 'Request body is missing'})
        }

        try:
            body = json.loads(event['body'])
        except json.JSONDecodeError:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  
                    'Access-Control-Allow-Methods': 'PUT, OPTIONS'
                },
                'body': json.dumps({'error': 'Invalid JSON format'})
            }

        # Extract the OrderID from the request
        order_id = body.get('OrderID')
        if not order_id:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  
                    'Access-Control-Allow-Methods': 'PUT, OPTIONS'
                },
                'body': json.dumps({'error': 'OrderID is required'})
            }

        
        # Step 1: Retrieve the booking info from the TourBookingInfo table
        booking_response = booking_table.get_item(Key={'OrderID': order_id})
        
        if 'Item' not in booking_response:
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  
                    'Access-Control-Allow-Methods': 'PUT, OPTIONS'
                },
                'body': json.dumps({'error': 'Booking not found'})
            }

        # Update the booking status to 'Confirmed'
        booking_table.update_item(
            Key={'OrderID': order_id},
            UpdateExpression='SET BookingStatus = :status',
            ExpressionAttributeValues={':status': 'Confirmed'}
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
                'message': 'Booking Status updated!',
                'OrderID': order_id
            })
        }

    except Exception as e:
        logging.error(f"Error processing booking confirmation: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  
                    'Access-Control-Allow-Methods': 'PUT, OPTIONS'
                },
            'body': json.dumps({'error': 'Internal server error', 'details': str(e)})
        }