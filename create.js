import uuid from "uuid";
import ajv from 'ajv';
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { created, failure } from "./libs/response-lib";
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
    Item: {
      userId: event.requestContext.authorizer.principalId,
      wordId: event.pathParameters.id,
      content: data,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return created(params.Item);
  } catch (e) {
    console.log(e)
    return failure({ status: false });
  }
}