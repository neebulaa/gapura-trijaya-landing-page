import { useState, useEffect, ChangeEvent } from "react";
import { ShopProductFormType } from "../../../dto/ShopProductFormType";

export default function FixedBannerForm({ setData }: ShopProductFormType) {
	const [formData, setFormData] = useState({
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
