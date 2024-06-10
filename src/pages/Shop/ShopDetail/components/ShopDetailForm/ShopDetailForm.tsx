import IconBag from '@/commons/assets/icons/IconBag';
import IconMinus from '@/commons/assets/icons/IconMinus';
import IconPlus from '@/commons/assets/icons/IconPlus';
import { separator } from '@/commons/utils/Currency/Currency';
import useShopDetailFormController from '@/pages/Shop/ShopDetail/components/ShopDetailForm/ShopDetailFormController';
import { ShopDetailFormProps } from '@/pages/Shop/ShopDetail/components/ShopDetailForm/interface/ShopDetailForm.interface';
import { Button, Form, Input, Skeleton } from 'antd';

// const { Option } = Select;

export default function ShopDetailForm(props: ShopDetailFormProps) {
  const { productDetailData, isPending, selectedVariant } = props;

  /**
   * Controller
   */
  const {
    form,
    quantity,
    // setQuantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleAddToCart,
    renderAttributeSelects,
    addItemCartIsLoading,
  } = useShopDetailFormController(props);

  return (
    <>
      {isPending ? (
        <Skeleton />
      ) : (
        <>
          <section className="shop-product-detail-form">
            {/* <h1 className="product-name">{productDetailData.name}</h1> */}
            <h1 className="product-name">{selectedVariant?.name}</h1>
            <h2 className="product-price">Rp {separator(selectedVariant?.price)}</h2>
            {productDetailData?.shortDescription && (
              <p className="product-description">{productDetailData?.shortDescription}</p>
            )}
            <hr className="mt-1 mb-1" />
            <Form form={form} layout="vertical">
              {productDetailData?.type === 'configurable' && (
                <>{renderAttributeSelects(productDetailData?.attributes)}</>
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
                {/* <button
                  type="button"
                  className="btn uppercase add-to-bag-button"
                  disabled={addItemCartIsLoading}
                  onClick={() => handleAddToCart()}
                >
                  <IconBag width="14" height="17" />
                  Add to bag
                </button> */}
                <Button
                  type="primary"
                  className="uppercase rounded-full bg-primary w-full shadow-none px-[0.875rem] py-[1.75rem]"
                  size="large"
                  loading={addItemCartIsLoading}
                  onClick={() => handleAddToCart()}
                  style={{
                    padding: '1.75rem 0.875rem',
                  }}
                >
                  <IconBag width="14" height="17" />
                  Add to bag
                </Button>
              </div>
            </Form>
          </section>
        </>
      )}
    </>
  );
}
