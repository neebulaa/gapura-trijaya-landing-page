import React, { useState } from 'react';
import VoucherCard from '@/commons/components/Public/VoucherCard.tsx';
import { useGetPublicPromos } from '@/services/queries/promo.query.ts';
import { PromoQuery, PromoTypeEnum } from '@/types/promo.ts';

const Promos = () => {
  /**
   * Get Promos
   */
  const [simplePromoParams] = useState<PromoQuery>({
    page: 1,
    limit: 4,
    promoType: PromoTypeEnum.CODE,
  });

  const { data: promosData, isFetching: promosDataIsFetching } =
    useGetPublicPromos(simplePromoParams);

  return (
    <section
      className={'container'}
      id={'promos'}
      style={{
        marginTop: '2rem',
      }}
    >
      <header className="section-header">
        <div className="title">
          <h3>Voucher Anda</h3>
          <h2>Voucher</h2>
        </div>
        {/*<button className="btn btn-outline">*/}
        {/*  <Link to="/shop" className="flex gap-04 items-center">*/}
        {/*    Lihat Semua {'   '}*/}
        {/*    <IconChevronRight width={'20'} height={'20'} />*/}
        {/*  </Link>*/}
        {/*</button>*/}
      </header>
      <section>
        <div className={'voucher-cards'}>
          {promosData ? (
            <>
              {promosData.data.map((promo) => (
                <VoucherCard {...promo} key={promo.id} />
              ))}
            </>
          ) : null}
        </div>
      </section>
    </section>
  );
};

export default Promos;
