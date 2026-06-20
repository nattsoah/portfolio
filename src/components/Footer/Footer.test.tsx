import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Footer from './Footer';
import { SITE_NAME } from '@/const/navigation';

expect.extend(toHaveNoViolations);

describe('Footer Component', () => {
  it('should render successfully without crashing (smoke test)', () => {
    const { container } = render(<Footer />);
    expect(container).toBeInTheDocument();
  });

  it('should display correct copyright information and site name', () => {
    render(<Footer />);
    
    // Check site name
    expect(screen.getByText(SITE_NAME)).toBeInTheDocument();
    
    // Check copyright year
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
