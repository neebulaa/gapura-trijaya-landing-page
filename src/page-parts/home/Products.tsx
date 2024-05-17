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
import { APIHeaderParamsType } from "../../dto/APIHeaderParamsType";
// import productsData from "../../assets/data/products.json";

export default function Products() {
	const [products, setProducts] = useState<ProductType[]>([]);
	const [productsPerPage] = useState(4);
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const [currentCategory, setCurrentCategory] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [maxPage, setMaxPage] = useState(1);

	useEffect(() => {
		getCategories();
	}, []);

	useEffect(() => {
		getProducts();
	}, [currentPage, currentCategory]);

	async function getProducts() {
		const params: APIHeaderParamsType = {
			per_page: productsPerPage,
			page: currentPage,
		};
		if (currentCategory != "all") {
			params.category = currentCategory;
		}
		const response = await AppApi.get(`products`, {
			params,
		});
		const data = response.data.data;
		setMaxPage(data.meta.last_page);
		setProducts(data.data);
	}

	async function getCategories() {
		const response = await AppApi.get(`categories`);
		const categoriesData = response.data.data.data;
		setCategories(categoriesData);
	}

	function setCategory(category: string) {
		setCurrentCategory(category);
		setCurrentPage(1);
	}

	function setPage(to: string) {
		if (to == "next" && currentPage < maxPage) {
			setCurrentPage((prev) => prev + 1);
		} else if (to == "previous" && currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
		}
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
						onClick={() => setPage("previous")}
						className={`${currentPage == 1 ? "inactive" : ""}`}
						disabled={currentPage == 1}
					>
						<IconChevronLeft width={"25"} height={"25"} />
					</button>
					<button
						onClick={() => setPage("next")}
						className={`${
							currentPage == maxPage ? "inactive" : ""
						}`}
						disabled={currentPage == maxPage}
					>
						<IconChevronRight width={"25"} height={"25"} />
					</button>
				</div>
			</section>
			<section className="cards-list">
				{products.length == 0
					? `Currently no products with category ${currentCategory}`
					: products.map((product) => (
							<ProductCard key={product.id} {...product} />
					  ))}
			</section>
		</section>
	);
}
