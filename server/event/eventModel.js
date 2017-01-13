const knex = require('../database/schema.knex.js');

module.exports = {
  events: {
    getUserEvents(params) {
      return knex.select('*').from('events')
        .join('users_events', () => {
          this.on('users_events.id_users', '=', params)
          .andOn('events.id', '=', 'users_events.id_events')
        })
    },
      // const queryStr = 'SELECT * FROM events INNER JOIN users_events ON (users_events.id_users = ? and events.id=users_events.id_events)';
      // db.query(queryStr, params, (err, results) => {
      //   if (err) {
      //     console.log('Error in server/eventModel.js getUserEvents : ', err);
      //   } else {
      //     callback(results);
      //   }
      // });
    // },
    getFriendsEvents(params) {
      let results2;
      let friendsEvents;
      let userResults2;
      return knex.select('id_events, id_users').from('users_events')
        .join('users_friends', () => {
          this.on('users_friends.id_user', '=', params)
          .andOn('users.id', '=', 'users_friends.id_friend')
        })
        .then((results) => {
          results2 = results;
          friendsEvents = results.map((event) => event.id_events).join(', ');
          return knex.select('id', 'fullname').from('users')
            .join('users_friends', () => {
              this.on('users_friends.id_user', '=', params)
              .andOn('users.id', '=', 'users_friends.id_friend')
            })
            .then((userResults) => {
              userResults2 = userResults
              return knex.from('events').where('id', 'in', friendsEvents)
            .then((eventResults) => {
              if(friendsEvents.length === 0) {
                return {userNames: userResults2, friendEvents: results2, events: [] };
              }
              else{
                return { userNames: userResults2, friendEvents: results2, events: eventResults };
              }
            })
            })
        })
      },
    //   const queryStr = 'SELECT id_events, id_users FROM users_events INNER JOIN users_friends ON users_friends.id_user= ? AND users_events.id_users=users_friends.id_friend';
    //   const queryStr2 = 'SELECT id, fullname FROM users INNER JOIN users_friends ON users_friends.id_user= ? AND users.id=users_friends.id_friend';
    //   db.query(queryStr, params, (err, results) => {
    //     if (err) {
    //       console.log('Error in server/eventModel.js getFriendsEvents : ', err);
    //     } else {
    //       const friendsEvents = results.map((event) => event.id_events).join(', ');
    //       db.query(queryStr2, params, (err, userResults) => {
    //         if (err) {
    //           console.log('Error in server/eventModel.js getFriendsEvents : ', err);
    //         } else {
    //           if (friendsEvents.length === 0) {
    //             callback({ userNames: userResults, friendEvents: results, events: [] })
    //           }
    //           const queryStr3 = `SELECT * FROM events WHERE id IN (${friendsEvents})`;
    //           db.query(queryStr3, (err, eventResults) => {
    //             if (err) {
    //               console.log('Error in server/eventModel.js getFriendsEvents : ', err);
    //             } else {
    //               callback({ userNames: userResults, friendEvents: results, events: eventResults });
    //             }
    //           });
    //         }
    //       });
    //     }
    //   });
    // },

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
          return knex('users_events').insert({
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
              id_events: insertResults.insertId,
            })
          })
        }
      }),

      // const queryStr = 'SELECT id FROM events WHERE tm_id = ?';
      // const queryStr2 = 'INSERT INTO events (tm_id, name, artist_name, date, event_url, venue, image, genre, latitude, longitude, sale_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      // const queryStr3 = 'INSERT INTO users_events (id_users, id_events) VALUES (?, ?)';
      // db.query(queryStr, params[0], (err, eventResults) => {
      //     if (eventResults.length !== 0) {
      //       const dupeParams = [userId, eventResults[0].id];
      //       db.query(queryStr3, dupeParams, (userEventsErr, userEventsResults) => {
      //         if (userEventsErr) {
      //           console.log('Error in server/eventModel.js addEvent : ', err);
      //         } else {
      //           callback(userEventsResults);
      //         }
      //       });
    //       } else {
    //         db.query(queryStr2, params, (insertErr, insertResults) => {
    //           if (insertErr) {
    //             console.log('Error in server/eventModel.js addEvent : ', err);
    //           } else {
    //             const params2 = [userId, insertResults.insertId];
    //             db.query(queryStr3, params2, (userEventsErr, userEventsResults) => {
    //               if (userEventsErr) {
    //                 console.log('Error in server/eventModel.js addEvent : ', err);
    //               } else {
    //                 callback(userEventsResults);
    //               }
    //             });
    //           }
    //         });
    //     }
    //   });
    // },
    userEvents(params) {
      return knex('events').where({
        id_users: params
      }).select('name')
    },
      // const queryStr = 'SELECT name FROM events WHERE id_users = ?';
      // db.query(queryStr, params, (err, results) => {
      //   if (err) {
      //     console.log('Error in server/eventModel.js userEvents : ', err);
      //   } else {
      //     callback(results);
      //   }
      // });
    // },
    searchEvents(params) {
      return knex('events').where({
        name: params
      }).select('name')
    },
    //   const queryStr = 'SELECT name FROM events WHERE name = ?';
    //   db.query(queryStr, params, (err, results) => {
    //     if (err) {
    //       console.log('Error in server/eventModel.js searchEvents : ', err);
    //     } else {
    //       callback(results);
    //     }
    //   });
    // },
    relatedEvents(params) {
      return knex('events').where('genre', params).select('name')
    },
    //   const queryStr = 'SELECT name FROM events WHERE genre = ?';
    //   db.query(queryStr, params, (err, results) => {
    //     if (err) {
    //       console.log('Error in server/eventModel.js relatedEvents : ', err);
    //     } else {
    //       callback(results);
    //     }
    //   });
    // },
    localEvents(params) {
      return knex('events').where(() => {
        this.where('city', params[0]).orWhere('zipcode', params[1]).orWhere('location', params[2])
      })
    },
    //   const queryStr = 'SELECT name FROM events WHERE city = ? OR zipcode = ? OR location = ?';
    //   db.query(queryStr, params, (err, results) => {
    //     if (err) {
    //       console.log('Error in server/eventModel.js localEvents : ', err);
    //     } else {
    //       callback(results);
    //     }
    //   });
    // },

    deleteEvent(params) {
      return knex('events').where({ tm_id: params[0] }).select('id')
         .then((eventResults) = > {
          return knex('users_events').where({ id_events: eventResults[0] }).select('id_users')
            .then((userEventsResp) => {
              if (userEventsResp.length > 1) {
                return knex('users_events').where('id_event', userEventsResp[0].id).andWhere('id_users', params[1]).del()
              } else {
                return knex('users_events').where('id_event', userEventsResp[0].id).andWhere('id_users', params[1]).del()
                  .then((deleteUserEvent) => {
                    return knex('events').where('id', userEventsRespp[0].id).del()
                  })
              }
            })
        })
      },
    },
};
