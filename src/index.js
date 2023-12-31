const app = require('./app');
require('dotenv').config();
const {databaseConnector} = require('./providers/databaseConnector');

app.listen(3000, () => {
  try {
    console.log('Server listening on port 3000!');
    databaseConnector.connect({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_DBNAME
    });
  } catch (err) {
    console.log(err.message);
  } 
});
