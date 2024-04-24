import { useState, useEffect, ChangeEvent } from "react";
import { ShopProductFormType } from "../../../dto/ShopProductFormType";

export default function CustomBannerForm({ setData }: ShopProductFormType) {
	const [formData, setFormData] = useState({
		ukuran: "",
		jenisBahan: "",
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

	useEffect(() => {
		setData(formData);
	}, []);
	return (
		<>
			<div className="input-box mt-1">
				<label htmlFor="ukuran">Ukuran (L x T)</label>
				<select
					name="ukuran"
					id="ukuran"
					onChange={handleFormDataChange}
					value={formData.ukuran}
				>
					<option value="">30 x 50 cm</option>
					<option value="">15 x 25 cm</option>
					<option value="">60 x 100 cm</option>
					<option value="">120 x 200 cm</option>
				</select>
			</div>

			<div className="input-box mt-1">
				<label htmlFor="jenisBahan">Jenis Bahan</label>
				<select
					name="jenisBahan"
					id="jenisBahan"
					onChange={handleFormDataChange}
					value={formData.jenisBahan}
				>
					<option value="">Fabric Polyester</option>
					<option value="">Kanvas</option>
					<option value="">Flexi China</option>
				</select>
			</div>

			<div className="input-box mt-1">
				<label htmlFor="keterangan">Keterangan</label>
				<input
					type="text"
					name="keterangan"
					id="keterangan"
					onChange={handleFormDataChange}
					value={formData.keterangan}
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
		</>
	);
}
