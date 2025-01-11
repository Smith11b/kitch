import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmailForm from '@/app/email-form';
import landerService from '../../app/service/landerService/landerService';

// Mock the landerService module
jest.mock('@/app/service/landerService/landerService');

describe('EmailForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form with initial state', () => {
    render(<EmailForm />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByText('Join the waitlist')).toBeInTheDocument();
  });

  test('shows invalid email message when email is invalid', async () => {
    landerService.validateEmail.mockReturnValueOnce(false);

    render(<EmailForm />);
    const input = screen.getByPlaceholderText('Enter your email');
    const button = screen.getByText('Join the waitlist');

    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });
  });

  test('submits the form with valid email', async () => {
    landerService.validateEmail.mockReturnValueOnce(true);
    landerService.saveEmailAddress.mockResolvedValueOnce({ message: 'Success' });

    render(<EmailForm />);
    const input = screen.getByPlaceholderText('Enter your email');
    const button = screen.getByText('Join the waitlist');

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(landerService.saveEmailAddress).toHaveBeenCalledWith('test@example.com');
      expect(screen.getByText('Thanks for joining us!')).toBeInTheDocument();
    });
  });

  test('handles server error during submission', async () => {
    landerService.validateEmail.mockReturnValueOnce(true);
    landerService.saveEmailAddress.mockRejectedValueOnce(new Error('Server error'));

    render(<EmailForm />);
    const input = screen.getByPlaceholderText('Enter your email');
    const button = screen.getByText('Join the waitlist');

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Join the waitlist')).toBeInTheDocument();
    });

    expect(landerService.saveEmailAddress).toHaveBeenCalledWith('test@example.com');
  });
});
