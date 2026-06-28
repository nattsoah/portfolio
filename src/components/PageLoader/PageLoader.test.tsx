import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import PageLoader from './PageLoader';

expect.extend(toHaveNoViolations);

describe('PageLoader Component', () => {
  it('should render successfully', () => {
    const { container } = render(<PageLoader />);
    const loaderElement = container.querySelector('#page-loader-container');
    expect(loaderElement).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<PageLoader />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
