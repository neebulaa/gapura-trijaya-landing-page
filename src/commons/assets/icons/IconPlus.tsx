import { IconPropsType } from "@/types/global/icon";

export default function IconBag({
	width = "14",
	height = "14",
}: IconPropsType) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 14 14"
			fill="currentColor"
		>
			<path d="M6 14V8H0V6H6V0H8V6H14V8H8V14H6Z" />
		</svg>
	);
}
