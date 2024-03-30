export default function About() {
	return (
		<section
			className="container"
			id="about"
			style={{
				marginTop: "2rem",
			}}
		>
			<section className="about-thumb">
				<img
					src="./images/about1.png"
					alt={`${import.meta.env.VITE_APP_NAME} - About`}
				/>
				<img
					src="./images/about2.png"
					alt={`${import.meta.env.VITE_APP_NAME} - About`}
				/>
			</section>

			<section className="about-content">
				<h2>Cetak Cepat, Berkualitas, dan Terjangkau</h2>
				<p>
					Percetakan Online Kami adalah solusi terbaik untuk semua
					kebutuhan cetak Anda. Dengan teknologi cetak terkini, kami
					menjamin hasil cetak berkualitas tinggi dengan harga yang
					terjangkau.
				</p>
			</section>
		</section>
	);
}
