import { CSSProperties, Fragment, useId } from "react";

type PageHeaderProps = {
	title: string;
	navigations: string[];
	style?: CSSProperties;
};
export default function PageHeader({
	title,
	navigations,
	style,
}: PageHeaderProps) {
	return (
		<section
			className="fill-container page-header"
			style={{ height: "335px", ...style }}
		>
			<section className="container">
				<h1>{title}</h1>
				<h2>
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
				</h2>
			</section>
			<img
				src="./images/pattern-left.png"
				alt={`${import.meta.env.VITE_APP_NAME} - Pattern Left `}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					height: "100%",
				}}
			/>
			<img
				src="./images/pattern-right.png"
				alt={`${import.meta.env.VITE_APP_NAME} - Pattern Right `}
				style={{
					position: "absolute",
					top: 0,
					right: 0,
					height: "100%",
				}}
			/>
		</section>
	);
}
