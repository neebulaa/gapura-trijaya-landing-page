import { IconPropsType } from "@/types/global/icon";

export default function IconUser({
	width = "24",
	height = "25",
}: IconPropsType) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
		>
			<ellipse
				cx="12"
				cy="17.5"
				rx="7"
				ry="3.5"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinejoin="round"
			/>
			<circle
				cx="12"
				cy="7"
				r="4"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
