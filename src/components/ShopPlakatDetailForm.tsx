import { useState } from "react";
import { ProductType } from "../dto/ProductType";
import { formatCurrencyRupiah } from "./../utils/formatCurrency";

type ShopPlakatDetailFormType = {
	product: ProductType;
};

export default function ShopPlakatDetailForm({
	product,
}: ShopPlakatDetailFormType) {
	// const [ketebalan, setKetebalan] = useState('5 mm');

	return (
		<section className="shop-product-detail-form">
			<h1 className="product-name">{product.name}</h1>
			<h2 className="product-price">
				{formatCurrencyRupiah(product.price)}
			</h2>
			<p className="product-description">
				Plakat akrilik custom dengan ketebalan 5mm/8mm. Dipotong dengan
				mesin laser terbaik, yang menghasilkan potongan yang rapih dan
				halus.
			</p>
			<hr className="mt-1 mb-1" />

			<form action="">
				<div className="input-box">
					<label htmlFor="plakat-ketebalan">Ketebalan</label>
					<select name="plakat-ketebalan" id="plakat-ketebalan">
						<option value="">5 mm</option>
						<option value="">10 mm</option>
						<option value="">12 mm</option>
						<option value="">15 mm</option>
					</select>
				</div>

				<div className="input-box mt-1">
					<label htmlFor="plakat-ukuran">Ukuran</label>
					<select name="plakat-ukuran" id="plakat-ukuran">
						<option value="">15 x 10 cm</option>
						<option value="">15 x 20 cm</option>
						<option value="">15 x 12 cm</option>
						<option value="">12 x 10 cm</option>
						<option value="">5 x 10 cm</option>
					</select>
				</div>

				<div className="input-box mt-1">
					<label htmlFor="plakat-jenis-kaki">Jenis Kaki</label>
					<select name="plakat-jenis-kaki" id="plakat-jenis-kaki">
						<option value="">Kaki kotak</option>
						<option value="">Kaki biasa</option>
					</select>
				</div>

				<div className="input-box mt-1">
					<label htmlFor="plakat-box-buldru">
						Box Plakat Buldru{" "}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
						>
							<path
								opacity="0.2"
								d="M15.75 9C15.75 10.335 15.3541 11.6401 14.6124 12.7501C13.8707 13.8601 12.8165 14.7253 11.5831 15.2362C10.3497 15.7471 8.99252 15.8808 7.68314 15.6203C6.37377 15.3598 5.17104 14.717 4.22703 13.773C3.28303 12.829 2.64015 11.6262 2.3797 10.3169C2.11925 9.00749 2.25292 7.65029 2.76382 6.41689C3.27471 5.18349 4.13987 4.12928 5.2499 3.38758C6.35994 2.64588 7.66498 2.25 9 2.25C10.7902 2.25 12.5071 2.96116 13.773 4.22703C15.0388 5.4929 15.75 7.20979 15.75 9Z"
								fill="#003459"
							/>
							<path
								d="M9.84375 12.6562C9.84375 12.8231 9.79427 12.9863 9.70156 13.125C9.60884 13.2638 9.47707 13.3719 9.32289 13.4358C9.16872 13.4996 8.99907 13.5163 8.8354 13.4838C8.67172 13.4512 8.52138 13.3709 8.40338 13.2529C8.28538 13.1349 8.20502 12.9845 8.17247 12.8209C8.13991 12.6572 8.15662 12.4875 8.22048 12.3334C8.28434 12.1792 8.39249 12.0474 8.53124 11.9547C8.66999 11.862 8.83313 11.8125 9 11.8125C9.22378 11.8125 9.43839 11.9014 9.59662 12.0596C9.75486 12.2179 9.84375 12.4325 9.84375 12.6562ZM9 5.0625C7.44891 5.0625 6.1875 6.19805 6.1875 7.59375V7.875C6.1875 8.02418 6.24677 8.16726 6.35226 8.27275C6.45775 8.37824 6.60082 8.4375 6.75 8.4375C6.89919 8.4375 7.04226 8.37824 7.14775 8.27275C7.25324 8.16726 7.3125 8.02418 7.3125 7.875V7.59375C7.3125 6.82031 8.06977 6.1875 9 6.1875C9.93024 6.1875 10.6875 6.82031 10.6875 7.59375C10.6875 8.36719 9.93024 9 9 9C8.85082 9 8.70775 9.05926 8.60226 9.16475C8.49677 9.27024 8.4375 9.41332 8.4375 9.5625V10.125C8.4375 10.2742 8.49677 10.4173 8.60226 10.5227C8.70775 10.6282 8.85082 10.6875 9 10.6875C9.14919 10.6875 9.29226 10.6282 9.39775 10.5227C9.50324 10.4173 9.5625 10.2742 9.5625 10.125V10.0744C10.845 9.83883 11.8125 8.81578 11.8125 7.59375C11.8125 6.19805 10.5511 5.0625 9 5.0625ZM16.3125 9C16.3125 10.4463 15.8836 11.8601 15.0801 13.0626C14.2766 14.2651 13.1346 15.2024 11.7984 15.7559C10.4622 16.3093 8.99189 16.4541 7.57341 16.172C6.15492 15.8898 4.85196 15.1934 3.82928 14.1707C2.80661 13.148 2.11017 11.8451 1.82801 10.4266C1.54586 9.00811 1.69067 7.53781 2.24413 6.20163C2.7976 4.86544 3.73486 3.72339 4.9374 2.91988C6.13993 2.11637 7.55373 1.6875 9 1.6875C10.9388 1.68955 12.7975 2.46063 14.1685 3.83154C15.5394 5.20246 16.3105 7.06123 16.3125 9ZM15.1875 9C15.1875 7.77623 14.8246 6.57994 14.1447 5.56241C13.4648 4.54488 12.4985 3.75181 11.3679 3.2835C10.2372 2.81518 8.99314 2.69264 7.79288 2.93139C6.59262 3.17014 5.49012 3.75944 4.62478 4.62478C3.75944 5.49011 3.17014 6.59262 2.93139 7.79288C2.69265 8.99314 2.81518 10.2372 3.2835 11.3679C3.75182 12.4985 4.54488 13.4648 5.56241 14.1447C6.57994 14.8246 7.77623 15.1875 9 15.1875C10.6405 15.1856 12.2132 14.5331 13.3732 13.3732C14.5331 12.2132 15.1856 10.6405 15.1875 9Z"
								fill="#003459"
							/>
						</svg>
					</label>
					<select name="plakat-box-buldru" id="plakat-box-buldru">
						<option value="">Kaki kotak</option>
						<option value="">Kaki biasa</option>
					</select>
				</div>

				<div className="input-box mt-1">
					<label htmlFor="plakat-keterangan">Keterangan</label>
					<input
						type="text"
						name="plakat-keterangan"
						id="plakat-keterangan"
					/>
				</div>

				<div className="input-box mt-1">
					<label>
						Referensi <span className="italic">(Opsional)</span>
					</label>
					<label
						className="btn btn-outline uppercase"
						htmlFor="upload-file"
					>
						Upload File
					</label>
					<input className="none" type="file" id="upload-file" />
				</div>

				<div className="mt-1-05 quantity-and-add-to-bag-button">
					<button className="btn btn-outline quantity-button no-hover no-pointer">
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="10"
								height="2"
								viewBox="0 0 10 2"
								fill="currentColor"
							>
								<path d="M0 2V0H10V2H0Z" />
							</svg>
						</div>
						<p>0</p>
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								viewBox="0 0 14 14"
								fill="currentColor"
							>
								<path d="M6 14V8H0V6H6V0H8V6H14V8H8V14H6Z" />
							</svg>
						</div>
					</button>
					<button className="btn uppercase add-to-bag-button">
						{" "}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="17"
							viewBox="0 0 14 17"
							fill="currentColor"
						>
							<path d="M1.75 16.5C1.3375 16.5 0.98425 16.3533 0.69025 16.0597C0.39675 15.7657 0.25 15.4125 0.25 15V6C0.25 5.5875 0.39675 5.2345 0.69025 4.941C0.98425 4.647 1.3375 4.5 1.75 4.5H3.25C3.25 3.4625 3.61575 2.578 4.34725 1.8465C5.07825 1.1155 5.9625 0.75 7 0.75C8.0375 0.75 8.922 1.1155 9.6535 1.8465C10.3845 2.578 10.75 3.4625 10.75 4.5H12.25C12.6625 4.5 13.0157 4.647 13.3097 4.941C13.6033 5.2345 13.75 5.5875 13.75 6V15C13.75 15.4125 13.6033 15.7657 13.3097 16.0597C13.0157 16.3533 12.6625 16.5 12.25 16.5H1.75ZM1.75 15H12.25V6H1.75V15ZM7 10.5C8.0375 10.5 8.922 10.1342 9.6535 9.40275C10.3845 8.67175 10.75 7.7875 10.75 6.75H9.25C9.25 7.375 9.03125 7.90625 8.59375 8.34375C8.15625 8.78125 7.625 9 7 9C6.375 9 5.84375 8.78125 5.40625 8.34375C4.96875 7.90625 4.75 7.375 4.75 6.75H3.25C3.25 7.7875 3.61575 8.67175 4.34725 9.40275C5.07825 10.1342 5.9625 10.5 7 10.5ZM4.75 4.5H9.25C9.25 3.875 9.03125 3.34375 8.59375 2.90625C8.15625 2.46875 7.625 2.25 7 2.25C6.375 2.25 5.84375 2.46875 5.40625 2.90625C4.96875 3.34375 4.75 3.875 4.75 4.5Z" />
						</svg>
						Add to bag
					</button>
				</div>
			</form>
		</section>
	);
}
