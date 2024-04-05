import { CSSProperties, Fragment, ReactNode } from "react";

type PageHeaderProps = {
	title: string;
	navigations?: string[];
	style?: CSSProperties;
	children?: ReactNode;
};
export default function PageHeader({
	title,
	navigations = [],
	style,
	children,
}: PageHeaderProps) {
	return (
		<section
			className="fill-container page-header"
			style={{ height: "335px", ...style }}
		>
			<section className="container">
				<h1>{title}</h1>
				{navigations.length > 0 && (
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
				)}
				{children}
			</section>
			<img
				src={`${import.meta.env.VITE_APP_URL}/images/pattern-left.png`}
				alt={`${import.meta.env.VITE_APP_NAME} - Pattern Left `}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					height: "100%",
				}}
			/>
			<img
				src={`${import.meta.env.VITE_APP_URL}/images/pattern-right.png`}
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
