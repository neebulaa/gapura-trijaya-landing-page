import { Fragment } from "react";
import IconCheckCircle from "../assets/icons/IconCheckCircle";

type HeaderProgress = {
	navigations: string[];
	actives: boolean[];
};

// navigations length === actives lenght
export default function HeaderProgress({
	navigations,
	actives,
}: HeaderProgress) {
	return (
		<header className="header-progress">
			<h4
				className={`icon ${actives[0] ? "header-progress-active" : ""}`}
			>
				{navigations[0]}
			</h4>

			{navigations.map((nav, i) =>
				i == 0 ? (
					""
				) : (
					<Fragment key={i}>
						<div
							className={`line-check ${
								actives[i] ? "header-progress-active" : ""
							}`}
						>
							<div className="icon">
								<IconCheckCircle width="20" height="20" />
							</div>
						</div>
						<h4
							className={`icon ${
								actives[i] ? "header-progress-active" : ""
							}`}
						>
							{nav}
						</h4>
					</Fragment>
				)
			)}
		</header>
	);
}
