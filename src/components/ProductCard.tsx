import { Link } from "react-router-dom";
import { formatCurrencyRupiah } from "./../utils/formatCurrency";
import { ProductType } from "../dto/ProductType";
import IconHeart from "../assets/icons/IconHeart";
import { CategoryType } from "../dto/CategoryType";
import IconHeartOutline from "../assets/icons/IconHeartOutline";
type ProductCardProps = ProductType;

export default function ProductCard(props: ProductCardProps) {
	const primaryCategory: CategoryType =
		props.categories && props.categories.length == 0
			? ({} as CategoryType)
			: props.categories!.find((category) => category.primary) ??
			  ({} as CategoryType);

	return (
		<Link
			to={`/shop/${primaryCategory.slug}/${props.slug}`}
			className="card-as-link"
		>
			<article className="card">
				<div className="card-thumb">
					<img
						src={`${
							props.images &&
							props.images.length &&
							props.images[0].path
						}`}
						alt={`${import.meta.env.VITE_APP_NAME} - ` + props.name}
					/>
				</div>
				<div className="card-content">
					<h3 className="card-title">{props.name}</h3>
					<h4 className="card-highlighter">{primaryCategory.name}</h4>
					<p className="mt-1 card-description flex gap-04 items-center">
						Mulai dari
						<span className="product-price">
							{formatCurrencyRupiah(Number(props.price))}
						</span>
					</p>
					<div className="mt-1 flex gap-05">
						<div className="accent">
							<IconHeart width="18" height="15" />
						</div>
						disukai oleh {props.like_count} orang
					</div>
				</div>
				<div className="card-like">
					{props.is_favourite == true && (
						<IconHeart width="21" height="18" />
					)}
					{!props.is_favourite && (
						<IconHeartOutline width="24" height="24" />
					)}
				</div>
			</article>
		</Link>
	);
}
