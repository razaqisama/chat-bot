import { IconProps } from "../types";

function ChevronRightIcon({
  className,
  size = 24,
  color = "currentColor",
  strokeWidth = 1.5,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      stroke={color}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );
}

export default ChevronRightIcon;
