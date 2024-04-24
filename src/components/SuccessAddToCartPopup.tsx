import { ProductType } from "../dto/ProductType";
import { Link } from "react-router-dom";
import { formatCurrencyRupiah } from "../utils/formatCurrency";

type SuccessAddToCartPopupProps = {
	product: ProductType;
	close: Function;
	quantity: number;
};
export default function SuccessAddToCartPopup({
	product,
	close,
	quantity,
}: SuccessAddToCartPopupProps) {
	return (
		<section
			className="popup-cart"
			onClick={(e) => {
				if (e.target == e.currentTarget) {
					close();
				}
			}}
		>
			<div className="popup-cart-content">
				<h2>Berhasil Ditambahkan</h2>
				<hr className="mt-1-05 mb-1" />
				<div className="popup-cart-product">
					<img
						src={`${import.meta.env.VITE_APP_URL}${product.image}`}
						alt={
							`${import.meta.env.VITE_APP_NAME} - ` + product.name
						}
					/>
					<div className="popup-cart-product-desc w-100">
						<div className="popup-cart-product-title">
							<h3>{product.name}</h3>
							<p>{quantity} items</p>
						</div>
						<p className="popup-cart-product-price">
							{formatCurrencyRupiah(product.price * quantity)}
						</p>
					</div>
				</div>
				<hr className="mt-1-05 mb-1" />
				<Link to="/cart">
					<button className="btn w-100" type="button">Show Shopping Cart</button>
				</Link>
				<button
					className="btn btn-tertiary w-100 mt-05"
					type="button"
					onClick={() => close()}
				>
					Back To Shopping
				</button>
			</div>
		</section>
	);
}
