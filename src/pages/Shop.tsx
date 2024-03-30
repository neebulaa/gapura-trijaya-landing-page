import PageHeader from "../components/PageHeader";
import Catalog from '../page-parts/shop/Catalog';
export default function Shop() {
	return (
		<>
			<PageHeader title="Katalog" navigations={["Home", "Shop"]} />
			<Catalog />
		</>
	);
}
