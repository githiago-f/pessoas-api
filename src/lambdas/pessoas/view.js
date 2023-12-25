import { responseEntity } from '../../helpers/response.entity.js';
import { Logger } from '../../helpers/logger.js';
import personRepository from '../../domain/person.repository.js';

const logger = Logger('pessoas.view');

export const handler = async (event) => {
  const data = await personRepository.view(event.pathParameters.nickname);
  logger.info('Geting item data ::: ' + data);
  return responseEntity(data)
    .status(data === null ? 404 : 200)
    .build();
};
