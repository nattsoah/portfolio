import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Hero from './Hero';
import { HERO_DATA } from '@/const/portfolio';

expect.extend(toHaveNoViolations);

describe('Hero Component', () => {
  it('should render CTA button and subtitle successfully', () => {
    render(<Hero />);
    expect(screen.getByText(HERO_DATA.ctaText)).toBeInTheDocument();
    expect(screen.getByText(HERO_DATA.subtitle)).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Hero />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
