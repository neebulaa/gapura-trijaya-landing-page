type ProductCardProps =  {
    name: string,
    category: string,
    price: string,
    image: string,
};

export default function ProductCard(props: ProductCardProps) {
	return (
		<article className="card">
			<div className="card-thumb">
				<img
					src={props.image}
					alt={`${import.meta.env.VITE_APP_NAME} - ` + props.name}
				/>
			</div>
			<div className="card-content">
				<h3 className="card-title">{props.name}</h3>
				<h4 className="card-info">{props.category}</h4>
				<div className="flex justify-between flex-wrap gap-1">
					<p className="card-description flex gap-04 items-center">
						Mulai dari
						<span className="product-price">{props.price}</span>
					</p>
					<button className="btn card-badge">
						<i className="fa-solid fa-cart-shopping"></i>
					</button>
				</div>
			</div>
		</article>
	);
}
