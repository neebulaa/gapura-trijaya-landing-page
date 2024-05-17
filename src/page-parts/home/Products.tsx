import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import productsData from "../../assets/data/products.json";
import ProductCard from "../../components/ProductCard";
import IconChevronRight from "../../assets/icons/IconChevronRight";
import IconChevronLeft from "../../assets/icons/IconChevronLeft";
import IconChevronDown from "../../assets/icons/IconChevronDown";
import { ProductType } from "../../dto/ProductType";
import AppApi from "../../config/AppApi";
import { CategoryType } from "../../dto/CategoryType";
// import productsData from "../../assets/data/products.json";

export default function Products() {
	const [products, setProducts] = useState<ProductType[]>([]);
	const [productsPerPage] = useState(4);
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const [currentCategory, setCurrentCategory] = useState("all");
	const [currentSlide, setCurrentSlide] = useState(1);

	useEffect(() => {
		getProducts();
		getCategories();
	}, []);

	useEffect(() => {
		setCurrentSlide(1);
	}, [currentCategory]);

	async function getProducts() {
		const response = await AppApi.get(`products`);
		const productsData = response.data.data.data;
		setProducts(productsData);
	}

	async function getCategories() {
		const response = await AppApi.get(`categories`);
		const categoriesData = response.data.data.data;
		setCategories(categoriesData);
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

	function filteredProducts() {
		const filterdByCategory = filterProductsByCategory();
		const firstIndex = (currentSlide - 1) * productsPerPage;
		const lastIndex = firstIndex + productsPerPage;
		return filterdByCategory.slice(firstIndex, lastIndex);
	}

	function filterProductsByCategory() {
		return products.filter((product) => {
			const primaryCategory =
				product.categories && product.categories.length == 0
					? ({} as CategoryType)
					: product.categories!.find((category) => category.primary);
			return (
				currentCategory == "all" ||
				primaryCategory!.name == currentCategory
			);
		});
	}

	const maxSlide = Math.max(
		1,
		Math.ceil(filterProductsByCategory().length / productsPerPage)
	);

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
					<button
						onClick={() => setCategory("all")}
						className={`btn-link flex items-center ${
							"all" == currentCategory ? "current" : ""
						}`}
					>
						All
						<IconChevronDown width={"20"} height={"20"} />
					</button>
					{categories.map((category, i) => (
						<button
							onClick={() => setCategory(category.name)}
							key={i}
							className={`btn-link flex items-center ${
								category.name == currentCategory
									? "current"
									: ""
							}`}
						>
							{category.name}{" "}
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
				{filteredProducts().length == 0
					? `Currently no products with category ${currentCategory}`
					: filteredProducts().map((product) => (
							<ProductCard key={product.id} {...product} />
					  ))}
			</section>
		</section>
	);
}
