'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SCROLL_ANIMATIONS } from '@/lib/animations';

interface ScrollAnimateProps {
  children: ReactNode;
  variant?: keyof typeof SCROLL_ANIMATIONS;
  delay?: number;
  className?: string;
}

export function ScrollAnimate({
  children,
  variant = 'fadeIn',
  delay = 0,
  className = '',
}: ScrollAnimateProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const animation = SCROLL_ANIMATIONS[variant];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        ...animation,
        visible: {
          ...animation.visible,
          transition: {
            ...(animation.visible as any)?.transition,
            delay,
          },
        },
      } as any}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered container for animating multiple children
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function StaggerContainer({
  children,
  className = '',
  delay = 0,
}: StaggerContainerProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={SCROLL_ANIMATIONS.staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div
      variants={SCROLL_ANIMATIONS.staggerItem}
      className={className}
    >
      {children}
    </motion.div>
  );
}
