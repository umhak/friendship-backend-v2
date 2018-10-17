const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');

// Designer decided to have a preset list
// Using this for the seed data as well
const personalities = [
  'planner',
  'spontaneous',
  'dreamer',
  'realistic',
  'play it safe',
  'risk Taker',
  'chilling out',
  'going out',
  'relaxed',
  'ambitious',
  'introvert',
  'extrovert',
];
let index = 0;

const personalityFields = {
  name: () => personalities[index++],
};

let userId = 1;
let personalityId = 0;

const userPersonalityFields = {
  userId: () => {
    if (personalityId === 8) {
      userId += 1;
      personalityId = 0;
    }
    return userId;
  },
  personalityId: () => {
    personalityId += 1;
    return personalityId;
  },
  level: () => faker.random.number({ min: 1, max: 5 }),
};

exports.seed = knex =>
  knex
    .batchInsert(
      'personalities',
      simpleFixtures.generateFixtures(personalityFields, personalities.length),
    )
    .then(() =>
      knex.batchInsert(
        'user_personality',
        simpleFixtures.generateFixtures(userPersonalityFields, 100),
      ),
    );
