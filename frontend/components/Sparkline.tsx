"use client";
import React from "react";

interface Props { data?: number[]; width?: number; height?: number; color?: string; }

export const Sparkline: React.FC<Props> = ({ data, width = 80, height = 24, color = "#3b82f6" }) => {
  if (!data || data.length < 2) return <span>-</span>;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const norm = data.map(v => (v - min) / (max - min || 1));
  const points = norm.map((v, i) => {
    const x = (i / (norm.length - 1)) * width;
    const y = height - v * height;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={width} height={height}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
      />
    </svg>
  );
};
