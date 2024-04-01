import React from 'react';
import { render, screen } from '@testing-library/react';
import BookingList from '@/components/BookingList';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

// Mock the session data
const mockSession: Session = {
    user: {
      _id: '1',
      name: 'Test User',
      tel: '1234567890',
      email: 'test@example.com',
      role: 'admin',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDEyYjJlZGU2NWMxYzZkNGMyZmM2YSIsImlhdCI6MTcxMTgxMDE3MSwiZXhwIjoxNzE0NDAyMTcxfQ.sUbpwVPJIHcNwCq1zp4LFxE3tz18M8gZxEaYXfaCANs',
    },
    expires: (new Date()).toString(), // Add the expires property
  };

describe('BookingList', () => {
  it('renders booking list with appointments', async () => {
    // Render BookingList within SessionProvider with mocked session data
    

    render(
      <SessionProvider session={mockSession}>
        <BookingList />
      </SessionProvider>
    );

    // Add your test assertions here
    // For example, check if appointments are rendered correctly

    const appointment1 = await screen.findByText('CP Group');
    expect(appointment1).toBeInTheDocument();

    const appointment2 = await screen.findByText('Thai Airways International Public Company Limited');
    expect(appointment2).toBeInTheDocument();

    const appointment3 = await screen.findByText('Bangkok Bank Public Company Limited');
    expect(appointment3).toBeInTheDocument();
    // Add more assertions as needed
  });
});
