import json
import boto3
from boto3.dynamodb.conditions import Attr
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ToursInfo')

# Function to convert Decimal to float or int
def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj) if obj % 1 else int(obj)
    raise TypeError

def lambda_handler(event, context):
    attraction_id = event['pathParameters']['AttractionID']
    
    try:
        # Scan the ToursInfo table using AttractionID as a filter
        response = table.scan(
            FilterExpression=Attr('AttractionID').eq(attraction_id)
        )
        
        # Check if there are any results
        if response['Items']:
            # Return all items with the same AttractionID
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' 
                },
                'body': json.dumps(response['Items'], default=decimal_default)
            }
        else:
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' 
                },
                'body': json.dumps({'error': 'Tour not found'})
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' 
                },
            'body': json.dumps({'error': str(e)})
        }