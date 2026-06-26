import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import SectionHeading from './SectionHeading';

expect.extend(toHaveNoViolations);

describe('SectionHeading Component', () => {
  it('should render successfully with correct title', () => {
    render(<SectionHeading title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<SectionHeading title="Test Title" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
