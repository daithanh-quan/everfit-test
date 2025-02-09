import React from "react";

type EllipsisHorizontalProps = {
  className?: string;
};

const EllipsisHorizontal: React.FC<EllipsisHorizontalProps> = ({
  className,
}) => {
  return (
    <svg
      width="12"
      height="4"
      viewBox="0 0 12 4"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="2" cy="1.72606" rx="1.5" ry="1.47981" fill="#C4C4C4" />
      <ellipse cx="6" cy="1.72606" rx="1.5" ry="1.47981" fill="#C4C4C4" />
      <ellipse cx="10" cy="1.72606" rx="1.5" ry="1.47981" fill="#C4C4C4" />
    </svg>
  );
};

export default EllipsisHorizontal;
