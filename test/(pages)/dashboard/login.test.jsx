import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '@/app/(pages)/login/page';

jest.mock('@/components/login-form', () => ({
  LoginForm: () => <div>Mocked LoginForm</div>,
}));

describe('LoginPage', () => {
  test('renders the LoginPage component', () => {
    render(<LoginPage />);

    // Check if the LoginForm is rendered
    const loginForm = screen.getByText('Mocked LoginForm');
    expect(loginForm).toBeInTheDocument();
  });

  test('renders the container with correct classes', () => {
    render(<LoginPage />);

    // Check if the container has the correct classes
    const container = screen.getByRole('main');
    expect(container).toHaveClass('flex', 'min-h-svh', 'flex-col', 'items-center', 'justify-center', 'bg-muted', 'p-6', 'md:p-10');
  });
});
