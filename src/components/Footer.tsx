import IconYoutube from "./../assets/icons/IconYoutube";
import IconInstagram from "./../assets/icons/IconInstagram";
import IconTwitter from "../assets/icons/IconTwitter";
import IconFacebook from "../assets/icons/IconFacebook";
import IconLocation from "../assets/icons/IconLocation";
import IconPhone from "../assets/icons/IconPhone";
import IconTime from "../assets/icons/IconTime";
import IconWhatsapp from "./../assets/icons/IconWhatsapp";
import IconMaidotru from "../assets/icons/IconMaildotru";
export default function Footer() {
	return (
		<section id="footer-container">
			<section
				className="container"
				style={{
					paddingTop: "4rem",
					marginTop: "2rem",
				}}
			>
				<section id="footer">
					<section className="footer-links">
						<ul className="page-links">
							<li>
								<a href="#home">Home</a>
							</li>
							<li>
								<a href="#home">Shop</a>
							</li>
							<li>
								<a href="#home">My poin</a>
							</li>
							<li>
								<a href="#home">Contact</a>
							</li>
						</ul>
						<ul className="social-medias">
							{/* <li>
								<a href="https://www.facebook.com/GrahaDigital/?locale=id_ID">
									<IconFacebook width="20" height="20" />
								</a>
							</li>
							<li>
								<a href="#twitter">
									<IconTwitter width="20" height="20" />
								</a>
							</li> */}
							<li>
								<a href="#instagram">
									<IconInstagram width="20" height="20" />
								</a>
							</li>
							{/* <li>
								<a href="#youtube">
									<IconYoutube width="24" height="24" />
								</a>
							</li> */}
							<li>
								<a href="#maildotru">
									<IconMaidotru width="20" height="20" />
								</a>
							</li>
							<li>
								<a href="#whatsapp">
									<IconWhatsapp width="20" height="20" />
								</a>
							</li>
						</ul>
					</section>

					<section className="footer-info">
						<div className="footer-info-left">
							{/* <h3>Gapura</h3> */}
							<img
								src={`${
									import.meta.env.VITE_APP_URL
								}./images/logo-horizontal.png`}
								alt={`${
									import.meta.env.VITE_APP_NAME
								} - logo horizontal`}
								style={{
									width: "136px",
									height: "36px",
									objectFit: "contain",
								}}
							/>
							<p className="flex gap-05">
								{/* <IconLocation width="20" height="20" />  */}
								Jl. Jl. Sumatera Gg. Sederhana, Akcaya, Kec.
								Pontianak Sel., Kota Pontianak, Kalimantan Barat
								78121
							</p>
							{/* <p className="flex gap-05">
							<IconPhone width="18" height="18" /> 0818-0388-7878
						</p>
						<p className="flex gap-05">
							<IconTime width="16" height="16" /> Jam 08:00 -
							17:00
						</p> */}
						</div>
						<div className="footer-info-right">
							<h4 className="bold">Jam Layanan</h4>
							<div className="content-split mt-1-05">
								<h5>Senin - Jumat: </h5>
								<p>08:00 - 17:00</p>
							</div>
							<div className="content-split mt-05">
								<h5>Minggu & Libur Nasional: </h5>
								<p>Libur</p>
							</div>
						</div>
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
