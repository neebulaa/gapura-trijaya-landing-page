import React from 'react';
import { DiscountTypeEnum, IPromoDetail, PromoStatusEnum, PromoTypeEnum } from '@/types/promo.ts';
import dayjs from 'dayjs';
import { IUser } from '@/types/user.ts';
import IconCopy from '@/commons/assets/icons/IconCopy.tsx';
import { message } from 'antd';

export interface VoucherCardProps {
  key: string;
  name: string;
  code: string;
  discountAmount: number;
  discountPercent: number;
  startDate: Date;
  endDate: Date;
  description?: string;
  status: PromoStatusEnum;
  discountType: DiscountTypeEnum;
  promoType: PromoTypeEnum;
  createdById: string;
  createdBy?: IUser;
  updatedById: string;
  updatedBy?: IUser;
  promoDetails?: IPromoDetail[];
  maxUsage: number;
  usageCount: number;
}

const VoucherCard = (props: VoucherCardProps) => {
  /**
   * Handle Clipboard Copy
   */
  const handleClipboard = (value: string) => {
    navigator.clipboard.writeText(value).then(() => message.info('Copy to Clipboard!'));
  };

  return (
    <div className={'voucher-card'} key={props.key}>
      <h3>
        {props.discountType === DiscountTypeEnum.AMOUNT
          ? `Rp. ${props.discountAmount}`
          : `${props.discountPercent} %`}{' '}
        OFF
      </h3>
      <h4>{props.name}</h4>

      {props.code ? (
        <div className={'voucher-copy'}>
          <p>Code: {props.code}</p>

          <div
            style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}
            onClick={() => handleClipboard(props.code)}
          >
            <IconCopy />
            <h4>COPY</h4>
          </div>
        </div>
      ) : null}

      <div className={'list-container'}>
        <ul>
          <li>{`${dayjs(props.startDate).format('DD/MM/YYYY HH:mm')} - ${dayjs(props.endDate).format('DD/MM/YYYY HH:mm')}`}</li>
          {props.promoType === PromoTypeEnum.CODE ? (
            <>
              <li>Sisa Penggunaan: {props.maxUsage - props.usageCount}</li>
              <li>Berlaku Untuk Semua Product</li>
            </>
          ) : null}
          {props.promoType === PromoTypeEnum.QTY ? (
            <>
              <li>
                {props.promoDetails
                  ? props.promoDetails.map((detail) => (
                      <p key={detail.id}>
                        {detail.product.name} (Min Qty: {detail.qty})
                      </p>
                    ))
                  : null}
              </li>
            </>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default VoucherCard;
