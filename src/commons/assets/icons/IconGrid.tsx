import { IconPropsType } from '@/types/global/icon';

export default function IconGrid({ width = '16', height = '16' }: IconPropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="currentColor"
    >
      <path d="M8 0H0V8H8V0Z" />
      <path d="M8 10H0V18H8V10Z" />
      <path d="M18 0H10V8H18V0Z" />
      <path d="M18 10H10V18H18V10Z" />
    </svg>
  );
}
