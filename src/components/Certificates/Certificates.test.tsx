import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Certificates from './Certificates';

expect.extend(toHaveNoViolations);

describe('Certificates Component', () => {
  it('should render section title successfully', () => {
    render(<Certificates />);
    expect(screen.getByText('Certificates')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Certificates />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
