import { IconPropsType } from "@/types/global/icon";

export default function IconLocation({
	width = "20",
	height = "20",
}: IconPropsType) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 32 32"
		>
			<path
				d="m16 0c8.836556 0 16 7.163444 16 16s-7.163444 16-16 16-16-7.163444-16-16 7.163444-16 16-16zm1 9h-2l.000151 6.9280812-.0023391.0030391.0020555.4829607 6.8285597 6.8285597 1.4142136-1.4142136-6.2420846-6.2432927z"
				fill="currentColor"
				fillRule="evenodd"
			/>
		</svg>
	);
}
