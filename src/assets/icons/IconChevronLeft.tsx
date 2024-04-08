import { IconPropsType } from "../../dto/IconPropsType";

export default function IconChevronLeft({
	width = "20",
	height = "20",
}: IconPropsType) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 20 20"
			fill="none"
		>
			<path
				d="M11.6665 13.3333L8.33317 9.99998L11.6665 6.66665"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
}
