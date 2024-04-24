import { useState, useEffect, ChangeEvent } from "react";
import { ShopProductFormType } from "../../../dto/ShopProductFormType";

export default function ThankyouCardForm({ setData }: ShopProductFormType) {
	const [formData, setFormData] = useState({
		ukuran: "",
		bahan: "",
		jumlahSisi: "",
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
			<img
				style={{
					width: "100%",
				}}
				src={`${
					import.meta.env.VITE_APP_URL
				}./images/product-supporting-images/thankyou-card.png`}
				alt={`${
					import.meta.env.VITE_APP_NAME
				} - Thankyou Card Spesification`}
			/>

			<div className="input-box mt-1">
				<label htmlFor="ukuran">Ukuran (P x L)</label>
				<select
					name="ukuran"
					id="ukuran"
					value={formData.ukuran}
					onChange={handleFormDataChange}
				>
					<option value="">15 x 9.5 cm</option>
					<option value="">11 x 9.5 cm</option>
					<option value="">10 x 7 cm</option>
					<option value="">9 x 8 cm</option>
				</select>
			</div>

			<div className="input-box mt-1">
				<label htmlFor="bahan">Bahan</label>
				<select
					name="bahan"
					id="bahan"
					value={formData.bahan}
					onChange={handleFormDataChange}
				>
					<option value="">Reguler</option>
					<option value="">Premium</option>
				</select>
			</div>

			<div className="input-box mt-1">
				<label htmlFor="jumlahSisi">Jumlah Sisi</label>
				<select
					name="jumlahSisi"
					id="jumlahSisi"
					value={formData.jumlahSisi}
					onChange={handleFormDataChange}
				>
					<option value="">1 Sisi</option>
					<option value="">2 Sisi</option>
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
