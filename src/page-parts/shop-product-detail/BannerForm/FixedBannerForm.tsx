import IconMinus from "../../../assets/icons/IconMinus";
import IconBag from "../../../assets/icons/IconBag";
import IconPlus from "../../../assets/icons/IconPlus";

export default function FixedBannerForm() {
	return (
		<form action="">
			<div className="input-box">
				<label htmlFor="spesifikasi">Spesifikasi</label>
				<div
					id="spesifikasi"
					style={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<img
						src={`${
							import.meta.env.VITE_APP_URL
						}./images/product-supporting-images/fixed-banner-specification.png`}
						alt={`${
							import.meta.env.VITE_APP_NAME
						} - Fixed Banner - Specification`}
					/>
				</div>
			</div>

			<div className="input-box mt-1">
				<label htmlFor="keterangan">Keterangan</label>
				<input type="text" name="keterangan" id="keterangan" />
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
	);
}
