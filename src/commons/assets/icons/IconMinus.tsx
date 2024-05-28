import { IconPropsType } from "../../dto/IconPropsType";

export default function IconMinus({
	width = "10",
	height = "2",
}: IconPropsType) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 10 2"
			fill="currentColor"
		>
			<path d="M0 2V0H10V2H0Z" />
		</svg>
	);
}
