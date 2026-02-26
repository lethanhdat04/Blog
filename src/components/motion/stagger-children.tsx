"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function StaggerChildren({
  children,
  className,
  delay = 0,
  staggerDelay = 0.1,
}: StaggerChildrenProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
