import { Link, useNavigate } from "react-router-dom";
import { formatCurrencyRupiah } from "./../utils/formatCurrency";
import { ProductType } from "../dto/ProductType";
import IconHeart from "../assets/icons/IconHeart";
import { CategoryType } from "../dto/CategoryType";
import IconHeartOutline from "../assets/icons/IconHeartOutline";
import { SyntheticEvent, useState } from "react";
import fetching from "../utils/fetching";
import { useAuth } from "../provider/AuthProvider";
type ProductCardProps = ProductType;

export default function ProductCard(props: ProductCardProps) {
	const { user } = useAuth();
	const navigator = useNavigate();
	const [isFavorite, setIsFavorite] = useState<boolean | number>(
		() => props.is_favourite == true
	);
	const [likeCount, setLikeCount] = useState<number>(() =>
		Number(props.like_count!)
	);
	const primaryCategory: CategoryType =
		props.categories && props.categories.length == 0
			? ({} as CategoryType)
			: props.categories!.find((category) => category.primary) ??
			  ({} as CategoryType);

	async function likeProduct(e: SyntheticEvent) {
		e.preventDefault();

		if (!user || user == null) {
			navigator("/login");
		}

		if (isFavorite) {
			const response = await fetching(
				"delete",
				`favourites/${user.id}/${props.id}`
			);
			if (response.status == 200) {
				setIsFavorite(false);
				setLikeCount((prev) => prev - 1);
			}
		} else {
			const response = await fetching(
				"post",
				`favourites/${user.id}/${props.id}`
			);
			if (response.status == 200) {
				setIsFavorite(true);
				setLikeCount((prev) => prev + 1);
			}
		}
	}

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
							{formatCurrencyRupiah(props.price!)}
						</span>
					</p>
					<div className="mt-1 flex gap-05">
						<div className="accent">
							<IconHeart width="18" height="15" />
						</div>
						disukai oleh {likeCount} orang
					</div>
				</div>
				<div className="card-like" onClick={likeProduct}>
					{isFavorite && <IconHeart width="21" height="18" />}
					{!isFavorite && <IconHeartOutline width="24" height="24" />}
				</div>
			</article>
		</Link>
	);
}
