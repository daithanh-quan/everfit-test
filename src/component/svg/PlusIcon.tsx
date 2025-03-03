import React from "react";

interface PlusIconProps {
  className?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({ className }) => {
  return (
    <svg
      width="13"
      height="14"
      viewBox="0 0 13 14"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="6.07898" cy="7.23984" rx="6" ry="6.31824" fill="#A0A8B1" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.07898 6.1867V4.08058H5.07898V6.1867H3.07898V8.29278H5.07898V10.3988H7.07898V8.29278H9.07898V6.1867H7.07898Z"
        fill="white"
      />
    </svg>
  );
};

export default PlusIcon;
