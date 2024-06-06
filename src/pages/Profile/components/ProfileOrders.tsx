import AppModal from '@/commons/components/Public/AppModal';
import { separator } from '@/commons/utils/Currency/Currency';
import { useEffect, useState } from 'react';

export default function ProfileOrders() {
  const OrdersData = [
    {
      id: '1',
      product: {
        name: 'Product 1',
        image: '/images/products/product-1.jpg',
      },
      attributes: {
        color: 'red',
        size: 'L',
      },
      total: 100000,
      status: 'delivered',
    },
    {
      id: '2',
      product: {
        name: 'Product 2',
        image: '/images/products/product-2.jpg',
      },
      attributes: {
        color: 'blue',
        size: 'M',
      },
      total: 200000,
      status: 'in-progress',
    },
    {
      id: '3',
      product: {
        name: 'Product 3',
        image: '/images/products/product-3.jpg',
      },
      attributes: {
        color: 'green',
        size: 'S',
      },
      total: 300000,
      status: 'cancelled',
    },
  ];

  const [tabs, setTabs] = useState(['all', 'delivered', 'in-progress', 'cancelled']);
  const [status, setStatus] = useState('all');
  const [orders, setOrders] = useState(OrdersData);
  const [openModalDetailOrders, setOpenModalDetailOrders] = useState(() => {
    return OrdersData.reduce((acc, curr) => {
      acc.push({
        order_id: curr.id,
        active: false,
      });
      return acc;
    }, [] as { [key: string]: any }[]);
  });
  const [detailOrderProgress, setDetailOrderProgress] = useState({
    paymentVerified: {
      text: 'Pembayaran sudah diverifikasi',
      date: '04 Mei 2024, 15:06 WIB',
      done: true,
    },
    orderProcessed: {
      text: 'Pesanan sedang diproses oleh penjual',
      date: '04 Mei 2024, 15:06 WIB',
      done: true,
    },
    orderSent: {
      text: 'Pesanan telah dikirim',
      date: '04 Mei 2024, 15:06 WIB',
      done: true,
    },
    orderArrived: {
      text: 'Pesanan telah sampai pada tujuan',
      date: '04 Mei 2024, 15:06 WIB',
      done: true,
    },
    orderConfirmed: {
      text: 'Transaksi dikonfirmasi',
      date: '04 Mei 2024, 15:06 WIB',
      done: true,
    },
    transactionDone: {
      text: 'Transaksi selesai',
      date: '04 Mei 2024, 15:06 WIB',
      done: false,
    },
  });

  const [openModalReviewOrders, setOpenModalReviewOrders] = useState(() => {
    return OrdersData.reduce((acc, curr) => {
      acc.push({
        order_id: curr.id,
        active: false,
      });
      return acc;
    }, [] as { [key: string]: any }[]);
  });

  useEffect(() => {
    filterBystatus();
  }, [status]);

  function filterBystatus() {
    setOrders(() => {
      if (status == 'all') return OrdersData;
      return OrdersData.filter((p) => p.status == status);
    });
  }

  return (
    <section className="profile-orders">
      <section className="profile-orders-header">
        {tabs.map((t, i) => (
          <button key={i} className={`${t == status ? 'active' : ''}`} onClick={() => setStatus(t)}>
            {t.split('-').join(' ')}
          </button>
        ))}
      </section>
      <section className="profile-orders-content">
        {orders.length > 0 &&
          orders.map((order) => (
            <div className="profile-orders-content-card" key={order.id}>
              <div className="profile-orders-content-card-product mt-2">
                <img
                  src={`${import.meta.env.VITE_APP_URL}${order.product.image}`}
                  alt={`${import.meta.env.VITE_APP_NAME} - ` + order.product.name}
                />
                <div className="profile-orders-content-card-product-desc">
                  <h3 className="semibold">{order.product.name}</h3>
                  {Object.entries(order.attributes).map((attribute, i) => (
                    <p key={i}>
                      {attribute[0].split('_').join(' ')}: {attribute[1]}
                    </p>
                  ))}
                </div>
                <div className="profile-orders-content-card-product-action">
                  <button
                    className="btn btn-outline"
                    onClick={() =>
                      setOpenModalDetailOrders((prev) =>
                        prev.map((o) => (o.order_id == order.id ? { ...o, active: true } : o))
                      )
                    }
                  >
                    Detail Order
                  </button>
                  {order.status == 'delivered' && (
                    <button
                      className="btn"
                      onClick={() =>
                        setOpenModalReviewOrders((prev) =>
                          prev.map((o) =>
                            o.order_id == order.id
                              ? {
                                  ...o,
                                  active: true,
                                }
                              : o
                          )
                        )
                      }
                    >
                      Review Order
                    </button>
                  )}
                  {order.status == 'in-progress' && (
                    <button className="btn btn-danger">Cancel Order</button>
                  )}
                </div>
              </div>
              <div className="mt-1-05 profile-orders-content-card-status">
                <div className="flex gap-05 flex-wrap justify-center items-center">
                  <div
                    className={`badge badge-${
                      order.status == 'delivered'
                        ? 'success'
                        : order.status == 'in-progress'
                        ? 'warning'
                        : 'danger'
                    }`}
                  >
                    {order.status.split('-').join(' ')}
                  </div>
                  {order.status == 'delivered' && (
                    <p className="text-center">Your product has been delivered</p>
                  )}
                  {order.status == 'in-progress' && (
                    <p className="text-center">Your product is in progress</p>
                  )}
                  {order.status == 'cancelled' && (
                    <p className="text-center">Your product is cancelled</p>
                  )}
                </div>
                <p className="bold text-center">
                  Total pesanan: {separator(order.total)}
                </p>
              </div>
              {openModalDetailOrders.find((o) => o.order_id == order.id)!.active && (
                <AppModal
                  title={'Transaction Detail'}
                  close={() =>
                    setOpenModalDetailOrders((prev) =>
                      prev.map((o) => (o.order_id == order.id ? { ...o, active: false } : o))
                    )
                  }
                >
                  <div className="flex flex-wrap items-center gap-1">
                    <div
                      className={`badge badge-${
                        order.status == 'delivered'
                          ? 'success'
                          : order.status == 'in-progress'
                          ? 'warning'
                          : 'danger'
                      }`}
                    >
                      {order.status.split('-').join(' ')}
                    </div>
                    {order.status == 'delivered' && (
                      <p className="text-center">Your product has been delivered</p>
                    )}
                    {order.status == 'in-progress' && (
                      <p className="text-center">Your product is in progress</p>
                    )}
                    {order.status == 'cancelled' && (
                      <p className="text-center">Your product is cancelled</p>
                    )}
                  </div>
                  <hr className="mt-1 mb-1" />
                  <ul className="card-bordered detail-order-progress">
                    {Object.entries(detailOrderProgress)
                      .reverse()
                      .map(([_, progress], i) => (
                        <li key={i}>
                          <div className="detail-order-date">{progress.date}</div>
                          <div className="detail-order-status">
                            <input type="radio" checked={progress.done} />
                            <p>{progress.text}</p>
                          </div>
                        </li>
                      ))}
                  </ul>
                  <button
                    className="btn w-100 mt-1"
                    onClick={() =>
                      setOpenModalDetailOrders((prev) =>
                        prev.map((o) =>
                          o.order_id == order.id
                            ? {
                                ...o,
                                active: false,
                              }
                            : o
                        )
                      )
                    }
                  >
                    Close
                  </button>
                </AppModal>
              )}
              {openModalReviewOrders.find((o) => o.order_id == order.id)!.active && (
                <AppModal
                  title="Write a review"
                  close={() =>
                    setOpenModalReviewOrders((prev) =>
                      prev.map((o) =>
                        o.order_id == order.id
                          ? {
                              ...o,
                              active: false,
                            }
                          : o
                      )
                    )
                  }
                >
                  <div className="flex flex-col items-center gap-1">
                    <p className="medium fs-1-250">Overall Rating</p>
                    {/* <RatingStars rating={5} size="40" /> */}
                  </div>
                  <div className="input-box w-100 mt-1">
                    <label htmlFor="messages">
                      Write your review <span className="accent">*</span>
                    </label>
                    <textarea name="messages" id="messages" rows={5}></textarea>
                  </div>

                  <div className="input-box mt-1-05">
                    <label>
                      Add photo or video
                      <span className="italic">(Opsional)</span>
                    </label>
                    <label className="btn btn-outline uppercase" htmlFor="upload-file">
                      Upload File
                    </label>
                    <input className="none" type="file" id="upload-file" />
                  </div>

                  <button className="btn w-100 mt-1-05">Save</button>
                </AppModal>
              )}
            </div>
          ))}
        {orders.length == 0 && <p className="mt-1">No order with status {status}</p>}
      </section>
    </section>
  );
}
