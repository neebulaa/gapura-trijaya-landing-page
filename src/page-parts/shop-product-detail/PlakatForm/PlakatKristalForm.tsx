import { useState, useEffect, ChangeEvent } from "react";
import { ShopProductFormType } from "../../../dto/ShopProductFormType";

export default function PlakatKristalForm({ setData }: ShopProductFormType) {
	const [formData, setFormData] = useState({
		ketebalan: "",
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

	useEffect(() => {
		setData(formData);
	}, []);

	return (
		<>
			<div className="input-box">
				<label htmlFor="ketebalan">Ketebalan</label>
				<select
					name="ketebalan"
					id="ketebalan"
					value={formData.ketebalan}
					onChange={handleFormDataChange}
				>
					<option value="">5 mm</option>
					<option value="">10 mm</option>
					<option value="">12 mm</option>
					<option value="">15 mm</option>
				</select>
			</div>

			<div className="input-box mt-1">
				<label htmlFor="ukuran">Ukuran</label>
				<select
					name="ukuran"
					id="ukuran"
					value={formData.ukuran}
					onChange={handleFormDataChange}
				>
					<option value="">15 x 10 cm</option>
					<option value="">15 x 20 cm</option>
					<option value="">15 x 12 cm</option>
					<option value="">12 x 10 cm</option>
					<option value="">5 x 10 cm</option>
				</select>
			</div>

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
		</>
	);
}
