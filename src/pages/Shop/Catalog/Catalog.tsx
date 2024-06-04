import IconGrid from '@/commons/assets/icons/IconGrid';
import IconList from '@/commons/assets/icons/IconList';
import useCatalogController from '@/pages/Shop/Catalog/CatalogController';
import ProductCard from '@/pages/Shop/components/ProductCard';
import { Pagination } from 'antd';

// const MAX_PAGE_ON_PAGINATION = 5;
// const DEFAULT_ITEMS_PER_PAGE = 6;

export default function Catalog() {
  /**
   * Controller
   */
  const {
    gridSystem,
    setGridSystem,
    productQueryParams,
    setProductQueryParams,
    productsData,
    productsDataIsFetching,
    getProducts,
  } = useCatalogController();

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
          {/* <DropdownFilter
            title="Jenis Produk"
            items={['all', 'Produk Jadi', 'Produk Custom']}
            type="link"
            onFilter={setProductType}
            currentItem={currentProductType}
            open={true}
          />
          <DropdownFilter
            title="Kategori Produk"
            items={['all', ...categories.map((cat) => cat.name)]}
            type="link"
            onFilter={setCategory}
            currentItem={currentCategory}
            open={true}
          /> */}
          {/* <DropdownFilter
						title="Warna"
						items={colors}
						type="checkbox"
						onFilter={setColors}
						currentItem={currentColors}
					/> */}
          {/* <DropdownFilter
            title="Harga"
            items={['all', '0 - 50K', '50K - 200K', '200K - 1.000K', '1.000K+']}
            type="radio"
            onFilter={setPriceRange}
            currentItem={currentPriceRange}
          /> */}
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
            Showing page {1} - {5} of {30} results
          </p>
          <select id="catalog-sort" className="tj" onChange={() => console.log('sort product')}>
            <option value="a-z">Alphabetical - A to Z</option>
            <option value="z-a">Alphabetical - Z to A</option>
            <option value="pl-ph">Price - Low to High</option>
            <option value="ph-pl">Price - High to Low</option>
          </select>
          <div className="btn-split">
            <button
              onClick={() => setGridSystem('columns')}
              className={`${gridSystem == 'columns' ? 'active' : ''}`}
            >
              <IconGrid />
            </button>
            <button
              onClick={() => setGridSystem('rows')}
              className={`${gridSystem == 'rows' ? 'active' : ''}`}
            >
              <IconList />
            </button>
          </div>
        </section>
        <section className={`cards-list ${gridSystem == 'rows' ? 'list-rows' : ''}`}>
          {/* List of product */}
          {!productsData?.data || productsData.data.length == 0
            ? `Currently no products with category Product`
            : productsData.data!.map((product) => <ProductCard key={product.id} {...product} />)}
        </section>
        {/* Pagination */}
        <div className="my-5 float-end">
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </section>
    </section>
  );
}
