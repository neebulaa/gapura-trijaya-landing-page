import { ReactNode } from "react";
import IconCross from "../assets/icons/IconCross";

type AppModalProps = {
	children: ReactNode;
	title: string;
	close: Function;
};

export default function AppModal({ children, title, close }: AppModalProps) {
	return (
		<div
			className="modal-bg"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					close();
				}
			}}
		>
			<div className="modal">
				<header className="modal-header">
					<h2>{title}</h2>
					<div className="modal-close" onClick={() => close()}>
						<IconCross width="25" height="25" />
					</div>
				</header>
				<hr className="mt-1-05 mb-1" />
				{children}
			</div>
		</div>
	);
}
