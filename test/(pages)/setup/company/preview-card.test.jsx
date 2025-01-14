import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'http://localhost/logo.png');
import '@testing-library/jest-dom';
import { PreviewCard } from '@/app/(pages)/setup/company/preview-card';

describe('PreviewCard', () => {
  const companyData = {
    name: 'Test Company',
    primaryColor: '#123456',
    secondaryColor: '#654321',
    logo: new File(['logo'], 'logo.png', { type: 'image/png' }),
  };

  test('renders the PreviewCard component with company name and primary color', () => {
    render(<PreviewCard companyData={companyData} />);

    // Check if the company name is rendered with the correct color
    const companyName = screen.getByText('Test Company');
    expect(companyName).toBeInTheDocument();
    expect(companyName).toHaveStyle({ color: '#123456' });
  });

  test('renders the company logo if provided', () => {
    render(<PreviewCard companyData={companyData} />);

    // Check if the company logo is rendered
    const logo = screen.getByAltText('Company Logo');
    expect(logo).toBeInTheDocument();
    expect(logo.getAttribute('src')).not.toBeNull();
  });

  test('renders default company name if name is not provided', () => {
    const companyDataWithoutName = { ...companyData, name: '' };
    render(<PreviewCard companyData={companyDataWithoutName} />);

    // Check if the default company name is rendered
    const defaultCompanyName = screen.getByText('Company Name');
    expect(defaultCompanyName).toBeInTheDocument();
  });

  test('does not render the company logo if not provided', () => {
    const companyDataWithoutLogo = { ...companyData, logo: null };
    render(<PreviewCard companyData={companyDataWithoutLogo} />);

    // Check if the company logo is not rendered
    const logo = screen.queryByAltText('Company Logo');
    expect(logo).not.toBeInTheDocument();
  });
});
