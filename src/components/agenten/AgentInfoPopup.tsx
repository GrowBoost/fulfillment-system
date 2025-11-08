"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { InfoIcon } from "@/icons";

interface AgentInfoPopupProps {
  name: string;
  runs: number;
  timeSaved: string;
  moneySaved: string;
  qualityScore: number;
}

const AgentInfoPopup: React.FC<AgentInfoPopupProps> = ({
  name,
  runs,
  timeSaved,
  moneySaved,
  qualityScore,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipStyle, setTooltipStyle] = useState({});

  const calculateTooltipPosition = useCallback(() => {
    if (iconRef.current && tooltipRef.current) {
      const iconRect = iconRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      // Position the tooltip above the icon, centered horizontally
      const top = iconRect.top - tooltipRect.height - 8; // 8px margin
      const left = iconRect.left + (iconRect.width / 2) - (tooltipRect.width / 2);

      setTooltipStyle({ top: `${top}px`, left: `${left}px` });
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      calculateTooltipPosition();
      window.addEventListener("resize", calculateTooltipPosition);
      window.addEventListener("scroll", calculateTooltipPosition, true); // Use capture phase for scroll
    } else {
      window.removeEventListener("resize", calculateTooltipPosition);
      window.removeEventListener("scroll", calculateTooltipPosition, true);
    }

    return () => {
      window.removeEventListener("resize", calculateTooltipPosition);
      window.removeEventListener("scroll", calculateTooltipPosition, true);
    };
  }, [isVisible, calculateTooltipPosition]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div
        ref={iconRef}
        className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-pointer"
        aria-label={`Information about ${name}`}
      >
        <InfoIcon className="w-4 h-4" />
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed p-3 rounded-lg shadow-lg bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 z-[999]"
          style={tooltipStyle}
        >
          <h6 className="font-semibold text-gray-800 dark:text-white/90 mb-2">
            {name} - Statistiken
          </h6>
          <p className="mb-1">
            <span className="font-medium">Läufe:</span> {runs}
          </p>
          <p className="mb-1">
            <span className="font-medium">Zeit gespart:</span> {timeSaved}
          </p>
          <p className="mb-1">
            <span className="font-medium">Geld gespart:</span> {moneySaved}
          </p>
          <p>
            <span className="font-medium">Qualitätsscore:</span> {qualityScore}
          </p>
          <div className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white dark:border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

export default AgentInfoPopup;
