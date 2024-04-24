import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import IconSearch from "../assets/icons/IconSearch";
import IconHeart from "../assets/icons/IconHeart";
import IconCart from "../assets/icons/IconCart";
import CartPopup from "./CartPopup";

export default function Navbar() {
	const [openSidebar, setOpenSidebar] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [openCartPopup, setOpenCartPopup] = useState(false);
	const [isMobile, setIsMobile] = useState(() => {
		return window.innerWidth <= 768;
	});

	useEffect(() => {
		function handleScroll() {
			if (window.scrollY > 0) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		}

		function handleResize() {
			setIsMobile(window.innerWidth <= 768);
		}

		window.addEventListener("scroll", handleScroll);
		addEventListener("resize", handleResize);

		return () => {
			removeEventListener("resize", handleResize);
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
									onClick={() => setOpenSidebar(false)}
								>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/shop"
									onClick={() => setOpenSidebar(false)}
								>
									Shop
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/about"
									onClick={() => setOpenSidebar(false)}
								>
									About
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/contact"
									onClick={() => setOpenSidebar(false)}
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
								{!isMobile && (
									<div onClick={() => setOpenCartPopup(true)}>
										<IconCart width={"20"} height={"20"} />
									</div>
								)}

								{openCartPopup && (
									<CartPopup
										close={() => setOpenCartPopup(false)}
									/>
								)}

								{isMobile && (
									<Link
										to="/cart"
										onClick={() => setOpenSidebar(false)}
									>
										<IconCart width={"20"} height={"20"} />
									</Link>
								)}
							</li>
							<li>
								<Link to="/login">
									<button className="btn">Login</button>
								</Link>
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
						className={`burger ${openSidebar ? "open" : ""}`}
						onClick={() => setOpenSidebar((prev) => !prev)}
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
