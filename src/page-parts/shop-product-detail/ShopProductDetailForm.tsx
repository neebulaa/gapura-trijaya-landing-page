import { useState } from "react";
import { ProductType } from "../../dto/ProductType";
import { formatCurrencyRupiah } from "../../utils/formatCurrency";
import PlakatAkrilikForm from "./PlakatForm/PlakatAkrilikForm";
import PlakatKalimantanForm from "./PlakatForm/PlakatKalimantanForm";
import PlakatKristalForm from "./PlakatForm/PlakatKristalForm";
import CategoryType from "../../assets/data/categoryType.json";
import { redirect } from "react-router-dom";
import FixedBannerForm from "./BannerForm/FixedBannerForm";
import CustomBannerForm from "./BannerForm/CustomBannerForm";

type ShopPlakatDetailFormType = {
	product: ProductType;
	category: string;
	category_type: string;
};

export default function ShopPlakatDetailForm({
	product,
	category,
	category_type,
}: ShopPlakatDetailFormType) {
	const [categoryObject, setCategoryObject] = useState(() => {
		return CategoryType.find(
			(cat) =>
				cat.category == category && cat.category_type == category_type
		);
	});

	if (!categoryObject) {
		redirect("/not-found");
		return "";
	}

	return (
		<section className="shop-product-detail-form">
			<h1 className="product-name">{product.name}</h1>
			<h2 className="product-price">
				{formatCurrencyRupiah(product.price)}
			</h2>
			<p className="product-description">{categoryObject.description}</p>
			<hr className="mt-1 mb-1" />
			{categoryObject.category == "plakat" &&
				categoryObject.category_type == "akrilik" && (
					<PlakatAkrilikForm />
				)}
			{categoryObject.category == "plakat" &&
				categoryObject.category_type == "kristal" && (
					<PlakatKristalForm />
				)}
			{categoryObject.category == "plakat" &&
				categoryObject.category_type == "kalimantan" && (
					<PlakatKalimantanForm />
				)}
			{categoryObject.category == "banner" &&
				categoryObject.category_type == "fixed banner" && (
					<FixedBannerForm />
				)}
			{categoryObject.category == "banner" &&
				categoryObject.category_type == "custom banner" && (
					<CustomBannerForm />
				)}
		</section>
	);
}
