import { IconPropsType } from "@/types/global/icon";

export default function IconBag({
	width = "14",
	height = "17",
}: IconPropsType) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 14 17"
			fill="currentColor"
		>
			<path d="M1.75 16.5C1.3375 16.5 0.98425 16.3533 0.69025 16.0597C0.39675 15.7657 0.25 15.4125 0.25 15V6C0.25 5.5875 0.39675 5.2345 0.69025 4.941C0.98425 4.647 1.3375 4.5 1.75 4.5H3.25C3.25 3.4625 3.61575 2.578 4.34725 1.8465C5.07825 1.1155 5.9625 0.75 7 0.75C8.0375 0.75 8.922 1.1155 9.6535 1.8465C10.3845 2.578 10.75 3.4625 10.75 4.5H12.25C12.6625 4.5 13.0157 4.647 13.3097 4.941C13.6033 5.2345 13.75 5.5875 13.75 6V15C13.75 15.4125 13.6033 15.7657 13.3097 16.0597C13.0157 16.3533 12.6625 16.5 12.25 16.5H1.75ZM1.75 15H12.25V6H1.75V15ZM7 10.5C8.0375 10.5 8.922 10.1342 9.6535 9.40275C10.3845 8.67175 10.75 7.7875 10.75 6.75H9.25C9.25 7.375 9.03125 7.90625 8.59375 8.34375C8.15625 8.78125 7.625 9 7 9C6.375 9 5.84375 8.78125 5.40625 8.34375C4.96875 7.90625 4.75 7.375 4.75 6.75H3.25C3.25 7.7875 3.61575 8.67175 4.34725 9.40275C5.07825 10.1342 5.9625 10.5 7 10.5ZM4.75 4.5H9.25C9.25 3.875 9.03125 3.34375 8.59375 2.90625C8.15625 2.46875 7.625 2.25 7 2.25C6.375 2.25 5.84375 2.46875 5.40625 2.90625C4.96875 3.34375 4.75 3.875 4.75 4.5Z" />
		</svg>
	);
}
