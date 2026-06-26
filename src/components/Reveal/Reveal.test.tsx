import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Reveal from './Reveal';

expect.extend(toHaveNoViolations);

describe('Reveal Component', () => {
  it('should render children successfully', () => {
    render(<Reveal><span>Test Reveal Child</span></Reveal>);
    expect(screen.getByText('Test Reveal Child')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Reveal><span>Test Reveal Child</span></Reveal>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
