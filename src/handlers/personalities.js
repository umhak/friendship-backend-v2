import {
  dbGetPersonalities,
  dbGetUserPersonalities,
  dbRegisterPersonalities,
} from '../models/personalities';

export const getPersonalities = (request, reply) =>
  dbGetPersonalities().then(data => reply.response(data));

export const registerPersonalities = (userId, personalities) => {
  const userPersonalities = [];
  personalities.map(personality =>
    userPersonalities.push({ userId, personalityId: personality, level: 5 }),
  );
  return dbRegisterPersonalities(userPersonalities);
};

export const getUserPersonalities = (request, reply) =>
  dbGetUserPersonalities(request.query.userId).then(data =>
    reply.response(data),
  );
