import { IconPropsType } from "@/types/global/icon";
export default function IconOutlineLocation({
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
			<circle
				cx="12"
				cy="11"
				r="3"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path
				d="M21 10.8889C21 15.7981 15.375 22 12 22C8.625 22 3 15.7981 3 10.8889C3 5.97969 7.02944 2 12 2C16.9706 2 21 5.97969 21 10.8889Z"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
		</svg>
	);
}
