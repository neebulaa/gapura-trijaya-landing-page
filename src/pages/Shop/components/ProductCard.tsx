import IconHeart from '@/commons/assets/icons/IconHeart';
import IconHeartOutline from '@/commons/assets/icons/IconHeartOutline';
import { ApiImgUrl } from '@/commons/utils/ApiImgUrl';
import { separator } from '@/commons/utils/Currency/Currency';
import { IProduct } from '@/types/product';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard(props: IProduct) {
  const { id, name, price, slug, images } = props;

  /**
   * State
   */
  const [isFavorite, setIsFavorite] = useState<boolean | number>(() => true);
  const [likeCount, setLikeCount] = useState<number>(() => Number(5));

  return (
    <>
      <Link to={`/shop/${props?.slug}`} className="card-as-link">
        <article className="card">
          <div className="card-thumb">
            {images && images.length ? (
              <img
                src={`${ApiImgUrl(images[0].medium)}`}
                alt={`${import.meta.env.VITE_APP_NAME} - ` + props?.name}
              />
            ) : (
              <img src={`/noimg.png`} alt={`empty-image`} />
            )}
          </div>
          <div className="card-content">
            <h3 className="card-title">{props?.name}</h3>
            <h4 className="card-highlighter">{`Category Name`}</h4>
            <p className="mt-1 card-description flex gap-04 items-center">
              Mulai dari
              <span className="product-price">Rp {separator(props?.price!)}</span>
            </p>
            <div className="mt-1 flex gap-05">
              <div className="accent">
                <IconHeart width="18" height="15" />
              </div>
              disukai oleh 5 orang
            </div>
          </div>
          <div className="card-like" onClick={() => console.log('like product')}>
            {isFavorite && <IconHeart width="21" height="18" />}
            {!isFavorite && <IconHeartOutline width="24" height="24" />}
          </div>
        </article>
      </Link>
    </>
  );
}
