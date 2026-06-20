import '@testing-library/jest-dom';
import React from 'react';

// Mock Swiper since it contains ESM modules that are not easily transpiled by Jest
jest.mock('swiper/react', () => ({
  Swiper: ({ children, pagination, navigation, autoplay, ...props }: any) => {
    return React.createElement('div', { 'data-testid': 'swiper-mock', ...props }, children);
  },
  SwiperSlide: ({ children, ...props }: any) => {
    return React.createElement('div', { 'data-testid': 'swiper-slide-mock', ...props }, children);
  },
}));

jest.mock('swiper/modules', () => ({
  Pagination: () => null,
  Autoplay: () => null,
  Navigation: () => null,
  EffectCoverflow: () => null,
}));

jest.mock('swiper/css', () => {});
jest.mock('swiper/css/pagination', () => {});
jest.mock('swiper/css/navigation', () => {});
jest.mock('swiper/css/effect-coverflow', () => {});

// Mock next/image
jest.mock('next/image', () => {
  const MockImage = ({ fill, priority, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement('img', { 
      ...props, 
      src: props.src || '',
      style: fill 
        ? { objectFit: props.style?.objectFit || 'cover', width: '100%', height: '100%' }
        : props.style
    });
  };
  MockImage.displayName = 'MockImage';
  return MockImage;
});
