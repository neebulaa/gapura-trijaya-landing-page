import IconLocation from "./../../assets/icons/IconLocation";
import { useState } from "react";
export default function CheckoutDelivery() {
	const [openMap, setOpenMap] = useState(false);
	return (
		<section className="checkout-content-body" id="checkout-delivery">
			<h2 className="mb-1-05">Shipping Method</h2>
			<label
				htmlFor="shippingMethod-delivery"
				className="card-bordered flex items-center justify-between pointer"
			>
				<div className="flex gap-1 items-center">
					<input
						checked={true}
						type="radio"
						id="shippingMethod-delivery"
						name="shippingMethod"
					/>
					<span>Delivery</span>
				</div>
				<p className="highlight semibold">Free</p>
			</label>
			<label
				htmlFor="shippingMethod-inStorePickup"
				className="mt-05 card-bordered flex items-center justify-between pointer"
			>
				<div className="flex gap-1 items-center">
					<input
						type="radio"
						id="shippingMethod-inStorePickup"
						name="shippingMethod"
					/>
					<span>In-store pickup</span>
				</div>
				<p className="highlight semibold">Free</p>
			</label>
			<div className="flex mt-3 mb-1-05 justify-between items-center">
				<h2>Delivery Address</h2>
				<button className="highlight semibold">+ New Address</button>
			</div>
			<div className="card-bordered mt-1">
				<div className="flex gap-05">
					<div className="highlight">
						<IconLocation width="20" height="20" />
					</div>
					<p className="semibold">Rumah Michelle</p>
				</div>
				<p className="mt-05">
					Sungai Jawi, Kec. Pontianak Kota, Kota Pontianak, Kalimantan
					Barat , Pontianak Kota, Kota Pontianak, Kalimantan Barat,
					628983167799
				</p>
				<button
					className="btn btn-actor mt-1"
					onClick={() => setOpenMap((prev) => !prev)}
				>
					Change Address
				</button>

				{openMap && <>
                    <div style={{ 
                        borderRadius: '5px',
                        marginTop: '1rem',
                        width: '100%',
                        height: '200px',
                        background: 'var(--light-gray)'
                     }}></div>
                </>}
			</div>
		</section>
	);
}
