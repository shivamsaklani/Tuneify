"use client";

import { motion } from "framer-motion";

interface AnimateProps {
  text?: string;
  dotColor?: string;
  fullScreen?: boolean;
}

export const Animate: React.FC<AnimateProps> = ({
  text = "Loading",
  dotColor = "bg-white",
  fullScreen = true, 
}) => {
  return (
    <div
      className={`bg-primary flex flex-col items-center justify-center space-y-6 ${
        fullScreen ? "h-screen w-screen" : ""
      }`}
    >
      <h1 className="text-white text-4xl font-semibold tracking-wider animate-pulse">
        {text}
      </h1>

      <div className="flex gap-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`w-4 h-4 rounded-full ${dotColor} shadow-lg`}
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
