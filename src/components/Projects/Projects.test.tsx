import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Projects from './Projects';

expect.extend(toHaveNoViolations);

describe('Projects Component', () => {
  it('should render section title successfully', () => {
    render(<Projects />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Projects />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
