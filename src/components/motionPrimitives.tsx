import React from 'react';
import { motion } from 'motion/react';

export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealInViewProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function RevealInView({
  children,
  className = '',
  delay = 0,
  y = 22,
}: RevealInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.55, delay, ease: EASE_OUT_EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface FloatingShowcaseProps {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}

export function FloatingShowcase({
  children,
  className = '',
  amplitude = 8,
  duration = 5.4,
  delay = 0,
}: FloatingShowcaseProps) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
