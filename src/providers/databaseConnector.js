const { Pool } = require('pg');

class DatabaseConnector {
  constructor() {
    if(DatabaseConnector.instance === null) {
      DatabaseConnector.instance = this;
      this.pool = null;
    }
    return DatabaseConnector.instance;
  }

  connect({host, user, password, port, database, timeout = 20000}) {
    this.pool = new Pool({
      host,
      user,
      password,
      port,
      database,
      idleTimeoutMillis: timeout
    });
    console.log(`Connected to DB successfully with the following host: ${host}, user: ${user}, port: ${port} and database: ${database}`);
  }

  query(queryRequest, arrayParams = []) {
    return this.pool.query(queryRequest, arrayParams);
  }

  disconnect() {
    //ideally we wont need to call this since the Pool class takes care of managing db connections
    return this.pool.end();
  }
}

const databaseConnector = new DatabaseConnector();

module.exports = { databaseConnector };
