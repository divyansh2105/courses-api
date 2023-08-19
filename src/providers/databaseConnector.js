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
  }

  query(queryRequest) {
    return this.pool.query(queryRequest);
  }

  disconnect() {
    return this.pool.end();
  }
}

const databaseConnector = new DatabaseConnector();

module.exports = { databaseConnector };
