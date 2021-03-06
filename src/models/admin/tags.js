import knex from '../../utils/knex';
import moment from 'moment';

export const dbGetTags = () => {
  return knex('tags')
    .select('*')
    .orderBy('tags.id');
};

export const dbDeleteTag = tagId => {
  return knex('tags')
    .del()
    .where({ id: tagId })
    .returning('*');
};

export const dbAddTag = (newTagData, creatorId) => {
  return knex
    .insert({
      creatorId,
      name: newTagData.name,
      type: newTagData.type,
      createdAt: moment(),
    })
    .into('tags')
    .returning('*');
};

export const dbUpdateTag = (tagId, name) => {
  return knex
    .update({ name })
    .from('tags')
    .where({ id: tagId });
};

export const dbAddUnseenTags = tagId =>
  knex.from('unseen_tags').insert(function() {
    this.from('users')
      .select({
        userId: 'id',
        tagId,
      })
      .where({ active: 'true' });
  });
