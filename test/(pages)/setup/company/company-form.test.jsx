import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CompanyForm } from '@/app/(pages)/setup/company/company-form';
import * as colorService from '@/app/service/colorService/colors'; // Import the color service

// Mock the getColorsFromWebsite function
jest.mock('@/app/service/colorService/colors', () => ({
    getColorsFromWebsite: jest.fn(),
}));

describe('CompanyForm', () => {
    const mockOnInputChange = jest.fn();
    const mockOnLogoUpload = jest.fn();
    const companyData = {
        name: '',
        address: '',
        website: '',
        primaryColor: '#000000',
        secondaryColor: '#ffffff',
        logo: null,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the CompanyForm component', () => {
        render(
            <CompanyForm
                companyData={companyData}
                onInputChange={mockOnInputChange}
                onLogoUpload={mockOnLogoUpload}
            />
        );

        // Check if all input fields are rendered
        expect(screen.getByLabelText('Company Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Company Address')).toBeInTheDocument();
        expect(screen.getByLabelText('Website')).toBeInTheDocument();
        expect(screen.getByLabelText('Primary Brand Color')).toBeInTheDocument();
        expect(screen.getByLabelText('Secondary Brand Color')).toBeInTheDocument();
        expect(screen.getByLabelText('Company Logo')).toBeInTheDocument();
    });

    test('handles input changes', () => {
        render(
            <CompanyForm
                companyData={companyData}
                onInputChange={mockOnInputChange}
                onLogoUpload={mockOnLogoUpload}
            />
        );

        const nameInput = screen.getByLabelText('Company Name');
        fireEvent.change(nameInput, { target: { value: 'Test Company' } });

        expect(mockOnInputChange).toHaveBeenCalledWith(expect.any(Object));
    });

    test('handles logo upload', () => {
        render(
            <CompanyForm
                companyData={companyData}
                onInputChange={mockOnInputChange}
                onLogoUpload={mockOnLogoUpload}
            />
        );

        const file = new File(['logo'], 'logo.png', { type: 'image/png' });
        const logoInput = screen.getByLabelText('Company Logo');
        fireEvent.change(logoInput, { target: { files: [file] } });

        expect(mockOnLogoUpload).toHaveBeenCalledWith(file);
    });

    test('uploads undefined if no file is selected', () => {
        render(<CompanyForm companyData={companyData} onInputChange={mockOnInputChange} onLogoUpload={mockOnLogoUpload} />);
        const logoInput = screen.getByLabelText('Company Logo');
        fireEvent.change(logoInput, { target: { files: null} });

        expect(mockOnLogoUpload).toHaveBeenCalledWith(null);
    });

    test('calls getColorsFromWebsite when website input blurs', () => {
        render(
            <CompanyForm
                companyData={companyData}
                onInputChange={mockOnInputChange}
                onLogoUpload={mockOnLogoUpload}
            />
        );

        const websiteInput = screen.getByLabelText('Website');
        fireEvent.blur(websiteInput, { target: { value: 'https://example.com' } });

        expect(colorService.getColorsFromWebsite).toHaveBeenCalledWith('https://example.com');
    });

    test('does not call getColorsFromWebsite when website input is empty', () => {
        render(
            <CompanyForm
                companyData={companyData}
                onInputChange={mockOnInputChange}
                onLogoUpload={mockOnLogoUpload}
            />
        );

        const websiteInput = screen.getByLabelText('Website');
        fireEvent.blur(websiteInput, { target: { value: '' } });

        expect(colorService.getColorsFromWebsite).not.toHaveBeenCalled();
    });

    test('does not call getColorsFromWebsite when website input is invalid', () => {
        render(
            <CompanyForm
                companyData={companyData}
                onInputChange={mockOnInputChange}
                onLogoUpload={mockOnLogoUpload}
            />
        );

        const websiteInput = screen.getByLabelText('Website');
        fireEvent.blur(websiteInput, { target: { value: 'invalid-url' } });

        expect(colorService.getColorsFromWebsite).not.toHaveBeenCalled();
    });

    test('updates primary and secondary color inputs when colors are returned from getColorsFromWebsite', async () => {
        const colors = { primaryColor: '#123456', secondaryColor: '#654321' };
        colorService.getColorsFromWebsite.mockResolvedValueOnce(colors);
        const mockOnInputChange = jest.fn((e) => {
            const { name, value } = e.target;
            companyData[name] = value;
        });

        render(
            <CompanyForm
                companyData={companyData}
                onInputChange={mockOnInputChange}
                onLogoUpload={mockOnLogoUpload}
            />
        );

        const websiteInput = screen.getByLabelText('Website');
        fireEvent.blur(websiteInput, { target: { value: 'https://example.com' } });

        await waitFor(() => {
            expect(mockOnInputChange).toHaveBeenCalledWith({ target: { name: 'primaryColor', value: '#123456' } });
            expect(mockOnInputChange).toHaveBeenCalledWith({ target: { name: 'secondaryColor', value: '#654321' } });
        });
    });

    expect(colorService.getColorsFromWebsite).not.toHaveBeenCalled();
});
