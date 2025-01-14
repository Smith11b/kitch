import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompanySetupPage from '@/app/(pages)/setup/company/page';

global.URL.createObjectURL = jest.fn();



jest.mock('@/app/(pages)/setup/company/company-form', () => ({
  CompanyForm: ({ companyData, onInputChange, onLogoUpload }) => (
    <div>
      <input
        type="text"
        name="name"
        value={companyData.name}
        onChange={onInputChange}
        placeholder="Company Name"
      />
      <input
    aria-label="Company Logo"
        type="file"
        name="logo"
        onChange={(e) => onLogoUpload(e.target.files ? e.target.files[0] : null)}
      />
    </div>
  ),
}));

jest.mock('@/app/(pages)/setup/company/preview-card', () => ({
  PreviewCard: ({ companyData }) => (
    <div>
      <h2>{companyData.name}</h2>
      {companyData.logo && <img src={URL.createObjectURL(companyData.logo)} alt="Company Logo" />}
    </div>
  ),
}));

describe('CompanySetupPage', () => {
  test('renders the CompanySetupPage component', () => {
    render(<CompanySetupPage />);


    const companyNameInput = screen.getByPlaceholderText('Company Name');
    expect(companyNameInput).toBeInTheDocument();


    const previewCardHeading = screen.getByText('Company Info');
    expect(previewCardHeading).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(<CompanySetupPage />);

    const companyNameInput = screen.getByPlaceholderText('Company Name');
    fireEvent.change(companyNameInput, { target: { value: 'Test Company' } });

    expect(companyNameInput).toHaveValue('Test Company');
  });

  test('handles logo upload', () => {
    render(<CompanySetupPage />);

    const file = new File(['logo'], 'logo.png', { type: 'image/png' });
    const logoInput = screen.getByLabelText('Company Logo');
    fireEvent.change(logoInput, { target: { files: [file] } });

    const previewImage = screen.getByAltText('Company Logo');
    expect(previewImage).toBeInTheDocument();
  });
});
