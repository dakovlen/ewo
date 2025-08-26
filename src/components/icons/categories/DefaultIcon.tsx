export function DefaultIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      width={props.width ?? "24px"}
      height={props.height ?? "24px"}
      {...props}
    >
      <g>
        <rect width="14" height="20" x="1" y="1" rx="3" />
        <rect width="14" height="8" x="1" y="23" rx="3" />
        <rect width="14" height="20" x="17" y="11" rx="3" />
        <rect width="14" height="8" x="17" y="1" rx="3" />
      </g>
    </svg>
  );
}
