import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ScrollProgress from './ScrollProgress';

expect.extend(toHaveNoViolations);

describe('ScrollProgress Component', () => {
  it('should render successfully', () => {
    const { container } = render(<ScrollProgress />);
    expect(container).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ScrollProgress />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
