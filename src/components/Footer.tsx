export default function Footer() {
	return (
		<section id="footer-container">
			<section
				className="container"
				style={{
					paddingTop: "4rem",
					marginTop: "3rem",
				}}
			>
				<section id="footer">
					<section className="footer-links">
						<ul className="page-links">
							<li>
								<a href="#home">Home</a>
							</li>
							<li>
								<a href="#home">Category</a>
							</li>
							<li>
								<a href="#home">About</a>
							</li>
							<li>
								<a href="#home">Contact</a>
							</li>
						</ul>
						<ul className="social-medias">
							<li>
								<a href="https://www.facebook.com/GrahaDigital/?locale=id_ID">
									<i className="fa-brands fa-facebook"></i>
								</a>
							</li>
							<li>
								<a href="#twitter">
									<i className="fa-brands fa-twitter"></i>
								</a>
							</li>
							<li>
								<a href="#instagram">
									<i className="fa-brands fa-instagram"></i>
								</a>
							</li>
							<li>
								<a href="#youtube">
									<i className="fa-brands fa-youtube"></i>
								</a>
							</li>
						</ul>
					</section>

					<section className="footer-info">
						<h3>Gapura</h3>
						<p className="flex gap-05">
							<i className="fa-solid fa-location-dot"></i> Jl.
							Mitra Perdana No.34, Parit Tokaya, Kec. Pontianak
							Sel., Kota Pontianak, Kalimantan Barat 78115
						</p>
						<p className="flex gap-05">
							<i className="fa-solid fa-phone"></i>0818-0388-7878
						</p>
						<p className="flex gap-05">
							<i className="fa-solid fa-clock"></i> Jam 08:00 -
							17:00
						</p>
					</section>

					<section className="footer-copyright">
						<div className="copyright-text">
							© {new Date().getFullYear()} Gapura Digital
							Indonesia
						</div>
						<ul className="copyright-links">
							<li>
								<a href="#terms-of-service">Terms Of Service</a>
							</li>
							<li>
								<a href="#privacy-policy">Privacy Policy</a>
							</li>
						</ul>
					</section>
				</section>
			</section>
		</section>
	);
}
