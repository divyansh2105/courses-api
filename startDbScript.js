const { spawn } = require("child_process");

var child = spawn('pg_ctl', ['-D', '/usr/local/var/postgres', 'start'], {shell: false});

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
