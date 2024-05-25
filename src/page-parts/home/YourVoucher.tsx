import { useState } from "react";
import IconChevronRight from "../../assets/icons/IconChevronRight";
import vouchersData from "../../assets/data/vouchers.json";
import { Link } from "react-router-dom";
import IconCopy from "./../../assets/icons/IconCopy";

export default function YourVoucher() {
	const [vouchers, setVouchers] = useState(() => vouchersData.slice(0, 3));
	return (
		<section
			className="container"
			id="voucher"
			style={{
				marginTop: "2rem",
			}}
		>
			<header className="section-header">
				<div className="title">
					<h3>Voucher Anda</h3>
					<h2>Voucher</h2>
				</div>
				<button className="btn btn-outline">
					<Link to="/shop" className="flex gap-04 items-center">
						Lihat Semua {"   "}
						<IconChevronRight width={"20"} height={"20"} />
					</Link>
				</button>
			</header>
			<section className="voucher-cards mt-3">
				{vouchers.map((voucher) => (
					<div className="voucher-card" key={voucher.id}>
						<h3>{voucher.name}</h3>
						<h4 className="mt-1">FOR {voucher.for}</h4>

						<div className="voucher-copy mt-1">
							<p>Code: {voucher.code}</p>
							<div className="flex items-center gap-05 semibold">
								<IconCopy width="20" height="22" />
								<p>Copy</p>
							</div>
						</div>
						<ul className="mt-1">
							{voucher.description.map((desc, i) => (
								<li key={i}>{desc}</li>
							))}
						</ul>
					</div>
				))}
			</section>
		</section>
	);
}
