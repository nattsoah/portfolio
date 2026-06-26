import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import SmoothScroll from './SmoothScroll';

expect.extend(toHaveNoViolations);

describe('SmoothScroll Component', () => {
  it('should render children successfully', () => {
    render(<SmoothScroll><span>Test Smooth Scroll Child</span></SmoothScroll>);
    expect(screen.getByText('Test Smooth Scroll Child')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<SmoothScroll><span>Test Smooth Scroll Child</span></SmoothScroll>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
