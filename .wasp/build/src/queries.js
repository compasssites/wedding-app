import { HttpError } from 'wasp/server';
import fetch from 'node-fetch';

export const getUserData = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'Unauthorized');
  }

  // Access username from identities
  const username = context.user.identities?.username?.id;
  console.log('Logged-in username:', username); // Debug logged-in username

  if (!username) {
    throw new HttpError(400, 'Username not found in user identities');
  }

  const response = await fetch(process.env.NOCO_DB_URL, {
    method: 'GET',
    headers: {
      'xc-token': process.env.NOCO_DB_TOKEN
    }
  });

  if (!response.ok) {
    console.error('NocoDB fetch failed:', response.status, response.statusText);
    throw new HttpError(response.status, `Failed to fetch data from NocoDB: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('NocoDB response:', JSON.stringify(data, null, 2)); // Debug full response

  if (!data.list || !Array.isArray(data.list)) {
    throw new HttpError(500, 'Invalid NocoDB response: list is missing or not an array');
  }

  const userData = data.list.find(item => {
    const itemUsername = item.username?.toLowerCase().trim();
    const userUsername = username?.toLowerCase().trim();
    console.log(`Comparing: item.username=${itemUsername}, user.username=${userUsername}`);
    return itemUsername === userUsername;
  });

  if (!userData) {
    console.error('No matching user data found for username:', username);
    throw new HttpError(404, 'User data not found');
  }

  console.log('Found user data:', userData);
  return userData;
};