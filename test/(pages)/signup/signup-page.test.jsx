import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupPage from '@/app/(pages)/signup/page';


// Mock the SignupForm component
jest.mock('@/components/signup-form', () => ({
  SignupForm: () => <div>Mocked SignupForm</div>,
}));

describe('SignupPage', () => {
  test('renders the SignupPage component', () => {
    render(<SignupPage />);

    // Check if the logo is rendered
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/kitch.png');

    // Check if the SignupForm is rendered
    const signupForm = screen.getByText('Mocked SignupForm');
    expect(signupForm).toBeInTheDocument();
  });

  test('renders the layout correctly', () => {
    render(<SignupPage />);

    // Check if the main container has the correct classes
    const mainContainer = screen.getByRole('main');
    expect(mainContainer).toHaveClass('grid', 'min-h-svh', 'lg:grid-cols-2');

    // Check if the left column has the correct classes
    const leftColumn = screen.getByLabelText('left-column');
    expect(leftColumn).toHaveClass('flex', 'flex-col', 'gap-4', 'p-6', 'md:p-10');

    // Check if the right column has the correct classes
    const rightColumn = screen.getByLabelText('right-column');
    expect(rightColumn).toHaveClass('relative', 'hidden', 'bg-muted', 'lg:block');
  });
});
