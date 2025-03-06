const fs = require('fs');
const csv = require('csv-parse');
const axios = require('axios');

async function bulkSignup() {
  try {
    const users = [];

    // Read CSV
    fs.createReadStream('./username_passwords.csv')
      .pipe(csv.parse({ columns: true, trim: true }))
      .on('data', (row) => {
        users.push({
          username: row.username,
          password: row.password,
        });
      })
      .on('end', async () => {
        console.log('CSV parsed, starting bulk signup...');

        // Send signup requests to Wasp’s auth endpoint
        for (const user of users) {
          try {
            const response = await axios.post('http://localhost:3001/auth/username/signup', {
              username: user.username,
              password: user.password,
            });
            console.log(`Signed up user: ${user.username}`, response.data);
          } catch (error) {
            console.error(`Failed to sign up user: ${user.username}`, {
              status: error.response?.status,
              data: error.response?.data,
              message: error.message,
            });
          }
        }

        console.log('Bulk signup completed!');
      })
      .on('error', (err) => {
        console.error('Error parsing CSV:', err);
      });
  } catch (error) {
    console.error('Error in bulk signup:', error);
  }
}

bulkSignup();