import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '@/app/(pages)/dashboard/page';

describe('Dashboard', () => {
  test('renders the Dashboard component', () => {
    render(<Dashboard />);


    const image = screen.getByAltText('Kitch');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/logo pink.png');


    const heading = screen.getByText('Dashboard Coming soon!');
    expect(heading).toBeInTheDocument();
  });
});
