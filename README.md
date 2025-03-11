## PLEASE NOTE: This repo is just for group assignment of CSCI927

The project is structured into frontend and backend components based on AWS Lambda serverless architecture, which means no Docker container is needed to host the code. The frontend is primarily built with HTML, CSS, and JavaScript, and communicates with the backend via REST APIs for data transfer. The backend code is deployed on AWS Lambda functions, with API Gateway providing the necessary endpoints for the frontend.

The microservices for visitor information and events notification are implemented in Node.js, while tour booking is built using Python. Each service has its own directory structure where "lambda function" refers to the various sub-services that compose the microservice, and "lambda layer" contains the dependencies for that microservice. By packaging the required third-party libraries into the lambda layer, we can use those dependencies seamlessly, which is one of the key benefits of utilizing AWS Lambda for serverless microservices.

Additionally, the Event Log folder is designed to generate simulated events, while the For Batch Uploading Data folder is used to batch upload data into AWS DynamoDB, leveraging AWS's Boto3 library.

## HOW TO RUN

All backend codes have been deployed on the aws cloud server, at the same time, we import third libraries using CDN method. Therefore, you don't need to install any third libraries before running. All things are ready, and AWS cloud deployment will be maintained until the score of this group project assignment released.

Just click on the 'Front-end' folder,and run the index.html then enjoy it.(Or run the command 'live-server' in the terminal if you have installed.)

Since the data in AWS DynamoDB has been deleted, if you want to use this web application, please create a corresponding database in AWS, import data using the backend py file, and copy the lambda function to create the corresponding restful api to replace the existing one.
