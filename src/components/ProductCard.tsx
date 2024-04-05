import { Link } from "react-router-dom";
import { formatCurrencyRupiah } from "./../utils/formatCurrency";
import { ProductType } from "../dto/ProductType";
type ProductCardProps = ProductType;

export default function ProductCard(props: ProductCardProps) {
	return (
		<Link
			to={`/shop/${props.category}/${props.category_type}/${props.slug}`}
			className="card-as-link"
		>
			<article className="card">
				<div className="card-thumb">
					<img
						src={`${import.meta.env.VITE_APP_URL}${props.image}`}
						alt={`${import.meta.env.VITE_APP_NAME} - ` + props.name}
					/>
				</div>
				<div className="card-content">
					<h3 className="card-title">{props.name}</h3>
					<h4 className="card-highlighter">{props.category}</h4>
					<div className="card-info flex justify-between flex-wrap gap-1">
						<p className="card-description flex gap-04 items-center">
							Mulai dari
							<span className="product-price">
								{formatCurrencyRupiah(props.price)}
							</span>
						</p>
						<button className="btn card-badge">
							<i className="fa-solid fa-cart-shopping"></i>
						</button>
					</div>
				</div>
			</article>
		</Link>
	);
}
