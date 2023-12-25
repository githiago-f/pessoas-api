import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const connect = () => {
  const opt = process.env.STAGE === 'local' ? {
    region: 'localhost',
    endpoint: 'http://0.0.0.0:8000',
    credentials: {
      accessKeyId: 'MockAccessKeyId',
      secretAccessKey: 'MockSecretAccessKey'
    },
  } : {};
  const client = new DynamoDBClient(opt);
  const dynamo = DynamoDBDocumentClient.from(client);
  return { dynamo };
}
