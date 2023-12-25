import { responseEntity } from '../../helpers/response.entity.js';
import { Logger } from '../../helpers/logger.js';
import personRepository from '../../domain/person.repository.js';

const logger = Logger('pessoas.delete');

export const handler = async (event) => {
  try {
    const nickname = event.pathParameters.nickname;
    logger.info(`Deleting person ${nickname}`);
    const data = await personRepository.view();
    if(!data) {
      logger.info(`Person ${nickname} doesnt exist`);
      return responseEntity().status(404).build();
    }
    await personRepository.deleteOne(nickname);
    return responseEntity().status(204).build();
  } catch(e) {
    logger.error('Error: ' + JSON.stringify(e));
    return responseEntity({ message: e.message }).status(500).build();
  }
};
