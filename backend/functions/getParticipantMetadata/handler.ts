import 'source-map-support/register';

import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/apiGateway';
import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
import {default as db} from '@models/db';

import schema from './schema';

// eslint-disable-next-line max-len
const getParticipantMetadata: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  // await db.sequelize.sync();
  const participantId = event.pathParameters.participantId;
  const participantData = await db.participant.findOne({
    where: {participant_id: participantId},
    include: [{
      model: db.condition,
    }],
  });

  return formatJSONResponse({
    participantData,
  });
};

export const main = middyfy(getParticipantMetadata);
