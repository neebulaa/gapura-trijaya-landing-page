import { useEffect, useState } from "react";

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
								<a href="#home">Home</a>
							</li>
							<li>
								<a href="#shop">Shop</a>
							</li>
							<li>
								<a href="#About">About</a>
							</li>
							<li>
								<a href="#contact">Contact</a>
							</li>
						</ul>

						<ul className="nav-action">
							<li>
								<i className="fa-solid fa-magnifying-glass"></i>
							</li>
							<li>
								<i className="fa-regular fa-heart"></i>
							</li>
							<li>
								<i className="fa-solid fa-cart-shopping"></i>
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
