import IconMinus from "../../../assets/icons/IconMinus";
import IconBag from "../../../assets/icons/IconBag";
import IconPlus from "../../../assets/icons/IconPlus";
import { useState, ChangeEvent, useEffect } from "react";
import { formatCurrencyRupiah } from "./../../../utils/formatCurrency";

export default function StikerVinylForm() {
	const hargaDesain = 20000;
	const jumlahLembarOptions = {
		"non-paket": 6,
		"paket-a": 10,
		"paket-b": 20,
	};

	const hargaPerPcsPaket = {
		"paket-a": 28000,
		"paket-b": 27500,
	};

	const [formData, setFormData] = useState({
		paket: "non-paket",
		jumlahLembar: 0,
		keterangan: "",
		hargaPerPcs: 0,
		hargaDesain: hargaDesain,
		hargaTotal: 0,
	});

	function getHargaPerPcs(jumlahLembar: number) {
		if (formData.paket != "non-paket") {
			return hargaPerPcsPaket[
				formData.paket as keyof typeof hargaPerPcsPaket
			];
		} else {
			switch (true) {
				case jumlahLembar >= 1 && jumlahLembar <= 10:
					return 30000;
				case jumlahLembar > 10 && jumlahLembar <= 30:
					return 28000;
				case jumlahLembar > 30 && jumlahLembar <= 50:
					return 25000;
				case jumlahLembar > 50 && jumlahLembar <= 100:
					return 23000;
				case jumlahLembar > 100 && jumlahLembar <= 500:
					return 20000;
				case jumlahLembar > 500:
					return 17000;
				default:
					return 0;
			}
		}
	}

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
		setFormData((prev) => ({
			...prev,
			jumlahLembar:
				jumlahLembarOptions[
					formData.paket as keyof typeof jumlahLembarOptions
				],
		}));
	}, [formData.paket]);

	useEffect(() => {
		setFormData((prev) => ({
			...prev,
			hargaPerPcs: getHargaPerPcs(prev.jumlahLembar),
			hargaTotal: getHargaPerPcs(prev.jumlahLembar) * prev.jumlahLembar,
		}));
	}, [formData.jumlahLembar]);

	return (
		<form action="">
			<img
				style={{
					width: "100%",
				}}
				src={`${
					import.meta.env.VITE_APP_URL
				}./images/product-supporting-images/stiker-vinyl.png`}
				alt={`${
					import.meta.env.VITE_APP_NAME
				} - Stiker Kromo Spesification`}
			/>

			<div className="input-box mt-1">
				<label htmlFor="paket">Paket</label>
				<select
					name="paket"
					id="paket"
					value={formData.paket}
					onChange={handleFormDataChange}
				>
					<option value="non-paket">Non Paket</option>
					<option value="paket-a">Paket A</option>
					<option value="paket-b">Paket B</option>
				</select>
			</div>

			{formData.paket != "non-paket" && (
				<div className="input-box mt-1">
					<label htmlFor="jumlahLembar">Jumlah Lembar A3</label>
					<input
						type="number"
						name="jumlahLembar"
						id="jumlahLembar"
						value={formData.jumlahLembar}
						disabled={formData.paket != "non-paket"}
						onChange={handleFormDataChange}
					/>
				</div>
			)}

			<div className="input-box mt-1">
				<label htmlFor="hargaPerPcs">Harga per pcs</label>
				<input
					type="text"
					name="hargaPerPcs"
					id="hargaPerPcs"
					value={formatCurrencyRupiah(formData.hargaPerPcs)}
					onChange={handleFormDataChange}
					disabled
				/>
			</div>

			<div className="input-box mt-1">
				<label htmlFor="hargaDesain">Harga Desain</label>
				<input
					type="text"
					name="hargaDesain"
					id="hargaDesain"
					value={formatCurrencyRupiah(formData.hargaDesain)}
					onChange={handleFormDataChange}
					disabled
				/>
			</div>

			<div className="input-box mt-1">
				<label htmlFor="hargaTotal">Harga Total</label>
				<input
					type="text"
					name="hargaTotal"
					id="hargaTotal"
					value={formatCurrencyRupiah(formData.hargaTotal)}
					onChange={handleFormDataChange}
					disabled
				/>
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

			<div className="mt-1-05 quantity-and-add-to-bag-button">
				<button className="btn btn-outline quantity-button no-hover no-pointer">
					<div>
						<IconMinus width="10" height="2" />
					</div>
					<p>{formData.jumlahLembar}</p>
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
