module.exports = {

  development: {
	  client: 'better-sqlite3',
	  connection: {
		  filename: './database.sqlite3'
	  },
	  useNullAsDefault: true
  },

  staging: {
	  client: 'better-sqlite3',
	  connection: {
		  filename: './database.sqlite3'
	  },
	  useNullAsDefault: true
  },

  production: {
	  client: 'better-sqlite3',
	  connection: {
		  filename: './database.sqlite3'
	  },
	  useNullAsDefault: true
  }

};
