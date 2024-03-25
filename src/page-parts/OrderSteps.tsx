export default function OrderSteps() {
	return (
		<section
			className="container"
			id="order-steps"
			style={{
				marginTop: "0rem",
			}}
		>
			<header className="section-header">
				<div className="title">
					<h3>Langkah demi Langkah</h3>
					<h2>Cara Pemesanan</h2>
				</div>
			</header>

			<section className="steps">
				<article className="step">
					<h3 className="step-number">1.</h3>
					<div className="step-content">
						<h4>Lakukan Pembayaran</h4>
						<p>Lakukan proses pembayaran dengan QR</p>
					</div>
				</article>
				<article className="step">
					<h3 className="step-number">2.</h3>
					<div className="step-content">
						<h4>Proses Cetak</h4>
						<p>
							Berikan konsep kepada kami untuk di design terlebih
							dahulu
						</p>
					</div>
				</article>
				<article className="step">
					<h3 className="step-number">3.</h3>
					<div className="step-content">
						<h4>Proses Pengecekan</h4>
						<p>
							Design selesai dan dikirim ke customer untuk
							melakukan pengecekan kembali
						</p>
					</div>
				</article>
				<article className="step">
					<h3 className="step-number">4.</h3>
					<div className="step-content">
						<h4>Proses Cetak</h4>
						<p>
							Berikan konsep kepada kami untuk di design terlebih
							dahulu
						</p>
					</div>
				</article>
				<article className="step">
					<h3 className="step-number">5.</h3>
					<div className="step-content">
						<h4>Pesanan Dikirim</h4>
						<p>
							Pesanan dikirim dan Anda akan mendapatkan barang
							pesanan tanpa perlu repot ke percetakan
						</p>
					</div>
				</article>
			</section>
		</section>
	);
}
