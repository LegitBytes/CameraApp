import 'source-map-support/register';

import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/apiGateway';
import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
import {default as db} from '@models/db';

import schema from './schema';

// eslint-disable-next-line max-len
const getParticipants: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  // await db.sequelize.sync();
  const participantData = await db.participant.findAll({
    include: [
      {
        model: db.condition,
      },
      {
        model: db.participant_review,
      },
    ],
  });

  return formatJSONResponse({
    participantData,
  });
};

export const main = middyfy(getParticipants);
