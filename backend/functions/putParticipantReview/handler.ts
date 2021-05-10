import 'source-map-support/register';

import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/apiGateway';
import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
import {default as db} from '@models/db';

import schema from './schema';

// eslint-disable-next-line max-len
const putParticipantReview: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  // await db.sequelize.sync();
  const participantId = event.pathParameters.participantId;
  const reviewerId = event.pathParameters.reviewerId;
  console.log('Event Body', event);

  const {reviewerResult, reviewRationalePayload, reviewNote} = event.body;
  await db.participant_review.create({
    participant_id: participantId,
    reviewer_id: reviewerId,
    review_rationale_payload: reviewRationalePayload,
    review_note: reviewNote,
    reviewer_result: reviewerResult,
  });

  return formatJSONResponse({
    reviewerResult,
    reviewRationalePayload,
    reviewNote,
  });
};

export const main = middyfy(putParticipantReview);
