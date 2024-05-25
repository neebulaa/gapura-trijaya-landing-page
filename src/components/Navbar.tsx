import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import IconSearch from "../assets/icons/IconSearch";
import IconHeartOutline from "../assets/icons/IconHeartOutline";
import IconCart from "../assets/icons/IconCart";
import CartPopup from "./CartPopup";
import IconChevronDown from "../assets/icons/IconChevronDown";
import { useAuth } from "../provider/AuthProvider";

export default function Navbar() {
	const { user } = useAuth();
	const [openSidebar, setOpenSidebar] = useState(false);
	const [openNavProfileDropdown, setOpenNavProfileDropdown] = useState(false);
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
					<img
						src={`${import.meta.env.VITE_APP_URL}./images/logo.png`}
						alt={`${import.meta.env.VITE_APP_NAME} - logo`}
					/>
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
							{user && (
								<li>
									<NavLink
										to="my-poin"
										onClick={() => setOpenSidebar(false)}
									>
										My poin
									</NavLink>
								</li>
							)}
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
								<IconHeartOutline width={"20"} height={"20"} />
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
								{user && <p>User: {user.name}</p>}
								{!user && (
									<Link
										to="/login"
										onClick={() => setOpenSidebar(false)}
									>
										<button className="btn">Login</button>
									</Link>
								)}
							</li>
							<li
								className="nav-profile"
								onClick={() =>
									setOpenNavProfileDropdown((prev) => !prev)
								}
							>
								<img
									src={`${
										import.meta.env.VITE_APP_URL
									}./images/people/people1.png`}
									alt={`${
										import.meta.env.VITE_APP_NAME
									} - people 1`}
								/>
								<p>Edwin Hendly</p>
								<IconChevronDown width="20" height="20" />

								{openNavProfileDropdown && (
									<div
										className="nav-profile-dropdown"
										style={{
											top: isMobile ? "-500%" : "120%",
											left: "0",
										}}
									>
										<Link to="/profile">Profile</Link>
										<a href="">Dashboard</a>{" "}
										{/* for admin */}
										<a href="">Logout</a>
									</div>
								)}
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
