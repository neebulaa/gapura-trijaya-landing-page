import { Fragment } from "react";

type PageHeaderNavProps = {
	navigations?: string[];
};

export default function PageHeaderNav({navigations = []}: PageHeaderNavProps) {
	return (
		<header className="fill-container page-header-nav">
			<section className="container">
				{navigations.length > 0 && (
					<p>
						{navigations.map((nav, i) =>
							i == navigations.length - 1 ? (
								<span className="last" key={i}>
									{nav}
								</span>
							) : (
								<Fragment key={i}>
									<span>{nav}</span>
									<i className="fa-solid fa-chevron-right"></i>
								</Fragment>
							)
						)}
					</p>
				)}
			</section>
		</header>
	);
}
