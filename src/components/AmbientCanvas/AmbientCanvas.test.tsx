import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import AmbientCanvas from './AmbientCanvas';

expect.extend(toHaveNoViolations);

describe('AmbientCanvas Component', () => {
  it('should render successfully', () => {
    const { container } = render(<AmbientCanvas />);
    expect(container).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<AmbientCanvas />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
