import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import IconChevronRight from "../../assets/icons/IconChevronRight";
import IconChevronLeft from "../../assets/icons/IconChevronLeft";
import IconChevronDown from "../../assets/icons/IconChevronDown";
import { ProductType } from "../../dto/ProductType";
// import productsData from "../../assets/data/products.json";


export default function Products() {
	const [products, setProducts] = useState<ProductType[]>([]);
	const [productsPerPage] = useState(4);
	const [currentCategory, setCurrentCategory] = useState("all");
	const [currentSlide, setCurrentSlide] = useState(1);
	const maxSlide = Math.ceil(products.length / productsPerPage);

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
		getProducts();
	}, [currentCategory]);

	async function getProducts() {
		
	}

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

	function paginatedProducts() {
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
				<button className="btn btn-outline">
					<Link to="/shop" className="flex gap-04 items-center">
						Lihat Semua {"   "}
						<IconChevronRight width={"20"} height={"20"} />
					</Link>
				</button>
			</header>
			<section className="cards-action">
				<div className="filters">
					{categories.map((category, i) => (
						<button
							onClick={() => setCategory(category)}
							key={i}
							className={`btn-link flex items-center ${
								category == currentCategory ? "current" : ""
							}`}
						>
							{category}{" "}
							{category == "all" && (
								<IconChevronDown width={"20"} height={"20"} />
							)}
						</button>
					))}
				</div>
				<div className="navigation-buttons">
					<button
						onClick={() => setSlide("previous")}
						className={`${currentSlide == 1 ? "inactive" : ""}`}
						disabled={currentSlide == 1}
					>
						<IconChevronLeft width={"25"} height={"25"} />
					</button>
					<button
						onClick={() => setSlide("next")}
						className={`${
							currentSlide == maxSlide ? "inactive" : ""
						}`}
						disabled={currentSlide == maxSlide}
					>
						<IconChevronRight width={"25"} height={"25"} />
					</button>
				</div>
			</section>
			<section className="cards-list">
				{paginatedProducts().map((product) => (
					<ProductCard key={product.id} {...product} />
				))}
			</section>
		</section>
	);
}
