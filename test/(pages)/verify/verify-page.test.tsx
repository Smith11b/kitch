import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VerifyPage from '@/app/(pages)/verify/page';

describe('VerifyPage', () => {
  test('renders the VerifyPage component', () => {
    render(<VerifyPage />);

    // Check if the Card component is rendered
    const card = screen.getByLabelText('verify-card');
    expect(card).toBeInTheDocument();

    // Check if the CardTitle is rendered
    const cardTitle = screen.getByText('Please Confirm your email address');
    expect(cardTitle).toBeInTheDocument();
    expect(cardTitle).toHaveClass('text-secondary-blue');

    // Check if the CardDescription is rendered
    const cardDescription = screen.getByText('Take as second to make sure we have the correct email for you.');
    expect(cardDescription).toBeInTheDocument();
    expect(cardDescription).toHaveClass('text-secondary-blue');

  });

  test('renders the layout correctly', () => {
    render(<VerifyPage />);

    // Check if the main container has the correct classes
    const mainContainer = screen.getByRole('main');
    expect(mainContainer).toHaveClass('flex', 'min-h-svh', 'flex-col', 'items-center', 'justify-center', 'bg-muted', 'p-6', 'md:p-10', 'text-secondary-blue');
  });
});
