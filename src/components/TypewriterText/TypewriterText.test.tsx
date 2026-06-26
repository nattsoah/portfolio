import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import TypewriterText from './TypewriterText';

expect.extend(toHaveNoViolations);

describe('TypewriterText Component', () => {
  it('should render successfully', () => {
    const { container } = render(<TypewriterText />);
    expect(container).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<TypewriterText />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
