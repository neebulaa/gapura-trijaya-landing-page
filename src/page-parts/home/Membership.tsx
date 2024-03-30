export default function Membership() {
	return (
		<section
			className="container"
			style={{
				marginTop: "2rem",
			}}
		>
			<section id="membership">
				<section className="membership-content">
					<h2>Dapatkan Poin</h2>
					<h3>Dengan Join Membership</h3>
					<p>
						Ingin mendapatkan lebih banyak nilai dari setiap
						pembelian Anda? Bergabunglah dengan program membership
						kami dan mulailah mengumpulkan poin hari ini!
					</p>
					<button className="btn flex gap-1 items-center">
						Gabung Sekarang
						<i className="fa-solid fa-chevron-right"></i>
					</button>
				</section>

				<img
					src="./images/membership.png"
					alt="membership"
					className="membership-thumb"
				/>
			</section>
		</section>
	);
}
