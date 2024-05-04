import { Link } from "react-router-dom";
import { formatCurrencyRupiah } from "./../utils/formatCurrency";
import { ProductType } from "../dto/ProductType";
import IconHeart from "../assets/icons/IconHeart";
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
					<p className="mt-1 card-description flex gap-04 items-center">
						Mulai dari
						<span className="product-price">
							{formatCurrencyRupiah(props.price)}
						</span>
					</p>
					<div className="mt-1 flex gap-05">
						<div className="accent">
							<IconHeart width="18" height="15" />
						</div>
						disukai oleh 5 orang
					</div>
				</div>
				<div className="card-like">
					<IconHeart width="21" height="18" />
				</div>
			</article>
		</Link>
	);
}
