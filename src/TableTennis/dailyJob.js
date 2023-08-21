const cron = require('node-cron');


const yourScriptPath = 'C:/Users/abhil/OneDrive/Desktop/Learn/my-app/src/TableTennis/booking.js';

// Schedule the task to run at 12 PM daily
cron.schedule('7 17 * * *', () => {
  const { exec } = require('child_process');
  exec(`node ${yourScriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      return;
    }
    console.log(`Script executed successfully: ${stdout}`);
  });
});
