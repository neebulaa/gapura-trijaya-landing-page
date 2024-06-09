import IconBag from '@/commons/assets/icons/IconBag';
import IconMinus from '@/commons/assets/icons/IconMinus';
import IconPlus from '@/commons/assets/icons/IconPlus';
import { separator } from '@/commons/utils/Currency/Currency';
import useShopDetailFormController from '@/pages/Shop/ShopDetail/components/ShopDetailForm/ShopDetailFormController';
import { IProduct } from '@/types/product';
import { Form, Input, Select, Skeleton } from 'antd';

type ShopDetailFormProps = {
  productDetailData: IProduct | any;
  isPending?: boolean;
  refetch?: () => void;
};

const { Option } = Select;

export default function ShopDetailForm(props: ShopDetailFormProps) {
  const { productDetailData, isPending, refetch } = props;

  /**
   * Controller
   */
  const {
    form,
    quantity,
    // setQuantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleSubmit,
    handleChangeVariant,
    renderAttributeSelects,
  } = useShopDetailFormController(productDetailData);

  return (
    <>
      {isPending ? (
        <Skeleton />
      ) : (
        <>
          <section className="shop-product-detail-form">
            <h1 className="product-name">{productDetailData.name}</h1>
            <h2 className="product-price">Rp {separator(productDetailData?.variants[0]?.price)}</h2>
            {productDetailData?.shortDescription && (
              <p className="product-description">{productDetailData?.shortDescription}</p>
            )}
            <hr className="mt-1 mb-1" />
            <Form form={form} layout="vertical">
              {productDetailData?.type === 'configurable' && (
                <>
                  {/* <Form.Item label="Pilih Variant" name="variant" rules={[{ required: false }]}>
                    <Select
                      defaultValue={`${productDetailData?.variants?.[0]?.id}`}
                      options={(productDetailData?.variants || []).map((d: IProduct) => ({
                        value: d.id,
                        label: d.name,
                      }))}
                      onChange={handleChangeVariant}
                    />
                  </Form.Item> */}
                  {renderAttributeSelects(productDetailData?.attributes)}
                </>
              )}

              <Form.Item label="Keterangan" name="keterangan" rules={[{ required: false }]}>
                <Input.TextArea placeholder="Keterangan" />
              </Form.Item>

              <div className="mt-1-05 quantity-and-add-to-bag-button">
                <button
                  type="button"
                  className="btn btn-outline quantity-button no-hover no-pointer"
                >
                  <div onClick={handleDecreaseQuantity}>
                    <IconMinus width="10" height="10" />
                  </div>
                  <Form.Item hidden name="quantity" rules={[{ required: false }]}>
                    <Input type="hidden" name="quantity" value={quantity} />
                  </Form.Item>
                  <p>{quantity}</p>
                  <div onClick={handleIncreaseQuantity}>
                    <IconPlus width="14" height="14" />
                  </div>
                </button>
                <button
                  type="button"
                  className="btn uppercase add-to-bag-button"
                  onClick={handleSubmit}
                >
                  <IconBag width="14" height="17" />
                  Add to bag
                </button>
              </div>
            </Form>
          </section>
        </>
      )}
    </>
  );
}
