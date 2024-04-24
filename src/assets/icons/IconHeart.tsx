import { IconPropsType } from "../../dto/IconPropsType";

export default function IconHeart({
	width = "24",
	height = "24",
}: IconPropsType) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
		>
			<path
				d="M12 8.19444C10 3.5 3 4 3 10C3 16.0001 12 21 12 21C12 21 21 16.0001 21 10C21 4 14 3.5 12 8.19444Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
