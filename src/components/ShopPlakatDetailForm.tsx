import { ProductType } from "../dto/ProductType";
import { formatCurrencyRupiah } from "./../utils/formatCurrency";
import IconQuestionMark from "./../assets/icons/IconQuestionMark";
import IconPlus from "./../assets/icons/IconPlus";
import IconMinus from "./../assets/icons/IconMinus";
import IconBag from "./../assets/icons/IconBag";

type ShopPlakatDetailFormType = {
	product: ProductType;
};

export default function ShopPlakatDetailForm({
	product,
}: ShopPlakatDetailFormType) {
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
						<IconQuestionMark width={"15"} height={"15"} />
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
							<IconMinus width="10" height="2" />
						</div>
						<p>0</p>
						<div>
							<IconPlus width="14" height="14" />
						</div>
					</button>
					<button className="btn uppercase add-to-bag-button">
						<IconBag width="14" height="17" />
						Add to bag
					</button>
				</div>
			</form>
		</section>
	);
}
