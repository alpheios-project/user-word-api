import * as dynamoDbLib from "./libs/dynamodb-lib";
import ajv from 'ajv';
import { success, failure } from "./libs/response-lib";
import schema from './schema.json'

const TABLE_NAME = process.env.DATABASE_NAME
const VALIDATE = new ajv().compile(schema)

export async function main(event, context) {
  const data = JSON.parse(event.body);
  let valid = VALIDATE(data)
  if (!valid) {
    return failure({ status: false });
  }
  const params = {
    TableName: TABLE_NAME,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.authorizer.principalId,
      wordId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    UpdateExpression: "SET content = :content",
    ExpressionAttributeValues: {
      ":content": data || null
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}