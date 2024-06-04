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
    handleChangeVariant
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
              {/* <Form.Item label={`Pilih variant: Test`} name="variant" rules={[{ required: false }]}>
                <Row gutter={[16, 16]}>
                  {productDetailData?.variants?.map((variant: IProduct) => (
                    <Col key={variant.id}>
                      <Button key={variant.id} type="default">
                        {variant.name}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </Form.Item> */}
              <Form.Item label="Pilih Variant" name="variant" rules={[{ required: false }]}>
                <Select
                  // placeholder="Variant"
                  // filterOption={false}
                  // optionLabelProp="label"
                  // defaultActiveFirstOption
                  defaultValue={`${productDetailData?.variants?.[0]?.id}`}
                  options={(productDetailData?.variants || []).map((d: IProduct) => ({
                    value: d.id,
                    label: d.name,
                  }))}
                  onChange={handleChangeVariant}
                />
              </Form.Item>

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
