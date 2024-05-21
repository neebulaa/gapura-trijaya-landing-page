import { ReactNode, useState } from "react";
import IconCross from "./../assets/icons/IconCross";

interface AlertProps {
	type?: "primary" | "danger" | "warning";
	children: ReactNode;
	className: string;
}

export default function Alert({
	type = "primary",
	children,
	className,
}: AlertProps) {
	const [open, setOpen] = useState(true);
	return (
		<>
			{open && (
				<div className={`alert ${type} ${className}`}>
					{children}{" "}
					<span
						onClick={() => setOpen(false)}
						style={{
							cursor: "pointer",
						}}
					>
						<IconCross width="20" height="20" />
					</span>
				</div>
			)}
		</>
	);
}
