import { HttpError } from 'wasp/server'
import fetch from 'node-fetch'

export const fetchGuestData = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const response = await fetch('https://db.ballarihealth.com/api/v2/tables/md_ycdjyd35u6t9v5/records?viewId=vwq75bimmhs2cj0t', {
    method: 'GET',
    headers: {
      'xc-token': process.env.NOCO_DB_API_TOKEN,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new HttpError(500, 'Failed to fetch data from NocoDB');
  }

  const data = await response.json();
  const userData = data.list.find(record => record.username === context.user.username);

  if (!userData) {
    throw new HttpError(404, 'User data not found');
  }

  return {
    travel: {
      TrainNumber: userData.TrainNumber,
      SeatType: userData.SeatType,
      SeatNo: userData.SeatNo,
      CoachNo: userData.CoachNo
    },
    stay: {
      Hotel: userData.Hotel,
      RoomNo: userData.RoomNo
    }
  };
}
