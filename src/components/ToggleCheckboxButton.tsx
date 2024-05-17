import { useId } from "react";

export default function ToggleCheckboxButton() {
	const id = useId();
	return (
		<label htmlFor={`check - ${id}`} className="toggle-checkbox">
			<input
				type="checkbox"
				style={{
					display: "none",
				}}
				id={`check - ${id}`}
			/>
			<div className="circle"></div>
		</label>
	);
}
