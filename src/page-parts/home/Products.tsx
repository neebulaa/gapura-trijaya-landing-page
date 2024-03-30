import { useState, useMemo, useEffect } from "react";
import { NavLink } from "react-router-dom";
import productsData from "../../assets/data/products.json";
import ProductCard from "../../components/ProductCard";

export default function Products() {
	const [products, setProducts] = useState(productsData);
	const [productsPerPage, setProductsPerPage] = useState(4);
	const [currentCategory, setCurrentCategory] = useState("all");
	const [currentSlide, setCurrentSlide] = useState(1);
	const maxSlide = useMemo(() => {
		return Math.ceil(products.length / productsPerPage);
	}, [products]);

	const categories = useMemo(
		() => [
			"all",
			...productsData.reduce<string[]>((acc, curr) => {
				if (!acc.includes(curr.category)) {
					acc.push(curr.category);
				}
				return acc;
			}, []),
		],
		[productsData]
	);

	useEffect(() => {
		setCurrentSlide(1);
		filter();
	}, [currentCategory]);

	function setCategory(category: string) {
		setCurrentCategory(category);
	}

	function setSlide(to: string) {
		if (to == "next" && currentSlide < maxSlide) {
			setCurrentSlide((prev) => prev + 1);
		} else if (to == "previous" && currentSlide > 1) {
			setCurrentSlide((prev) => prev - 1);
		}
	}

	function paginateProducts() {
		const firstIndex = (currentSlide - 1) * productsPerPage;
		const lastIndex = firstIndex + productsPerPage;
		return products.slice(firstIndex, lastIndex);
	}

	function filter() {
		filterByCategory();
	}

	function filterByCategory() {
		setProducts(() => {
			const data =
				currentCategory == "all"
					? productsData
					: productsData.filter(
							(product) => product.category == currentCategory
					  );
			return data;
		});
	}

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
					<NavLink to="/shop">
						Lihat Semua{" "}
						<i className="fa-solid fa-chevron-right"></i>
					</NavLink>
				</button>
			</header>
			<section className="cards-action">
				<div className="filters">
					{categories.map((category, i) => (
						<button
							onClick={() => setCategory(category)}
							key={i}
							className={`btn-link ${
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
						disabled={currentSlide == maxSlide}
					>
						<i className="fa-solid fa-chevron-right"></i>
					</button>
				</div>
			</section>
			<section className="cards-list">
				{paginateProducts().map((product) => (
					<ProductCard key={product.id} {...product} />
				))}
			</section>
		</section>
	);
}
