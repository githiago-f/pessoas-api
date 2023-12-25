import { responseEntity } from '../../helpers/response.entity.js';
import { Logger } from '../../helpers/logger.js';
import personRepository from '../../domain/person.repository.js';

const logger = Logger('pessoas.index');

export const handler = async (event) => {
  const data = await personRepository.list();
  logger.info('listing items ::: ' + data.count);
  return responseEntity(data)
    .status(200)
    .build();
};
