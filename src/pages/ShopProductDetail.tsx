import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../assets/data/products.json";
import PageHeaderNav from "../components/PageHeaderNav";
import ShopProductDetailGallery from "../page-parts/shop-product-detail/ShopProductDetailGallery";
import ShopProductDetailForm from "../page-parts/shop-product-detail/ShopProductDetailForm";
import { ProductType } from "../dto/ProductType";
import ShopProductDetailTable from "../page-parts/shop-product-detail/ShopProductDetailTable";

export default function ShopPlakatDetail() {
	const navigator = useNavigate();
	const { category = "", category_type = "", slug = "" } = useParams();
	const [products, setProducts] = useState(() => {
		return productsData.filter((product) => {
			return (
				product.category == category &&
				product.category_type == category_type
			);
		});
	});
	const [mainProduct, setMainProduct] = useState<ProductType>(() => {
		// check if slug exists
		const product = products.find((product) => product.slug == slug);
		if (product == null) {
			navigator("/shop", { replace: true });
			return {} as ProductType;
		} else {
			return product;
		}
	});

	return (
		<>
			<PageHeaderNav
				navigations={["Home", "Shop", category, category_type]}
			/>
			<section className="container mt-1">
				<section id="shop-product-detail">
					<ShopProductDetailGallery
						products={products}
						mainProduct={mainProduct}
						setMainProduct={(item: ProductType) =>
							setMainProduct(item)
						}
					/>
					<ShopProductDetailForm
						product={mainProduct}
						category={category}
						category_type={mainProduct.category_type}
					/>
				</section>
				<section
					style={{
						marginTop: "5rem",
					}}
				>
					<ShopProductDetailTable
						category_type={mainProduct.category_type}
					/>
				</section>
			</section>
		</>
	);
}
