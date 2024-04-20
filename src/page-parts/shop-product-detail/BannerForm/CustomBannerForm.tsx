import IconMinus from "../../../assets/icons/IconMinus";
import IconBag from "../../../assets/icons/IconBag";
import IconPlus from "../../../assets/icons/IconPlus";

export default function CustomBannerForm() {
	return (
		<form action="">
			<div className="input-box mt-1">
				<label htmlFor="ukuran">Ukuran (L x T)</label>
				<select name="ukuran" id="ukuran">
					<option value="">30 x 50 cm</option>
					<option value="">15 x 25 cm</option>
					<option value="">60 x 100 cm</option>
					<option value="">120 x 200 cm</option>
				</select>
			</div>

			<div className="input-box mt-1">
				<label htmlFor="jenis-bahan">Jenis Bahan</label>
				<select name="jenis-bahan" id="jenis-bahan">
					<option value="">Fabric Polyester</option>
					<option value="">Kanvas</option>
					<option value="">Flexi China</option>
				</select>
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
