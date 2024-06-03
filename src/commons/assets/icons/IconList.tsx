import { IconPropsType } from '@/types/global/icon';

export default function IconList({ width = '16', height = '16' }: IconPropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M18 4H0V0H18V4ZM18 6H0V10H18V6ZM18 12H0V16H18V12Z" />
    </svg>
  );
}
