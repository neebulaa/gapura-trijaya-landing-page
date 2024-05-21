import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeaderNav from "../components/PageHeaderNav";
import ShopProductDetailGallery from "../page-parts/shop-product-detail/ShopProductDetailGallery";
import ShopProductDetailForm from "../page-parts/shop-product-detail/ShopProductDetailForm";
import { ProductType } from "../dto/ProductType";
import ShopProductDetailTable from "../page-parts/shop-product-detail/ShopProductDetailTable";
import { AttributeType } from "../dto/AttributeType";

export default function ShopPlakatDetail() {
	const navigator = useNavigate();
	const { category = "", slug = "" } = useParams();
	const [product, setProduct] = useState(
		{} as ProductType & {
			attributes: AttributeType[];
		}
	);

	useEffect(() => {
		// Redirect if mainProduct is not found
		getProduct();
	}, []);

	async function getProduct() {
		const response = await AppApi.get(`products/${slug}`);
		if (response.status == 404) {
			navigator("/shop");
			return;
		}
		setProduct(response.data.data);
	}

	return (
		<>
			{product.name && (
				<>
					<PageHeaderNav
						navigations={["Home", "Shop", category, product.name]}
					/>
					<section className="container mt-1">
						<section id="shop-product-detail">
							<ShopProductDetailGallery
								images={product.images!}
							/>
							<ShopProductDetailForm
								product={product}
								category={category}
							/>
						</section>
						<section
							style={{
								marginTop: "5rem",
							}}
						>
							{/* <ShopProductDetailTable
						category_type={mainProduct.category_type}
					/> */}
						</section>
					</section>
				</>
			)}
		</>
	);
}
