import { IconPropsType } from "../../dto/IconPropsType";

export default function IconChevronDown({
	width = "20",
	height = "20",
	color = "black"
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
				d="M13.3335 8.33331L10.0002 11.6666L6.66683 8.33331"
				stroke={color}
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
}
