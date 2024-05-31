import useProductFormController from '@/pages/Admin/Product/ProductForm/ProductFormController';
import ProductDetailForm from '@/pages/Admin/Product/ProductForm/components/ProductDetailForm/ProductDetailForm';
import ProductImageForm from '@/pages/Admin/Product/ProductForm/components/ProductImageForm/ProductImageForm';
import { FormType, IFormProps } from '@/types/global/form';
import { Breadcrumb, Card } from 'antd';

export default function ProductForm(props: IFormProps) {
  const { formType } = props;
  const { handleTabChange, tabKey, breadcrumbItem } = useProductFormController(props);

  return (
    <>
      <Breadcrumb items={breadcrumbItem} />
      <Card
        tabList={[
          {
            key: 'product-details',
            tab: 'Product Details',
          },
          {
            key: 'product-images',
            tab: 'Product Images',
            disabled: formType === FormType.CREATE,
          },
        ]}
        onTabChange={(key) => {
          handleTabChange(key);
        }}
        activeTabKey={tabKey}
      >
        {/*  */}
        <>
          {tabKey === 'product-details' && <ProductDetailForm formType={formType} />}

          {tabKey === 'product-images' && <ProductImageForm />}
        </>
      </Card>
    </>
  );
}
