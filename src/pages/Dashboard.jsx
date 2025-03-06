import React from 'react';
import { Card, Alert } from '@mantine/core';
import { useQuery } from 'wasp/client/operations';
import { getUserData } from 'wasp/client/operations';
import { useAuth } from 'wasp/client/auth'; // Use useAuth instead of direct logout

const DashboardPage = () => {
  const { data: userData, isLoading, error } = useQuery(getUserData);
  const { logout } = useAuth(); // Destructure logout from useAuth

  if (isLoading) return 'Loading...';
  if (error) return <Alert color='red'>Unable to load details, please try again</Alert>;

  return (
    <div className='p-4'>
      <Card shadow='lg' padding='lg' className='mb-4'>
        <h2 className='text-lg font-bold mb-2'>Travel Details</h2>
        <p><strong>Train Number:</strong> {userData.Train.TrainNumber}</p>
        <p><strong>Coach No:</strong> {userData.CoachNo}</p>
        <p><strong>Seat No:</strong> {userData.SeatNo}</p>
        <p><strong>Seat Type:</strong> {userData.SeatType}</p>
      </Card>

      <Card shadow='lg' padding='lg' className='mb-4'>
        <h2 className='text-lg font-bold mb-2'>Stay Details</h2>
        <p><strong>Hotel:</strong> {userData.Hotel}</p>
        <p><strong>Room No:</strong> {userData['Room no'].RoomNo}</p>
      </Card>
    </div>
  );
};

export default DashboardPage;