"use client";
import { motion } from "motion/react";

export const Animate = () => {
  return (
    <div className="bg-primary h-screen w-screen flex flex-col items-center justify-center space-y-6">
      <h1 className="text-white text-4xl font-semibold tracking-wider animate-pulse">
        Loading
      </h1>

      <div className="flex gap-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-full bg-white shadow-lg"
            animate={{ y: [0, -16, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};
