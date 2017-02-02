const knex = require('../database/schema.knex.js');


exports.getUserEvents = (params) => {
  return knex.raw('SELECT * FROM events INNER JOIN users_events ON (users_events.id_users=? and events.id=users_events.id_events)', params)
  .then(response => response[0]);
};


exports.getFriendsEvents = (params) => {
  return knex.raw('SELECT id_events, id_users FROM users_events INNER JOIN users_friends ON users_friends.id_user=? AND users_events.id_users=users_friends.id_friend', params)
  .then((results) => {
    // map results and return event id's for event table query
    const friendsEvents = results[0].map((event) => event.id_events);
    return knex.raw('SELECT id, fullname FROM users INNER JOIN users_friends ON users_friends.id_user=? AND users.id=users_friends.id_friend', params)
    .then((userResults) => {
      if (friendsEvents.length === 0) {
        return ({ userNames: userResults[0], friendEvents: results[0], events: [] });
      }
      return knex.from('events').whereIn('id', friendsEvents)
      .then((eventResults) => {
        return ({ userNames: userResults[0], friendEvents: results[0], events: eventResults });
      });
    });
  });
};


exports.addEvent = (userId, params) => {
  return knex('events').where({ tm_id: params.tm_id }).select('id')
  .then((eventResults) => {
    if (eventResults.length !== 0) {
      return knex('users_events').insert({
        id_users: userId,
        id_events: eventResults[0].id,
      });
    }
    return knex('events').insert({
      tm_id: params.tm_id,
      name: params.name,
      artist_name: params.artist_name,
      date: params.date,
      event_url: params.event_url,
      venue: params.venue,
      image: params.image,
      genre: params.genre,
      latitude: params.latitude,
      longitude: params.longitude,
      sale_date: params.sale_date,
    })
    .then((insertResults) => {
      return knex('users_events').insert({
        id_users: userId,
        id_events: insertResults[0],
      });
    });
  });
};


exports.searchEvents = (params) => {
  return knex('events').where({ name: params }).select('name');
};


exports.deleteEvent = (params) => {
  return knex.select('id').from('events').where({ tm_id: params.tm_id })
  .then((eventResults) => {
    return knex.select('id_users').from('users_events').where({ id_events: eventResults[0].id })
    .then((userEventsResp) => {
      if (userEventsResp.length > 1) {
        return knex('users_events').where('id_events', eventResults[0].id).andWhere('id_users', params.userId).del()
      }
      return knex('users_events').where('id_events', eventResults[0].id).andWhere('id_users', params.userId).del()
      .then((deleteUserEvent) => {
        return knex('events').where('id', eventResults[0].id).del()
      });
    });
  });
};
