// import PatternRight from "../assets/images/pattern-right.png";
// import PatternLeft from "../assets/images/pattern-left.png";
// import ReverseStamp from "../assets/images/reverse-stamp.png";

export default function Benefits() {
	return (
		<section className="fill-container" id="benefits-bg">
			<section className="container" id="benefits">
				<div className="benefit first-benefit">
					<h2>Proses Order Sangat Mudah</h2>
					<p>
						Pilih produk, konfirmasi, pembayaran, barang siap
						dikirim
					</p>
				</div>
				<div className="benefit second-benefit">
					<h2>Pengiriman ke seluruh Indonesia</h2>
					<p>
						Pengiriman ke seluruh daerah indonesia, tanpa terkecuali
					</p>
				</div>
			</section>
			{/* image pattern */}
			<img
				src="./images/pattern-left.png"
				alt={`${import.meta.env.VITE_APP_NAME} - Pattern Left `}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
				}}
			/>
			<img
				src="./images/pattern-left.png"
				alt={`${import.meta.env.VITE_APP_NAME} - Pattern Left `}
				style={{
					position: "absolute",
					top: "225px",
					left: 0,
				}}
			/>
			<img
				src="./images/pattern-left.png"
				alt={`${import.meta.env.VITE_APP_NAME} - Pattern Left `}
				style={{
					position: "absolute",
					top: "450px",
					left: 0,
				}}
			/>
			<img
				src="./images/reverse-stamp.png"
				alt={`${import.meta.env.VITE_APP_NAME} - Reverse Stamp Icon`}
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					translate: "-50% -50%",
				}}
			/>
			<img
				src="./images/pattern-right.png"
				alt={`${import.meta.env.VITE_APP_NAME} - Pattern Right`}
				style={{
					position: "absolute",
					top: 0,
					right: 0,
				}}
			/>
			<img
				src="./images/pattern-right.png"
				alt={`${import.meta.env.VITE_APP_NAME} - Pattern Right`}
				style={{
					position: "absolute",
					top: "225px",
					right: 0,
				}}
			/>
			<img
				src="./images/pattern-right.png"
				alt={`${import.meta.env.VITE_APP_NAME} - Pattern Right`}
				style={{
					position: "absolute",
					top: "450px",
					right: 0,
				}}
			/>
		</section>
	);
}
