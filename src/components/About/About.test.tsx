import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import About from './About';
import { ABOUT_DATA } from '@/const/portfolio';

expect.extend(toHaveNoViolations);

describe('About Component', () => {
  it('should render successfully without crashing (smoke test)', () => {
    const { container } = render(<About />);
    expect(container).toBeInTheDocument();
  });

  it('should display correct title and stats from ABOUT_DATA', () => {
    render(<About />);
    
    // Check title
    expect(screen.getByText(ABOUT_DATA.title)).toBeInTheDocument();
    
    // Check descriptions
    ABOUT_DATA.description.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });

    // Check stats
    ABOUT_DATA.stats.forEach((stat) => {
      const elements = screen.getAllByText(stat.value);
      expect(elements.length).toBeGreaterThan(0);
      expect(elements[0]).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<About />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
