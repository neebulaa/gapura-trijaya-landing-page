import { useState, useEffect, ChangeEvent } from "react";
import ProductCard from "../../components/ProductCard";
import DropdownFilter from "../../components/DropdownFilter";
import { ProductType } from "../../dto/ProductType";
import PaginationToolsWatcher from "../../components/PaginationToolsWatcher";
import { CategoryType } from "../../dto/CategoryType";
import { APIHeaderParamsType } from "../../dto/APIHeaderParamsType";
import fetching from "../../utils/fetching";

const MAX_PAGE_ON_PAGINATION = 5;
const DEFAULT_ITEMS_PER_PAGE = 6;

export default function Catalog() {
	const [gridSystem, setGridSystem] = useState("columns");
	const [products, setProducts] = useState<ProductType[]>([]);
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const [productsPerPage, setProductsPerPage] = useState(10);
	const [currentProductType, setCurrentProductType] = useState("all");
	const [currentCategory, setCurrentCategory] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [maxPage, setMaxPage] = useState(1);

	const [currentPriceRange, setCurrentPriceRange] = useState("all");
	// const [currentColors, setCurrentColors] = useState<string[]>([]);
	// const [currentSize, setCurrentSize] = useState("all");
	// const [currentMaterials, setCurrentMaterials] = useState<string[]>([]);

	useEffect(() => {
		getCategories();
	}, []);

	useEffect(() => {
		getProducts();
	}, [
		currentPage,
		currentCategory,
		productsPerPage,
		currentPriceRange,
		currentProductType,
	]);

	async function getProducts() {
		const params: APIHeaderParamsType = {
			per_page: productsPerPage,
			page: currentPage,
		};
		if (currentCategory != "all") {
			params.category = currentCategory;
		}
		const response = await fetching("get", `products`, {
			params,
		});
		const data = response.data.data;
		setMaxPage(data.meta.last_page);
		const filteredProducts = filter(data.data);
		setProducts(filteredProducts);
	}

	async function getCategories() {
		const response = await fetching("get", `categories`);
		const categoriesData = response.data.data.data;
		setCategories(categoriesData);
	}

	// const sizes = useMemo(
	// 	() => [
	// 		"all",
	// 		...productsData.reduce<string[]>((acc, curr) => {
	// 			if (!acc.includes(curr.size)) {
	// 				acc.push(curr.size);
	// 			}
	// 			return acc;
	// 		}, []),
	// 	],
	// 	[productsData]
	// );

	// const colors = useMemo(
	// 	() =>
	// 		productsData.reduce<string[]>((acc, curr) => {
	// 			curr.colors.forEach((color) => {
	// 				if (!acc.includes(color)) {
	// 					acc.push(color);
	// 				}
	// 			});
	// 			return acc;
	// 		}, []),
	// 	[productsData]
	// );

	// const materials = useMemo(
	// 	() =>
	// 		productsData.reduce<string[]>((acc, curr) => {
	// 			curr.materials.forEach((color) => {
	// 				if (!acc.includes(color)) {
	// 					acc.push(color);
	// 				}
	// 			});
	// 			return acc;
	// 		}, []),
	// 	[productsData]
	// );

	// useEffect(() => {
	// 	filter();
	// }, [
	// 	currentCategory,
	// 	currentColors,
	// 	currentPriceRange,
	// 	currentMaterials,
	// 	currentSize,
	// ]);

	function setCategory(category: string) {
		setCurrentCategory(category);
		setCurrentPage(1);
	}

	function setProductType(type: string) {
		setCurrentProductType(type);
		setCurrentPage(1);
	}

	// function setSize(size: string) {
	// 	setCurrentSize(size);
	// }

	// function setColors(colors: string[]) {
	// 	setCurrentColors(colors);
	// }

	function setPriceRange(priceRange: string) {
		setCurrentPriceRange(priceRange);
		setCurrentPage(1);
	}

	// function setMaterials(materials: string[]) {
	// 	setCurrentMaterials(materials);
	// }

	function setPage(to: string | number) {
		if (typeof to == "number") {
			if (to == currentPage) return;
			setCurrentPage(to);
		}

		if (to == "next" && currentPage < maxPage) {
			setCurrentPage((prev) => prev + 1);
		} else if (to == "previous" && currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
		}
	}

	function setTotalProductsPerPage(e: ChangeEvent<HTMLSelectElement>) {
		const value = Number(e.currentTarget.value);
		setProductsPerPage(value);
		setCurrentPage(1);
	}

	function filter(products: ProductType[]) {
		let result = filterByProductType(products);
		result = filterByPriceRange(result);
		// filterByColors();
		// filterBySize();
		// filterByMaterials();
		return result;
	}

	function filterByProductType(products: ProductType[]) {
		return products.filter((product) => {
			if (currentProductType == "Produk Jadi") {
				return product.type == "simple";
			} else if (currentProductType == "Produk Custom") {
				return product.type == "configurable";
			}
			// if currentProductType == 'all'
			return product;
		});
	}

	function filterByPriceRange(products: ProductType[]) {
		function getPriceRangeCheck(product: ProductType) {
			if (product.price == null) return;
			const priceRangeCheckOptions = {
				all: true,
				"0 - 50K": product.price >= 0 && product.price <= 50000,
				"50K - 200K": product.price >= 50000 && product.price <= 200000,
				"200K - 1.000K":
					product.price >= 200000 && product.price <= 1000000,
				"1.000K+": product.price >= 1000000,
			};
			return priceRangeCheckOptions[
				currentPriceRange as keyof typeof priceRangeCheckOptions
			];
		}
		if (currentPriceRange == "all") return products;
		return products.filter((product) => getPriceRangeCheck(product));
	}

	// function filterByColors() {
	// 	setProducts((latestProducts) => {
	// 		if (currentColors.length == 0) return latestProducts;
	// 		return latestProducts.filter((product) => {
	// 			let valid = false;
	// 			currentColors.every((color) => {
	// 				if (product.colors.includes(color)) {
	// 					valid = true;
	// 					return true;
	// 				} else {
	// 					valid = false;
	// 					return false;
	// 				}
	// 			});
	// 			return valid;
	// 		});
	// 	});
	// }

	// function filterByMaterials() {
	// 	setProducts((latestProducts) => {
	// 		if (currentMaterials.length == 0) return latestProducts;
	// 		return latestProducts.filter((product) => {
	// 			let valid = false;
	// 			currentMaterials.every((material) => {
	// 				if (product.materials.includes(material)) {
	// 					valid = true;
	// 					return true;
	// 				} else {
	// 					valid = false;
	// 					return false;
	// 				}
	// 			});
	// 			return valid;
	// 		});
	// 	});
	// }

	function sortProducts(e: ChangeEvent<HTMLSelectElement>) {
		const sortBy = e.target.value;

		if (sortBy == "a-z") {
			setProducts((latestProducts) => {
				return [...latestProducts].sort((a, b) => {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}
					return 0;
				});
			});
		} else if (sortBy == "z-a") {
			setProducts((latestProducts) => {
				return [...latestProducts].sort((a, b) => {
					if (a.name < b.name) {
						return 1;
					}
					if (a.name > b.name) {
						return -1;
					}
					return 0;
				});
			});
		} else if (sortBy == "pl-ph") {
			setProducts((latestProducts) => {
				return [...latestProducts].sort((a, b) => {
					if (a.price! < b.price!) {
						return -1;
					}
					if (a.price! > b.price!) {
						return 1;
					}
					return 0;
				});
			});
		} else if (sortBy == "ph-pl") {
			setProducts((latestProducts) => {
				return [...latestProducts].sort((a, b) => {
					if (a.price! < b.price!) {
						return 1;
					}
					if (a.price! > b.price!) {
						return -1;
					}
					return 0;
				});
			});
		}
	}

	return (
		<section className="container" id="catalog">
			<aside className="catalog-sidebar">
				<header className="section-header">
					<div className="title">
						<h3>Produk Terlaris</h3>
						<h2>Katalog Produk</h2>
					</div>
				</header>
				<section className="catalog-filters-vertical dropdown-filters">
					<DropdownFilter
						title="Jenis Produk"
						items={["all", "Produk Jadi", "Produk Custom"]}
						type="link"
						onFilter={setProductType}
						currentItem={currentProductType}
						open={true}
					/>
					<DropdownFilter
						title="Kategori Produk"
						items={["all", ...categories.map((cat) => cat.name)]}
						type="link"
						onFilter={setCategory}
						currentItem={currentCategory}
						open={true}
					/>
					{/* <DropdownFilter
						title="Warna"
						items={colors}
						type="checkbox"
						onFilter={setColors}
						currentItem={currentColors}
					/> */}
					<DropdownFilter
						title="Harga"
						items={[
							"all",
							"0 - 50K",
							"50K - 200K",
							"200K - 1.000K",
							"1.000K+",
						]}
						type="radio"
						onFilter={setPriceRange}
						currentItem={currentPriceRange}
					/>
					{/* <DropdownFilter
						title="Ukuran"
						items={sizes}
						type="radio"
						onFilter={setSize}
						currentItem={currentSize}
					/> */}
					{/* <DropdownFilter
						title="Bahan"
						items={materials}
						type="checkbox"
						onFilter={setMaterials}
						currentItem={currentMaterials}
					/> */}
				</section>
			</aside>
			<section className="catalog-products">
				<section className="catalog-filters-horizontal flex gap-1 items-center">
					<p>
						Showing page {currentPage} - {maxPage} of{" "}
						{products.length} results
					</p>
					<select id="catalog-sort" onChange={sortProducts}>
						<option value="a-z">Alphabetical - A to Z</option>
						<option value="z-a">Alphabetical - Z to A</option>
						<option value="pl-ph">Price - Low to High</option>
						<option value="ph-pl">Price - High to Low</option>
					</select>
					<div className="btn-split">
						<button
							onClick={() => setGridSystem("columns")}
							className={`${
								gridSystem == "columns" ? "active" : ""
							}`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="currentColor"
							>
								<path d="M8 0H0V8H8V0Z" />
								<path d="M8 10H0V18H8V10Z" />
								<path d="M18 0H10V8H18V0Z" />
								<path d="M18 10H10V18H18V10Z" />
							</svg>
						</button>
						<button
							onClick={() => setGridSystem("rows")}
							className={`${
								gridSystem == "rows" ? "active" : ""
							}`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="16"
								viewBox="0 0 18 16"
								fill="currentColor"
							>
								<path d="M18 4H0V0H18V4ZM18 6H0V10H18V6ZM18 12H0V16H18V12Z" />
							</svg>
						</button>
					</div>
				</section>
				<section
					className={`cards-list ${
						gridSystem == "rows" ? "list-rows" : ""
					}`}
				>
					{products.length == 0
						? `Currently no products with category ${currentCategory}`
						: products.map((product) => (
								<ProductCard key={product.id} {...product} />
						  ))}
				</section>
				<PaginationToolsWatcher
					MAX_PAGE_ON_PAGINATION={MAX_PAGE_ON_PAGINATION}
					DEFAULT_ITEMS_PER_PAGE={DEFAULT_ITEMS_PER_PAGE}
					setTotalItemsPerPage={setTotalProductsPerPage}
					itemsPerPage={productsPerPage}
					setPage={setPage}
					currentPage={currentPage}
					maxPage={maxPage}
				/>
			</section>
		</section>
	);
}
