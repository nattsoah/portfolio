import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ScrollCable from './ScrollCable';

expect.extend(toHaveNoViolations);

describe('ScrollCable Component', () => {
  it('should render successfully', () => {
    const { container } = render(<ScrollCable />);
    expect(container).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ScrollCable />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
