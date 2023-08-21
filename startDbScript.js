const { spawn } = require("child_process");
require('dotenv').config();
console.log(process.env.POSTGRESQL_DIR)

var child = spawn('pg_ctl', ['-D', process.env.POSTGRESQL_DIR, 'start'], {shell: false});

child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

child.on('exit', () => process.exit());
