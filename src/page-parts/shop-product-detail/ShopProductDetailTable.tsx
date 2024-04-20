import { useState } from "react";

type ShopProductDetailTableProps = {
	category_type: string
}
export default function ShopProductDetailTable({category_type} : ShopProductDetailTableProps) {
	const [page, setPage] = useState("deskripsi");

	return (
		<section className="shop-product-detail-table">
			<div className="table-navigation">
				<button
					className={`${page == "deskripsi" ? "active" : ""}`}
					onClick={() => setPage("deskripsi")}
				>
					Deskripsi
				</button>
				<button
					className={`${page == "detail-tambahan" ? "active" : ""}`}
					onClick={() => setPage("detail-tambahan")}
				>
					Detail Tambahan
				</button>
				<button
					className={`${page == "template" ? "active" : ""}`}
					onClick={() => setPage("template")}
				>
					Template
				</button>
			</div>

			{page == "deskripsi" && (
				<div className="table-content">
					<div className="content-left">
						<h3>Deskripsi Produk</h3>
						<p className="mt-1-05">
							Plakat Akrilik di potong dengan Mesin Laser Terbaik,
							yang menghasilkan potongan yang rapih dan halus
						</p>
						<p className="mt-1-05">
							Plakat Akrilik di cetak dengan Teknologi Print UV
							(print langsung di atas media akrilik) membuat hasil
							print jadi lebih Tajam, Bertextur, Melekat, dan Anti
							Pudar
						</p>
						<p className="mt-1-05">
							Pilih warna box buldru pada field keterangan (Biru,
							Hijau, Kuning, Merah, Hitam)
						</p>
					</div>
					<div className="content-right">
						<h3>Spesifikasi Produk</h3>
						<div className="table-content-split mt-1-05">
							<h5>Harga: </h5>
							<p>Mulai dari Rp. 80.000</p>
						</div>
						<hr className="mt-1" />
						<div className="table-content-split mt-1">
							<h5>Kategori: </h5>
							<p>Plakat</p>
						</div>
						<div className="table-content-split mt-1">
							<h5>Bahan: </h5>
							<p>Akrilik</p>
						</div>

						<div className="table-content-split mt-1">
							<h5>SKU: </h5>
							<p>PLK-001</p>
						</div>
						<hr className="mt-1" />
						<div className="table-content-split mt-1">
							<h5>Ketebalan: </h5>
							<p>5mm / 8mm</p>
						</div>
					</div>
				</div>
			)}

			{page == "detail-tambahan" && (
				<div className="table-content content-full">
					<div className="content-left">
						<h3>Plakat Standar</h3>
						<div className="table-container mt-1-05">
							<table>
								<thead>
									<tr>
										<th></th>
										<th>Ukuran</th>
										<th>
											Ketebalan
											<div className="mt-05">5mm</div>
										</th>
										<th>
											Ketebalan
											<div className="mt-05">8mm</div>
										</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<input
												type="checkbox"
												style={{
													width: "20px",
													height: "20px",
												}}
											/>
										</td>
										<td>15 x 10cm</td>
										<td>Rp. 80.000</td>
										<td>Rp. 95.000</td>
										<td>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="4"
												height="16"
												viewBox="0 0 4 16"
												fill="currentColor"
											>
												<path
													d="M2 4C3.10449 4 4 3.10456 4 2C4 0.895437 3.10449 0 2 0C0.895508 0 0 0.895437 0 2C0 3.10456 0.895508 4 2 4Z"
													fill="#6B6C7E"
												/>
												<path
													d="M4 7.98438C4 9.08894 3.10449 9.98438 2 9.98438C0.895508 9.98438 0 9.08894 0 7.98438C0 6.87981 0.895508 5.98438 2 5.98438C3.10449 5.98438 4 6.87981 4 7.98438Z"
													fill="#6B6C7E"
												/>
												<path
													d="M4 14C4 15.1046 3.10449 16 2 16C0.895508 16 0 15.1046 0 14C0 12.8954 0.895508 12 2 12C3.10449 12 4 12.8954 4 14Z"
													fill="#6B6C7E"
												/>
											</svg>
										</td>
									</tr>
									<tr>
										<td>
											<input
												type="checkbox"
												style={{
													width: "20px",
													height: "20px",
												}}
											/>
										</td>
										<td>15 x 10cm</td>
										<td>Rp. 80.000</td>
										<td>Rp. 95.000</td>
										<td>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="4"
												height="16"
												viewBox="0 0 4 16"
												fill="currentColor"
											>
												<path
													d="M2 4C3.10449 4 4 3.10456 4 2C4 0.895437 3.10449 0 2 0C0.895508 0 0 0.895437 0 2C0 3.10456 0.895508 4 2 4Z"
													fill="#6B6C7E"
												/>
												<path
													d="M4 7.98438C4 9.08894 3.10449 9.98438 2 9.98438C0.895508 9.98438 0 9.08894 0 7.98438C0 6.87981 0.895508 5.98438 2 5.98438C3.10449 5.98438 4 6.87981 4 7.98438Z"
													fill="#6B6C7E"
												/>
												<path
													d="M4 14C4 15.1046 3.10449 16 2 16C0.895508 16 0 15.1046 0 14C0 12.8954 0.895508 12 2 12C3.10449 12 4 12.8954 4 14Z"
													fill="#6B6C7E"
												/>
											</svg>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className="content-right">
						<h3>Plakat Kaki Kotak</h3>
						<div className="table-container mt-1-05">
							<table>
								<thead>
									<tr>
										<th></th>
										<th>Ukuran</th>
										<th>
											Ketebalan
											<div className="mt-05">5mm</div>
										</th>
										<th>
											Ketebalan
											<div className="mt-05">8mm</div>
										</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<input
												type="checkbox"
												style={{
													width: "20px",
													height: "20px",
												}}
											/>
										</td>
										<td>15 x 10cm</td>
										<td>Rp. 80.000</td>
										<td>Rp. 95.000</td>
										<td>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="4"
												height="16"
												viewBox="0 0 4 16"
												fill="currentColor"
											>
												<path
													d="M2 4C3.10449 4 4 3.10456 4 2C4 0.895437 3.10449 0 2 0C0.895508 0 0 0.895437 0 2C0 3.10456 0.895508 4 2 4Z"
													fill="#6B6C7E"
												/>
												<path
													d="M4 7.98438C4 9.08894 3.10449 9.98438 2 9.98438C0.895508 9.98438 0 9.08894 0 7.98438C0 6.87981 0.895508 5.98438 2 5.98438C3.10449 5.98438 4 6.87981 4 7.98438Z"
													fill="#6B6C7E"
												/>
												<path
													d="M4 14C4 15.1046 3.10449 16 2 16C0.895508 16 0 15.1046 0 14C0 12.8954 0.895508 12 2 12C3.10449 12 4 12.8954 4 14Z"
													fill="#6B6C7E"
												/>
											</svg>
										</td>
									</tr>
									<tr>
										<td>
											<input
												type="checkbox"
												style={{
													width: "20px",
													height: "20px",
												}}
											/>
										</td>
										<td>15 x 10cm</td>
										<td>Rp. 80.000</td>
										<td>Rp. 95.000</td>
										<td>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="4"
												height="16"
												viewBox="0 0 4 16"
												fill="currentColor"
											>
												<path
													d="M2 4C3.10449 4 4 3.10456 4 2C4 0.895437 3.10449 0 2 0C0.895508 0 0 0.895437 0 2C0 3.10456 0.895508 4 2 4Z"
													fill="#6B6C7E"
												/>
												<path
													d="M4 7.98438C4 9.08894 3.10449 9.98438 2 9.98438C0.895508 9.98438 0 9.08894 0 7.98438C0 6.87981 0.895508 5.98438 2 5.98438C3.10449 5.98438 4 6.87981 4 7.98438Z"
													fill="#6B6C7E"
												/>
												<path
													d="M4 14C4 15.1046 3.10449 16 2 16C0.895508 16 0 15.1046 0 14C0 12.8954 0.895508 12 2 12C3.10449 12 4 12.8954 4 14Z"
													fill="#6B6C7E"
												/>
											</svg>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}

			{page == "template" && (
				<div className="table-content">
					<div className="content-left">
						<h3>Download Template</h3>
						<button
							className="btn mt-1-05 uppercase"
							style={{ width: "100%" }}
						>
							Download
						</button>
					</div>
					<div className="content-right"></div>
				</div>
			)}
		</section>
	);
}
