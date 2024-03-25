import { useState, useMemo } from "react";
import productsData from "../assets/data/products.json";

export default function Products() {
	const [products, setProducts] = useState(productsData);
	const [productsPerPage, setProductsPerPage] = useState(4);
	const [currentCategory, setCurrentCategory] = useState("all");
	const [currentSlide, setCurrentSlide] = useState(1);
	const [maxSlide, setMaxSlide] = useState(() => {
		return Math.ceil(products.length / productsPerPage);
	});

	const productsFiltered = useMemo(() => {
		// filter by category
		const currentProducts =
			currentCategory == "all"
				? products
				: products.filter(
						(product) => product.category == currentCategory
				  );
		setMaxSlide(Math.ceil(currentProducts.length / productsPerPage));
		// filter by slide number
		const firstIndex = (currentSlide - 1) * productsPerPage;
		const lastIndex = firstIndex + productsPerPage;
		return currentProducts.slice(firstIndex, lastIndex);
	}, [currentSlide, currentCategory]);

	function setCategory(category: string) {
		setCurrentSlide(1);
		setCurrentCategory(category);
	}

	function setSlide(to: string) {
		if (to == "next" && currentSlide < maxSlide) {
			setCurrentSlide((prev) => prev + 1);
		} else if (to == "previous" && currentSlide > 1) {
			setCurrentSlide((prev) => prev - 1);
		}
	}

	const categories = [
		"all",
		...products.reduce<string[]>((acc, curr) => {
			if (!acc.includes(curr.category)) {
				acc.push(curr.category);
			}
			return acc;
		}, []),
	];

	return (
		<section
			className="container"
			id="products"
			style={{
				marginTop: "2rem",
			}}
		>
			<header className="section-header">
				<div className="title">
					<h3>Produk Terlaris</h3>
					<h2>Katalog Produk</h2>
				</div>
				<button className="btn btn-outline flex gap-1 items-center">
					Lihat Semua <i className="fa-solid fa-chevron-right"></i>
				</button>
			</header>
			<section className="cards-action">
				<div className="filters">
					{categories.map((category, i) => (
						<button
							onClick={() => setCategory(category)}
							key={i}
							className={`${
								category == currentCategory ? "current" : ""
							}`}
						>
							{category}{" "}
							{category == "all" && (
								<i className="fa-solid fa-caret-down"></i>
							)}
						</button>
					))}
				</div>
				<div className="navigation">
					<button
						onClick={() => setSlide("previous")}
						className={`${currentSlide == 1 ? "inactive" : ""}`}
						disabled={currentSlide == 1}
					>
						<i className="fa-solid fa-chevron-left"></i>
					</button>
					<button
						onClick={() => setSlide("next")}
						className={`${
							currentSlide == maxSlide ? "inactive" : ""
						}`}
						disabled={
							currentSlide ==
							Math.ceil(products.length / productsPerPage)
						}
					>
						<i className="fa-solid fa-chevron-right"></i>
					</button>
				</div>
			</section>
			<section className="cards-list">
				{productsFiltered.map((product) => (
					<article className="card">
						<div className="card-thumb">
							<img
								src={product.image}
								alt={
									`${import.meta.env.VITE_APP_NAME} - ` +
									product.name
								}
							/>
						</div>
						<div className="card-content">
							<h3 className="card-title">{product.name}</h3>
							<h4 className="card-info">{product.category}</h4>
							<div className="flex justify-between flex-wrap gap-1">
								<p className="card-description flex gap-04 items-center">
									Mulai dari
									<span className="product-price">
										{product.price}
									</span>
								</p>
								<button className="btn card-badge">
									<i className="fa-solid fa-cart-shopping"></i>
								</button>
							</div>
						</div>
					</article>
				))}
			</section>
		</section>
	);
}
