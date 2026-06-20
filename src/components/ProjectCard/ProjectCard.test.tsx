import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import ProjectCard from './ProjectCard';
import { ProjectItem } from '@/types/portfolio';

expect.extend(toHaveNoViolations);

const mockProject: ProjectItem = {
  title: 'Test Project',
  type: 'Web App',
  description: 'This is a test description for the project.',
  image: '/images/test-project.png',
  tags: ['React', 'MUI', 'Jest'],
  github: 'https://github.com/test/project',
  demo: 'https://demo.com',
  previewImage: '/images/test-preview.png',
};

describe('ProjectCard Component', () => {
  it('should render successfully without crashing (smoke test)', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    expect(container).toBeInTheDocument();
  });

  it('should display correct project details', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Web App')).toBeInTheDocument();
    expect(screen.getByText('This is a test description for the project.')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('MUI')).toBeInTheDocument();
    expect(screen.getByText('Jest')).toBeInTheDocument();
  });

  it('should trigger onOpenMedia callback when clicking preview icon button', async () => {
    const mockOnOpen = jest.fn();
    render(<ProjectCard project={mockProject} onOpenMedia={mockOnOpen} />);

    const previewButton = screen.getByLabelText('Test Project preview');
    expect(previewButton).toBeInTheDocument();

    await userEvent.click(previewButton);
    expect(mockOnOpen).toHaveBeenCalledTimes(1);
    expect(mockOnOpen).toHaveBeenCalledWith(mockProject);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
