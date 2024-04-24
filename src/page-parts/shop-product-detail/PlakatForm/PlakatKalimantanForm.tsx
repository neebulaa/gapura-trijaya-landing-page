import { useState, useEffect, ChangeEvent } from "react";
import { ShopProductFormType } from "../../../dto/ShopProductFormType";

export default function PlakatKalimantanForm({ setData }: ShopProductFormType) {
	const [formData, setFormData] = useState({
		jenisPlakat: "",
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
				<label htmlFor="jenisPlakat">Jenis Plakat</label>
				<select
					name="jenisPlakat"
					id="jenisPlakat"
					value={formData.jenisPlakat}
					onChange={handleFormDataChange}
				>
					<option value="">5 mm</option>
					<option value="">10 mm</option>
					<option value="">12 mm</option>
					<option value="">15 mm</option>
				</select>
			</div>

			<div className="input-box mt-1">
				<label htmlFor="spesifikasi">Spesifikasi</label>
				<ul
					id="spesifikasi"
					className="list"
					style={{
						listStyle: "disc",
						border: "1px solid #DDDDDD",
						background: "#F8F8F8",
						outline: "none",
						borderRadius: "5px",
						padding: "0.8rem",
					}}
				>
					<div
						style={{
							marginLeft: "40px",
							display: "flex",
							flexDirection: "column",
							gap: ".25rem",
						}}
					>
						<li>Akrilik Bening 8mm Print ( lapisan pertama )</li>
						<li>Akrilik Mirror Gold ( lapisan kedua )</li>
						<li>Kaki Standar</li>
						<li> Ukuran 21 x 15 cm</li>
					</div>
				</ul>
			</div>

			<div className="input-box mt-1">
				<label htmlFor="keterangan">Keterangan</label>
				<input
					value={formData.keterangan}
					onChange={handleFormDataChange}
					type="text"
					name="keterangan"
					id="keterangan"
				/>
			</div>
		</>
	);
}
