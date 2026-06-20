import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Skills from './Skills';
import { SKILLS_DATA } from '@/const/portfolio';

expect.extend(toHaveNoViolations);

describe('Skills Component', () => {
  it('should render successfully without crashing (smoke test)', () => {
    const { container } = render(<Skills />);
    expect(container).toBeInTheDocument();
  });

  it('should display correct skills and categories from SKILLS_DATA', () => {
    render(<Skills />);

    SKILLS_DATA.forEach((category) => {
      // Check category name is visible
      expect(screen.getByText(category.category)).toBeInTheDocument();
      // Check category description is visible
      expect(screen.getByText(category.description)).toBeInTheDocument();
      
      // Check category skills are visible
      category.skills.forEach((skill) => {
        expect(screen.getByText(skill)).toBeInTheDocument();
      });
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Skills />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
