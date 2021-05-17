/* eslint-disable max-len */
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type {FromSchema} from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
};


export const formatJSONResponseStatusOk = (
response: Record<string, unknown>
) => {​​​​​
return {​​​​​
statusCode:200,
body:JSON.stringify(response),
headers: {​​​​​
"Access-Control-Allow-Origin":"*",
    }​​​​​,
  }​​​​​;
}​​​​​;
export const formatJSONResponseStatusCreated = (
response: Record<string, unknown>
) => {​​​​​
return {​​​​​
statusCode:201,
body:JSON.stringify(response),
headers: {​​​​​
"Access-Control-Allow-Origin":"*",
    }​​​​​,
  }​​​​​;
}​​​​​;
export const formatJSONResponseStatusBadRequest = (
response: Record<string, unknown>
) => {​​​​​
return {​​​​​
statusCode:400,
body:JSON.stringify(response),
headers: {​​​​​
"Access-Control-Allow-Origin":"*",
    }​​​​​,
  }​​​​​;
}​​​​​;
export const formatJSONResponseStatusError = (
response: Record<string, unknown>
) => {​​​​​
return {​​​​​
statusCode:500,
body:JSON.stringify(response),
headers: {​​​​​
"Access-Control-Allow-Origin":"*",
    }​​​​​,
  }​​​​​;
}​​​​​;
