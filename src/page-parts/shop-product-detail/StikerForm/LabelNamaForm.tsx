import IconMinus from "../../../assets/icons/IconMinus";
import IconBag from "../../../assets/icons/IconBag";
import IconPlus from "../../../assets/icons/IconPlus";
import { ChangeEvent, useState } from "react";

export default function LabelNamaForm() {
	const [formData, setFormData] = useState({
		bahanStiker: "",
		bentukStiker: "persegi panjang",
		ukuran: "",
		keterangan: "",
	});

	function handleFormDataChange(
		e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
	) {
		const key = e.target.id;
		setFormData((prev) => ({
			...prev,
			[key]: e.target.value,
		}));
	}

	return (
		<form action="">
			<img
				style={{
					width: "100%",
				}}
				src={`${
					import.meta.env.VITE_APP_URL
				}./images/product-supporting-images/label-nama.png`}
				alt={`${
					import.meta.env.VITE_APP_NAME
				} - Label Nama Spesification`}
			/>

			<div className="input-box mt-1">
				<label htmlFor="bahanStiker">Bahan Stiker</label>
				<select
					name="bahanStiker"
					id="bahanStiker"
					onChange={handleFormDataChange}
				>
					<option value="">Vinyl Glossy</option>
					<option value="">Glossy</option>
					<option value="">Matte</option>
				</select>
			</div>

			<div className="input-box mt-1">
				<label htmlFor="bentukStiker">Bentuk Stiker</label>
				<select
					name="bentukStiker"
					id="bentukStiker"
					value={formData.bentukStiker}
					onChange={handleFormDataChange}
				>
					<option value="persegi panjang">Persegi Panjang</option>
					<option value="persegi">Persegi</option>
					<option value="lingkaran">Lingkaran</option>
					<option value="oval">Oval</option>
				</select>
			</div>

			{/* untuk persegi dan persegi panjang */}
			{(formData.bentukStiker === "persegi panjang" ||
				formData.bentukStiker === "persegi") && (
				<div className="input-box mt-1">
					<label htmlFor="ukuran">Ukuran (P x L)</label>
					<select
						name="ukuran"
						id="ukuran"
						value={formData.ukuran}
						onChange={handleFormDataChange}
					>
						<option value="">4 x 6 cm</option>
						<option value="">7 x 8 cm</option>
						<option value="">4 x 3 cm</option>
					</select>
				</div>
			)}

			{/* untuk oval */}
			{formData.bentukStiker == "oval" && (
				<div className="input-box mt-1">
					<label htmlFor="ukuran">Ukuran (L x T)</label>
					<select
						name="ukuran"
						id="ukuran"
						value={formData.ukuran}
						onChange={handleFormDataChange}
					>
						<option value="">4 x 6 cm</option>
						<option value="">7 x 8 cm</option>
						<option value="">4 x 3 cm</option>
					</select>
				</div>
			)}

			{/* untuk linkgkaran */}
			{formData.bentukStiker === "lingkaran" && (
				<div className="input-box mt-1">
					<label htmlFor="ukuran">Diameter</label>
					<select
						name="ukuran"
						id="ukuran"
						value={formData.ukuran}
						onChange={handleFormDataChange}
					>
						<option value="">1 cm</option>
						<option value="">2 cm</option>
						<option value="">3 cm</option>
						<option value="">4 cm</option>
						<option value="">5 cm</option>
						<option value="">6 cm</option>
						<option value="">7 cm</option>
						<option value="">8 cm</option>
					</select>
				</div>
			)}

			<div className="input-box mt-1">
				<label htmlFor="keterangan">Keterangan</label>
				<input
					type="text"
					name="keterangan"
					id="keterangan"
					value={formData.keterangan}
					onChange={handleFormDataChange}
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
