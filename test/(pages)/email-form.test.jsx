import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmailForm from '@/app/email-form';
import landerService from '../../app/service/landerService/landerService';

jest.mock('@/app/service/landerService/landerService');

describe('EmailForm', () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console errors
      });

      afterAll(() => {
        console.error.mockRestore(); // Restore console errors
      });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders the form with initial state', () => {
    render(<EmailForm />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByText('Join the waitlist')).toBeInTheDocument();
  });

  test('sets invalid state back to false after 2000ms', async () => {
    landerService.validateEmail.mockReturnValueOnce(false);

    render(<EmailForm />);
    const input = screen.getByPlaceholderText('Enter your email');
    const button = screen.getByText('Join the waitlist');

    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(screen.getByText('Join the waitlist')).toBeInTheDocument();
    });
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

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(screen.getByText('Join the waitlist')).toBeInTheDocument();
    });

    expect(landerService.saveEmailAddress).toHaveBeenCalledWith('test@example.com');
  });
});
