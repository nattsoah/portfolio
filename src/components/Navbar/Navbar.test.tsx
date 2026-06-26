import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Navbar from './Navbar';

expect.extend(toHaveNoViolations);

// Mock useColorMode
jest.mock('@/components/ThemeRegistry', () => ({
  useColorMode: () => ({
    mode: 'dark',
    toggleColorMode: jest.fn(),
  }),
}));

describe('Navbar Component', () => {
  it('should render successfully with site logo/name', () => {
    render(<Navbar />);
    const logoTexts = screen.getAllByText(/portfolio/i);
    expect(logoTexts.length).toBeGreaterThan(0);
    expect(logoTexts[0]).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Navbar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
