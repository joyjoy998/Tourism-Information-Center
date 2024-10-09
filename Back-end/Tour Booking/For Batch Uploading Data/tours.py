import csv
import boto3
import logging
logging.basicConfig(filename='dynamodb_errors.log', level=logging.ERROR)



# Initialize a session using Amazon DynamoDB
dynamodb = boto3.resource('dynamodb', region_name='ap-southeast-2')

# Specify the DynamoDB table
table = dynamodb.Table('ToursInfo')

# Open the CSV file
with open('tours.csv', 'r') as csvfile:
    csv_reader = csv.DictReader(csvfile)  # Read rows as dictionaries
    success_count = 0
    fail_count = 0
    for row in csv_reader:
        try:
            table.put_item(
                Item={
                    'AttractionID': row['AttractionID'],
                    'StartDate': row['StartDate'],
                    'AvailableSeats': int(row['AvailableSeats']),
                    'CreatedAt': row['CreatedAt'],
                    'Description': row['Description'],
                    'EndDate': row['EndDate'],
                    'Location': row['Location'],
                    'Price': int(row['Price']), 
                    'TourName': row['TourName'],
                    'UpdatedAt': row['UpdatedAt'] 
                }
            )
            success_count += 1
        except Exception as e:
            logging.error(f"Failed to upload record: {row} - Error: {e}")
            fail_count += 1

    print(f"Uploaded successfully: {success_count} records")
    print(f"Failed uploads: {fail_count}")
