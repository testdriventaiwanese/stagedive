const knex = require('../database/schema.knex.js');

module.exports = {
  events: {
    getUserEvents(params) {
      return knex.raw('SELECT * FROM events INNER JOIN users_events ON (users_events.id_users=? and events.id=users_events.id_events)', params)
        .then((response) => {
          return response[0];
        });
    },
    getFriendsEvents(params) {
      return knex.raw('SELECT id_events, id_users FROM users_events INNER JOIN users_friends ON users_friends.id_user=? AND users_events.id_users=users_friends.id_friend', params)
        .then((results) => {
          const friendsEvents = results[0].map((event) => event.id_events);
          return knex.raw('SELECT id, fullname FROM users INNER JOIN users_friends ON users_friends.id_user=? AND users.id=users_friends.id_friend', params)
            .then((userResults) => {
              if (friendsEvents.length === 0) {
                return ({ userNames: userResults[0], friendEvents: results[0], events: [] });
              } else {
                return knex.from('events').whereIn('id', friendsEvents)
                  .then((eventResults) => {
                    return ({ userNames: userResults[0], friendEvents: results[0], events: eventResults });
                  })
              }
            })
        })
    },

    addEvent(userId, params) {
      return knex('events').where({
        tm_id: params[0]
      }).select('id')
      .then((eventResults) => {
        if(eventResults.length !== 0) {
          return knex('users_events').insert({
            id_users: userId,
            id_events: eventResults[0].id,
          });
        }
        else{
          return knex('events').insert({
            tm_id: params[0],
            name: params[1],
            artist_name: params[2],
            date: params[3],
            event_url: params[4],
            venue: params[5],
            image: params[6],
            genre: params[7],
            latitude: params[8],
            longitude: params[9],
            sale_date: params[10],
          })
          .then((insertResults) => {
            return knex('users_events').insert({
              id_users: userId,
              id_events: insertResults[0],
            })
          })
        }
      })
    },
    searchEvents(params) {
      return knex('events').where({
        name: params
      }).select('name')
    },

    deleteEvent(params) {
      return knex.select('id').from('events').where({ tm_id: params.tm_id })
         .then((eventResults) => {
          return knex.select('id_users').from('users_events').where({ id_events: eventResults[0].id })
            .then((userEventsResp) => {
              if (userEventsResp.length > 1) {
                return knex('users_events').where('id_events', eventResults[0].id).andWhere('id_users', params.userId).del()
              } else {
                return knex('users_events').where('id_events', eventResults[0].id).andWhere('id_users', params.userId).del()
                  .then((deleteUserEvent) => {
                    return knex('events').where('id', eventResults[0].id).del()
                  })
              }
            })
        })
      },
    },
};
