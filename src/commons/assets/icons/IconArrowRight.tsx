import { IconPropsType } from "@/types/global/icon";

export default function IconArrowRight({
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
			<g clip-path="url(#clip0_540_9390)">
				<path
					d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
					fill="currentColor"
				/>
			</g>
			<defs>
				<clipPath id="clip0_540_9390">
					<rect width="24" height="24" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
}
