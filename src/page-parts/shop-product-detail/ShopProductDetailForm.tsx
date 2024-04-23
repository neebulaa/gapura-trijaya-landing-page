import { useState } from "react";
import { ProductType } from "../../dto/ProductType";
import { formatCurrencyRupiah } from "../../utils/formatCurrency";
import PlakatAkrilikForm from "./PlakatForm/PlakatAkrilikForm";
import PlakatKalimantanForm from "./PlakatForm/PlakatKalimantanForm";
import PlakatKristalForm from "./PlakatForm/PlakatKristalForm";
import CategoryType from "../../assets/data/categoryType.json";
import FixedBannerForm from "./BannerForm/FixedBannerForm";
import CustomBannerForm from "./BannerForm/CustomBannerForm";
import LabelNamaForm from "./StikerForm/LabelNamaForm";
import StikerAlamatForm from "./StikerForm/StikerAlamatForm";
import StikerKromoForm from "./StikerForm/StikerKromoForm";
import StikerVinylForm from "./StikerForm/StikerVinylForm";
import ThankyouCardForm from "./CardForm/ThankyouCardForm";
import IconMinus from "../../assets/icons/IconMinus";
import IconPlus from "../../assets/icons/IconPlus";
import IconBag from "../../assets/icons/IconBag";
import SuccessAddToCartPopup from "../../components/SuccessAddToCartPopup";

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

	if (!categoryObject) return;

	const [data, setData] = useState({});
	const [openSuccessAddToCartPopup, setOpenSuccessAddToCartPopup] =
		useState(false);

	return (
		<section className="shop-product-detail-form">
			{openSuccessAddToCartPopup && (
				<SuccessAddToCartPopup product={product} close={() => setOpenSuccessAddToCartPopup(false)}/>
			)}

			<h1 className="product-name">{product.name}</h1>
			<h2 className="product-price">
				{formatCurrencyRupiah(product.price)}
			</h2>
			<p className="product-description">{categoryObject.description}</p>
			<hr className="mt-1 mb-1" />

			<form action="">
				{categoryObject.category == "plakat" &&
					categoryObject.category_type == "akrilik" && (
						<PlakatAkrilikForm setData={setData} />
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
				{categoryObject.category == "stiker" &&
					categoryObject.category_type == "label nama" && (
						<LabelNamaForm />
					)}
				{categoryObject.category == "stiker" &&
					categoryObject.category_type == "stiker alamat" && (
						<StikerAlamatForm />
					)}
				{categoryObject.category == "stiker" &&
					categoryObject.category_type == "stiker kromo" && (
						<StikerKromoForm />
					)}
				{categoryObject.category == "stiker" &&
					categoryObject.category_type == "stiker vinyl" && (
						<StikerVinylForm />
					)}
				{categoryObject.category == "kartu" &&
					categoryObject.category_type == "thankyou card" && (
						<ThankyouCardForm />
					)}

				<div className="mt-1-05 quantity-and-add-to-bag-button">
					<button className="btn btn-outline quantity-button no-hover no-pointer">
						<div>
							<IconMinus width="10" height="2" />
						</div>
						<p>0</p>
						<div>
							<IconPlus width="14" height="14" />
						</div>
					</button>
					<button type="button" className="btn uppercase add-to-bag-button" onClick={()=>setOpenSuccessAddToCartPopup(true)}>
						<IconBag width="14" height="17" />
						Add to bag
					</button>
				</div>
			</form>
		</section>
	);
}
