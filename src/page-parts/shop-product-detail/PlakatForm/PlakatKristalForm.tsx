import IconMinus from "../../../assets/icons/IconMinus";
import IconBag from "../../../assets/icons/IconBag";
import IconPlus from "../../../assets/icons/IconPlus";

export default function PlakatKristalForm() {
	return (
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
	);
}
