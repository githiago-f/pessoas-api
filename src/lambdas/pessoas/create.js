import { responseEntity } from '../../helpers/response.entity.js';
import { Logger } from '../../helpers/logger.js';
import { Person } from '../../domain/person.js';
import personRepository from '../../domain/person.repository.js';

const logger = Logger('pessoas.create');

export const handler = async (event) => {
  const person = new Person(JSON.parse(event.body));
  logger.info('Creating person with nickname:: ' + person.nickname);
  await personRepository.save(person);
  logger.info('Created with nickname:: ' + person.nickname);
  return responseEntity(person)
    .putHeader('Location', '/pessoas/' + person.nickname)
    .status(201)
    .build();
};
