
import '@testing-library/jest-dom';
import { render, screen, } from '@testing-library/react';
import Homepage from '../../app/page.tsx';

describe('Homepage', () => {
test('renders the component', () => {
    render(<Homepage />);

    // Select the first h1 element
    const header = screen.getByRole('heading', { level: 1 });

    // Check if the text content includes the expected text
    expect(header).toHaveTextContent("Your customers are hungry. Our software helps you feed them.");
  });

  test('renders subtitle.', () => {
    render(<Homepage />);

    // Select the first h2 element
    const subtitle = screen.getByTestId('homepage-subheader')

    // Check if the text content includes the expected text
    expect(subtitle).toHaveTextContent("Running a meal prep business ain’t easy (unless you have kitch). Quick menu creation, easy order fulfillment, and a website live in just minutes. Stop wasting hours taking customer orders and grow your business.");
  });

  test('renders email form.', () => {
    render(<Homepage />);

    // Select the first input element
    const input = screen.getByPlaceholderText('Enter your email');

    // Check if the input element is rendered
    expect(input).toBeInTheDocument();
  })
});
