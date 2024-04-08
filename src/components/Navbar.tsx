import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import IconSearch from "../assets/icons/IconSearch";
import IconHeart from "../assets/icons/IconHeart";
import IconCart from "../assets/icons/IconCart";

export default function Navbar() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		function handleScroll() {
			if (window.scrollY > 0) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		}

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<section
			id="navbar-container"
			className={`${scrolled ? "scrolled" : ""}`}
		>
			<section
				className="container"
				style={{
					paddingBlock: 0,
				}}
			>
				<nav className="navbar">
					<h2 className="nav-logo">
						{import.meta.env.VITE_APP_NAME}
					</h2>
					<div className="nav-info">
						<ul className="nav-links">
							<li>
								<NavLink
									to="/"
									onClick={() => setSidebarOpen(false)}
								>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/shop"
									onClick={() => setSidebarOpen(false)}
								>
									Shop
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/about"
									onClick={() => setSidebarOpen(false)}
								>
									About
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/contact"
									onClick={() => setSidebarOpen(false)}
								>
									Contact
								</NavLink>
							</li>
						</ul>

						<ul className="nav-action">
							<li>
								<IconSearch width={"20"} height={"20"} />
							</li>
							<li>
								<IconHeart width={"20"} height={"20"} />
							</li>
							<li>
								<IconCart width={'20'} height={'20'}/>
							</li>
							<li>
								<button className="btn">Login</button>
							</li>
							<li className="flag-selection">
								<div className="flag">
									<div className="red"></div>
									<div className="white"></div>
								</div>
								<select id="country">
									<option value="IDN">IDN</option>
									<option value="EN">EN</option>
								</select>
							</li>
						</ul>
					</div>

					<div
						className={`burger ${sidebarOpen ? "open" : ""}`}
						onClick={() => setSidebarOpen((prev) => !prev)}
					>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</nav>
			</section>
		</section>
	);
}
