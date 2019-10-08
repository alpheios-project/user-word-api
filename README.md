# Alpheios User Word API

## API Documentation

Operation: `GET /words`

Description: returns all word item data for all languages for the authorized principal

Required Request Header: `Authorization: Bearer <access token>`

Response Content-Type: `application/json`

Success Response Code: `200`

Success Response Body: Array of Objects adhering to [schema.json](schema.json)


Error Condition: Invalid or missing access token

Error Response Code: `401`

Error Response Body: `{ "message": "unauthorized"}`


Error Condition: Unexpected error

Error Response Code: `500`

Error Response Body: `{ "status": false}`

---

Operation: `GET /words?languageCode={code}`

Description: returns all word item data for the specified language for the authorized principal

Required Request Header: `Authorization: Bearer <access token>`

Required Path Parameter: `languageCode` - 3 character language code

Response Content-Type: `application/json`

Success Response Code: `200`

Success Response Body: Array of Objects adhering to [schema.json](schema.json)


Error Condition: Invalid or missing access token

Error Response Code: `401`

Error Response Body: `{ "message": "unauthorized"}`


Error Condition: Unexpected error

Error Response Code: `500`

Error Response Body: `{ "status": false}`

---

Operation: `GET /words/{id}`

Description: returns a specific word item for the authorized principal

Required Request Header: `Authorization: Bearer <access token>`

Required Path Parameter: `id` - word id in the format `<languagecode>-<word>`

Response Content-Type: `application/json`

Success Response Code: `200`

Success Response Body: Object adhering to [schema.json](schema.json)


Error Condition: Invalid or missing access token

Error Response Code: `401`

Error Response Body: `{ "message": "unauthorized"}`

Error Condition: Item not found


Error Response Code: `500`

Error Response Body: `{ "status": "Item not found"}`


Error Condition: Unexpected error

Error Response Code: `500`

Error Response Body: `{ "status": false}`

---

Operation: `POST /words/{id}` 

Description: saves a new word item(or replaces if existing) for the authorized principal.
             
Required Request Header: `Authorization: Bearer <access token>`

Required Path Parameter: `id` - word id in the format `<languagecode>-<word>`

Required Request Body: JSON string adhering to [schema.json](schema.json)

Response Content-Type: `application/json`

Success Response Code: `201`

Success Response Body: Object adhering to [schema.json](schema.json)


Error Condition: Invalid or missing access token

Error Response Code: `401`

Error Response Body: `{ "message": "unauthorized"}`


Error Condition: Invalid data or unexpected error

Error Response Code: `500`

Error Response Body: `{ "status": false}`

---

Operation: `PUT /words/{id}` 

Description: updates a word item for the authorized principal

Required Request Header: `Authorization: Bearer <access token>`

Required Path Parameter: `id` - word id in the format `<languagecode>-<word>`

Required Request Body: JSON string adhering to [schema.json](schema.json)


Response Content-Type: `application/json`

Success Response Code: `200`

Success Response Body: `{ "status": true }`


Error Condition: Invalid or missing access token

Error Response Code: `401`

Error Response Body: `{ "message": "unauthorized"}`


Error Condition: Invalid data or unexpected error

Error Response Code: `500`

Error Response Body: `{ "status": false}`

---

Operation: `DELETE /words/{id}` 

Description: deletes a single word item for the authorized principal

Required Request Header: `Authorization: Bearer <access token>`

Required Path Parameter: `id` - word id in the format `<languagecode>-<word>`

Response Content-Type: `application/json`

Success Response Code: `200`

Success Response Body: `{ "status": true }`


Error Condition: Invalid or missing access token

Error Response Code: `401`

Error Response Body: `{ "message": "unauthorized"}`


Error Condition: Unexpected error

Error Response Code: `500`

Error Response Body: `{ "status": false}`

---

Operation: `DELETE /words?languageCode={code}` 

Description: deletes all word items for the specified language for the authorized principal

Required Request Header: `Authorization: Bearer <access token>`

Required Path Parameter: `languageCode` - 3 character language code

Response Content-Type: `application/json`

Success Response Code: `200`

Success Response Body: `{ "status": true }`


Error Condition: Invalid or missing access token

Error Response Code: `401`

Error Response Body: `{ "message": "unauthorized"}`


Error Condition: Unexpected error

Error Response Code: `500`

Error Response Body: `{ "status": false}`


## Authorization

Bearer Token.

API Operations are protected by login to the Alpheios Auth0 domain. All operations require a
Signed JWT Token granting access to the correct audience be supplied in an Author.


## Deployment Architecture

The Alpheios User Word API is deployed as a set of Amazon Web Services Lambda Functions storing data in DynamoDB using the [Serverless Framework](https://serverless.com/). Access to the API is gated by use of a custom authorizer function, also deployed as an AWS Lambda function.

## Developer Instructions

References: this API was built using the Servless Stack following the tutorial at https://serverless-stack.com

### Prerequisites

**AWS IAM User**

Create an AWS IAM user with the following policy attached

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:*",
                "apigateway:*",
                "logs:*",
                "lambda:*",
                "cloudformation:*",
                "dynamodb:*",
                "events:*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "iam:GetRole",
                "iam:GetRolePolicy"
            ],
            "Resource": "arn:aws:iam::*:role/*"
        },
        {
            "Sid": "VisualEditor2",
            "Effect": "Allow",
            "Action": "iam:CreateRole",
            "Resource": "arn:aws:iam::*:role/user-word-api-*"
        },
        {
            "Sid": "VisualEditor3",
            "Effect": "Allow",
            "Action": "iam:PutRolePolicy",
            "Resource": "arn:aws:iam::*:role/user-word-api-*"
        },
        {
            "Sid": "VisualEditor4",
            "Effect": "Allow",
            "Action": "iam:PassRole",
            "Resource": "arn:aws:iam::*:role/user-word-api-*"
        }
    ]
}
```

**Python**

Python 2 version 2.6.5+ or Python 3 version 3.3+ and Pip

**AWS Cli**

Install and configure the AWS Cli with the AWS Access Key ID and Secret Access ID of the AWS IAM User.

`sudo pip install awscli`
`aws configure`

**DynamoDB**

Create a DynamoDB table with the following properties:

Primary partition key: userId

Primary sort key: wordId

**Node**

node v10.5.0

**Serverless**

 `npm install serverless -g`
 
### Configuration
 
The following properties in the `serverless.yml` must be updated to match the AWS deployment environment:

  * `provider.stage` (e.g. prod or dev)
  * `provider.region` (e.g. us-east-2)
  * `provider.iamRoleStatements.Resource` (arn for the dynamo db resources, use a wildcard to enable db creation, arn:aws:dynamodb:us-east-2:*:*)

In addition, the provider must be setup with the following environment variables:

  * `AUTH0_CLIENT_PUBLIC_KEY` the public key that will be used to verify the JWT access tokens
  * `AUTH0_AUDIENCE` the audience which must include a grant in the JWT access token (e.g. alpheios.net:apis)
  * `AUTH0_TEST_ID` path to a file containing a mock access token that can be used by clients for testing
  * `DATABASE_NAME` name of the DynamoDB Table 

The Alpheios development environment has `AUTH0_CLIENT_PUBLIC_KEY` read from a file in the root directory named 'public_key' and the `AUTH0_TEST_ID` read from a file in the root directory named `test_id`. These files are kept in a private repository and copied for deployment.

### Testing 
  
  You can test invoking the API functions locally:
 
 ```
 serverless invoke local --function <function> --paths ./mocks/<filname>
 ```
 
 e.g. 

```serverless invoke local --function list --paths ./mocks/list-event.json```

Mocks are available for each operation.

Note that local API invocations WILL write to the remote DynamoDB.

Unit tests are available for library functions only currently.
  
### Deployment

Deploy to dev stage

```
serverless deploy --stage dev
```

Deploy to prod stage

```
serverless deploy 
```


