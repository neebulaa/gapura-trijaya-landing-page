import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../../assets/data/products.json";
import PageHeaderNav from "../../components/PageHeaderNav";
import ShopProductDetailGallery from "../../components/ShopProductDetailGallery";
import ShopPlakatDetailForm from "../../components/ShopPlakatDetailForm";
import { ProductType } from "../../dto/ProductType";
import ShopProductDetailTable from "../../components/ShopProductDetailTable";

export default function ShopPlakatDetail() {
	const navigator = useNavigate();
	const { category_type = "", slug = "" } = useParams();
	const [products, setProducts] = useState(() => {
		return productsData.filter((product) => {
			return (
				product.category == "plakat" &&
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
				navigations={["Home", "Shop", "plakat", category_type]}
			/>
			<section className="container mt-1" id="shop-product-detail">
				<ShopProductDetailGallery
					products={products}
					mainProduct={mainProduct}
					setMainProduct={(item: ProductType) => setMainProduct(item)}
				/>
				<ShopPlakatDetailForm product={mainProduct} />
			</section>
			<section className="container mt-2">
				<ShopProductDetailTable />
			</section>
		</>
	);
}
