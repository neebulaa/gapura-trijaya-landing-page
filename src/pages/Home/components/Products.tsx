import IconChevronDown from '@/commons/assets/icons/IconChevronDown';
import IconChevronLeft from '@/commons/assets/icons/IconChevronLeft';
import IconChevronRight from '@/commons/assets/icons/IconChevronRight';
import ProductCard from '@/pages/Shop/components/ProductCard';
import { ICategory } from '@/types/category';
import { IProduct } from '@/types/product';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Products() {
  /**
   * State
   */
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsPerPage] = useState(4);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  return (
    <section
      className="container"
      id="products"
      style={{
        marginTop: '2rem',
      }}
    >
      <header className="section-header">
        <div className="title">
          <h3>Produk Terlaris</h3>
          <h2>Katalog Produk</h2>
        </div>
        <button className="btn btn-outline">
          <Link to="/shop" className="flex gap-04 items-center">
            Lihat Semua {'   '}
            <IconChevronRight width={'20'} height={'20'} />
          </Link>
        </button>
      </header>
      <section className="cards-action">
        <div className="filters">
          <button
            onClick={() => console.log('all')}
            className={`btn-link flex items-center ${'all' == currentCategory ? 'current' : ''}`}
          >
            All
            <IconChevronDown width={'20'} height={'20'} />
          </button>
          {categories.map((category, i) => (
            <button
              onClick={() => console.log(category.name)}
              key={i}
              className={`btn-link flex items-center ${
                category.name == currentCategory ? 'current' : ''
              }`}
            >
              {category.name}{' '}
            </button>
          ))}
        </div>
        <div className="navigation-buttons">
          <button
            onClick={() => console.log('previous')}
            className={`${currentPage == 1 ? 'inactive' : ''}`}
            disabled={currentPage == 1}
          >
            <IconChevronLeft width={'25'} height={'25'} />
          </button>
          <button
            onClick={() => console.log('next')}
            className={`${currentPage == maxPage ? 'inactive' : ''}`}
            disabled={currentPage == maxPage}
          >
            <IconChevronRight width={'25'} height={'25'} />
          </button>
        </div>
      </section>
      <section className="cards-list">
        {products.length == 0
          ? `Currently no products with category ${currentCategory}`
          : products.map((product) => <ProductCard key={product.id} {...product} />)}
      </section>
    </section>
  );
}
