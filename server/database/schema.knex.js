const config = require('./config');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    charset: config.charset
  },
  useNullasDefault: true
});

knex.schema.hasTable('users').then(exist => {
  if (!exist) {
    knex.schema.createTable('users', (user) => {
      user.increments('id').primary();
      user.string('email');
      user.string('password');
      user.string('fullname');
      user.string('profile_photo');
      user.timestamp('createdOn').defaultTo(knex.fn.now());
    }).then(table => {
      console.log('Created Table', table);
    });
  }
});

knex.schema.hasTable('events').then(exist => {
  if (!exist) {
    knex.schema.createTable('events', (event) => {
      event.increments('id').primary();
      event.string('tm_id');
      event.string('name');
      event.text('artist_name');
      event.dateTime('date');
      event.string('event_url');
      event.text('venue');
      event.text('image');
      event.text('genre');
      event.string('latitude');
      event.string('longitude');
      event.text('sale_date');
    }).then(table => {
      console.log('Created Table', table);
    });
  }
});

knex.schema.hasTable('artists').then(exist => {
  if (!exist) {
    knex.schema.createTable('artists', (artist) => {
      artist.increments('id').primary();
      artist.string('mbid');
      artist.string('name');
      artist.string('image');
      artist.string('events');
      artist.string('facebook');
      artist.string('onTourUntil');
      artist.integer('upcoming_events');
    }).then(table => {
      console.log('Created Table', table);
    });
  }
});

knex.schema.hasTable('comments').then(exist => {
  if (!exist) {
    knex.schema.createTable('comments', (comment) => {
      comment.increments('id').primary();
      comment.integer('id_user')
      comment.integer('id_friend');
      comment.integer('id_event');
      comment.text('text');
      comment.timestamp('createdOn').defaultTo(knex.fn.now());
      comment.foreign('id_user').references('users.id');
      comment.foreign('id_friend').references('users.id');
      comment.foreign('id_event').references('events.id');

    }).then(table => {
      console.log('Created Table', table);
    });
  }
});

knex.schema.hasTable('users_artists').then(exist => {
  if (!exist) {
    knex.schema.createTable('users_artists', (users_artists) => {
      users_artists.integer('id_users').unsigned();
      users_artists.integer('id_artists').unsigned();
      users_artists.foreign('id_users').references('users.id');
      users_artists.foreign('id_artists').references('artists.id');
    }).then(table => {
      console.log('Created Table', table);
    });
  }
});

knex.schema.hasTable('users_events').then(exists => {
  if(!exists) {
    knex.schema.createTable('users_events', (users_events) => {
      users_events.integer('id_users').unsigned();
      users_events.integer('id_events').unsigned();
      users_events.timestamp('createdOn').defaultTo(knex.fn.now());
      users_events.foreign('id_users').references('users.id');
      users_events.foreign('id_events').references('events.id');
    }).then(table => {
      console.log('Created Table', table);
    });
  }
});

knex.schema.hasTable('users_friends').then(exist => {
  if (!exist) {
    knex.schema.createTable('users_friends', (users_friends) => {
      users_events.integer('id_user').unsigned();
      users_events.integer('id_friend').unsigned();
      users_events.timestamp('createdOn').defaultTo(knex.fn.now());
      users_events.foreign('id_user').references('users.id');
      users_events.foreign('id_event').references('users.id');
    }).then(table => {
      console.log('Created Table:', table);
    });
  }
});


module.exports = knex;
