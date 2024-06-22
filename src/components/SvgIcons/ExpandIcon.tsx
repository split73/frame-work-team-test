export const ExpandIcon = ({
  fill,
  className,
}: {
  fill: string;
  className: string;
}) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 13L4.80385 7.75L15.1962 7.75L10 13Z" fill={fill} />
    </svg>
  );
};
