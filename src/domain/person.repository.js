import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  ScanCommand
} from '@aws-sdk/lib-dynamodb';
import { connect } from '../helpers/dynamo.builder.js';
import { Person } from './person.js';
const { dynamo } = connect();

const tableName = process.env.TABLE_NAME;

const save = (person) => {
  return dynamo.send(
    new PutCommand({
      TableName: tableName,
      Item: person.toEntity()
    })
  );
};

const list = () => {
  return dynamo.send(
    new ScanCommand({ TableName: tableName })
  ).then(res => {
    const data = res.Items.map(i => new Person(i))
    const count = res.Count;
    return {data,count};
  });
};

const view = (nickname) => {
  return dynamo.send(new GetCommand({
    TableName: tableName,
    Key: {apelido: nickname}
  })).then(res => {
    const item = res.Item;
    if(!item) return null;
    return new Person(res.Item);
  });
};

const deleteOne = (nickname) => {
  return dynamo.send(new DeleteCommand({
    TableName: tableName,
    Key: { apelido: nickname }
  }));
}

export default {
  save,
  list,
  view,
  deleteOne
};
