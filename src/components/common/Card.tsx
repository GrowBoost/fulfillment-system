import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  headerContent?: React.ReactNode; // New prop for flexible header content
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className, headerContent, onClick }) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-white/[0.03] xl:px-6 xl:py-6 ${
        className || ""
      }`}
      onClick={onClick}
    >
      {headerContent && (
        <div className="pb-4 mb-4 border-b border-gray-300 dark:border-white/[0.05] -mx-4 xl:-mx-6 px-4 xl:px-6">
          {headerContent}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
