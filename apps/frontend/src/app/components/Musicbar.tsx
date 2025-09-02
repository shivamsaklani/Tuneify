import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface MusicBarsProps {
  isPlaying?: boolean;
  barCount?: number;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

const MusicBars = ({
  isPlaying = true,
  barCount = 5,
  className,
  primaryColor = "	#008000",
  secondaryColor = "rgb(16, 212, 16)"
}: MusicBarsProps) => {
  const [barHeights, setBarHeights] = useState<number[]>([]);
  
  useEffect(() => {
    const initialHeights = Array.from(
      { length: barCount },
      () => Math.floor(Math.random() * 70) + 30
    );
    setBarHeights(initialHeights);

   if (isPlaying) {
      const interval = setInterval(() => {
        setBarHeights(prevHeights => 
          prevHeights.map(() => Math.floor(Math.random() * 70) + 30)
        );
      }, 200);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, barCount]);

  return (
    <div className={twMerge("flex items-end justify-center h-24 gap-1", className)}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        {barHeights.map((height, index) => {
          const barWidth = 100 / (barCount * 2 - 1);
          const x = index * barWidth * 2;
          
          return (
            <rect
              key={index}
              x={x}
              y={100 - height}
              width={barWidth}
              height={height}
              rx={2}
              className={`transition-all duration-200 ease-in-out ${isPlaying ? '' : 'opacity-50'}`}
              fill={index % 2 === 0 ? primaryColor : secondaryColor}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default MusicBars;