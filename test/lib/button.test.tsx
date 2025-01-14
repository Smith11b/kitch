import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '@/lib/components/button/Button';

describe('Button', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the button with text', () => {
    render(<Button text="Click Me" onClick={mockOnClick} type="Primary" />);
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
  });

  test('calls onClick when button is clicked', () => {
    render(<Button text="Click Me" onClick={mockOnClick} type="Primary" />);
    const button = screen.getByText('Click Me');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('applies the correct class for the button type', () => {
    render(<Button text="Click Me" onClick={mockOnClick} type="Primary" />);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('Primary');
  });

  test('applies additional class names', () => {
    render(<Button text="Click Me" onClick={mockOnClick} type="Primary" className="extra-class" />);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('Primary', 'extra-class');
  });

  test('applies disabled class and attribute when disabled', () => {
    render(<Button text="Click Me" onClick={mockOnClick} type="Primary" disabled />);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('disabled');
    expect(button).toBeDisabled();
  });

  test("applies disabled class to google type when disabled", () => {
    render(<Button text="Click Me" onClick={mockOnClick} type="Google" disabled />);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('disabled');
    expect(button).toBeDisabled();
  });

  test('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    render(<Button text="Click Me" onClick={mockOnClick} type="Primary" style={customStyle} />);
    const button = screen.getByText('Click Me');
    expect(button).toHaveStyle(customStyle);
  });

  test('renders Google button with correct class', () => {
    render(<Button text="Sign in with Google" onClick={mockOnClick} type="Google" />);
    const button = screen.getByText('Sign in with Google');
    expect(button).toHaveClass('Google');
  });
});
