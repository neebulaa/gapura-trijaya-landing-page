import IconMinus from "../../../assets/icons/IconMinus";
import IconBag from "../../../assets/icons/IconBag";
import IconPlus from "../../../assets/icons/IconPlus";

export default function PlakatKalimantanForm() {
	return (
		<form action="">
			<div className="input-box">
				<label htmlFor="jenis-plakat">Jenis Plakat</label>
				<select name="jenis-plakat" id="jenis-plakat">
					<option value="">5 mm</option>
					<option value="">10 mm</option>
					<option value="">12 mm</option>
					<option value="">15 mm</option>
				</select>
			</div>

			<div className="input-box mt-1">
				<label htmlFor="spesifikasi">Spesifikasi</label>
				<ul 
					id='spesifikasi'
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
				<label htmlFor="plakat-keterangan">Keterangan</label>
				<input
					type="text"
					name="plakat-keterangan"
					id="plakat-keterangan"
				/>
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
