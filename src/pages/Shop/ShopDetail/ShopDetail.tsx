import PageHeaderNav from '@/commons/components/Layout/HomeLayout/PageHeaderNav';
import { useParams } from 'react-router-dom';
import ShopDetailForm from '@/pages/Shop/ShopDetailForm/ShopDetailForm';
import ShopDetailGallery from '@/pages/Shop/ShopDetailGallery/ShopDetailGallery';

export default function ShopDetail() {
  const { category = 'Pelakat', slug = '' } = useParams();

  return (
    <>
      <PageHeaderNav navigations={['Home', 'Shop', category, 'Product ABC']} />
      <section className="container mt-1">
        <section id="shop-product-detail">
          {/* <ShopProductDetailGallery images={product.images!} />
          <ShopProductDetailForm product={product} category={category} /> */}
          <ShopDetailGallery images={[`/noimg.png`]} />
          <ShopDetailForm />
        </section>
        <section
          style={{
            marginTop: '5rem',
          }}
        >
          {/* <ShopProductDetailTable
						category_type={mainProduct.category_type}
					/> */}
        </section>
      </section>
    </>
  );
}
