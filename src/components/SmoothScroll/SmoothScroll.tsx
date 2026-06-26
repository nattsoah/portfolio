'use client';
import React, { useEffect } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  useEffect(() => {
    // Only apply to desktop devices that support hover (mice/trackpads)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;
    const ease = 0.085; // Easing coefficient (lower = smoother)
    let isMoving = false;
    let animationFrameId: number;

    const handleWheel = (e: WheelEvent) => {
      // If scroll target is inside a dialog/modal, let the native scroll handle it
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.closest('.MuiDialog-root') ||
         target.closest('.MuiDialog-container') ||
         target.closest('[role="dialog"]') ||
         target.closest('[role="presentation"]'))
      ) {
        return;
      }

      // Prevent browser's native harsh jump scroll
      e.preventDefault();

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = Math.max(0, Math.min(scrollHeight, targetScroll + e.deltaY));

      if (!isMoving) {
        isMoving = true;
        animate();
      }
    };

    const animate = () => {
      currentScroll += (targetScroll - currentScroll) * ease;

      // Perform the eased window scroll
      window.scrollTo(0, currentScroll);

      if (Math.abs(targetScroll - currentScroll) > 0.5) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        isMoving = false;
        window.scrollTo(0, targetScroll);
      }
    };

    // If the scroll position is updated natively (e.g. scrollbar drag or anchor links)
    const handleScroll = () => {
      if (!isMoving) {
        targetScroll = window.scrollY;
        currentScroll = window.scrollY;
      }
    };

    // Register event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
