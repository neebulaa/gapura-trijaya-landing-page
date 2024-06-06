import IconCheck from '@/commons/assets/icons/IconCheck';
import IconLocation from '@/commons/assets/icons/IconLocation';
import AppModal from '@/commons/components/Public/AppModal';
import HeaderProgress from '@/commons/components/Public/HeaderProgress';
import SearchBar from '@/commons/components/Public/SearchBar';
import { useState } from 'react';

export default function CheckoutDelivery() {
  const [changeAddressFlow, setChangeAddressFlow] = useState({
    'change-address': {
      title: 'Chang Address',
      active: false,
    },
    'new-address': {
      title: 'New Address',
      active: false,
    },
    'new-address-pinpoint': {
      title: 'New Address',
      active: false,
    },
    'new-address-detail': {
      title: 'New Address',
      active: false,
    },
    'new-address-another-way': {
      title: 'New Address',
      active: false,
    },
  });

  function changingAddressFlow(slug: string, state: boolean) {
    setChangeAddressFlow((prev) => ({
      ...prev,
      [slug]: {
        ...prev[slug as keyof typeof prev],
        active: state,
      },
    }));
  }

  const [shippingMethod, setShippingMethod] = useState('delivery');
  const [expedition, setExpedition] = useState(() => {
    if (shippingMethod == 'delivery') return 'jnt';
    return '';
  });

  return (
    <section className="checkout-content-body" id="checkout-delivery">
      <h2 className="mb-1-05">Shipping Method</h2>
      <label
        htmlFor="shippingMethod-delivery"
        className="card-bordered flex items-center justify-between pointer"
      >
        <div className="flex gap-1 items-center">
          <input
            checked={shippingMethod == 'delivery'}
            type="radio"
            id="shippingMethod-delivery"
            name="shippingMethod"
            onChange={() => {
              setShippingMethod('delivery');
              setExpedition('jnt');
            }}
          />
          <span>Delivery</span>
        </div>
        <p className="highlight semibold">Free</p>
      </label>
      <label
        htmlFor="shippingMethod-inStorePickup"
        className="mt-05 card-bordered flex items-center justify-between pointer"
      >
        <div className="flex gap-1 items-center">
          <input
            checked={shippingMethod == 'inStorePickup'}
            type="radio"
            id="shippingMethod-inStorePickup"
            name="shippingMethod"
            onChange={() => setShippingMethod('inStorePickup')}
          />
          <span>In-store pickup</span>
        </div>
        <p className="highlight semibold">Free</p>
      </label>
      <div className="flex mt-3 mb-1-05 justify-between items-center">
        <h2>Delivery Address</h2>
        <button
          className="highlight semibold"
          onClick={() => {
            changingAddressFlow('change-address', false);
            changingAddressFlow('new-address', true);
          }}
        >
          + New Address
        </button>
      </div>
      <div className="card-bordered mt-1">
        <div className="flex gap-05">
          <div className="highlight">
            <IconLocation width="20" height="20" />
          </div>
          <p className="semibold">Rumah Michelle</p>
        </div>
        <p className="mt-05">
          Sungai Jawi, Kec. Pontianak Kota, Kota Pontianak, Kalimantan Barat , Pontianak Kota, Kota
          Pontianak, Kalimantan Barat, 628983167799
        </p>
        <button
          className="btn btn-actor mt-1"
          onClick={() => changingAddressFlow('change-address', true)}
        >
          Change Address
        </button>
        {/* map */}
        {/* <div style={{
					height: '200px',
					background: 'lightgray'
				}}></div> */}
      </div>

      {shippingMethod == 'delivery' && (
        <>
          <h2 className="mt-3 mb-1-05">Select Expedition</h2>
          <label
            htmlFor="expedition-jnt"
            className="mt-05 card-bordered flex items-center justify-between pointer"
          >
            <div className="flex gap-1 items-center">
              <input
                checked={expedition == 'jnt'}
                onChange={() => setExpedition('jnt')}
                type="radio"
                id="expedition-jnt"
                name="expedition"
              />
              <span>JNT</span>
            </div>
            <p className="highlight semibold">Rp 36.000,00</p>
          </label>
          <label
            htmlFor="expedition-jne"
            className="mt-05 card-bordered flex items-center justify-between pointer"
          >
            <div className="flex gap-1 items-center">
              <input
                type="radio"
                id="expedition-jne"
                name="expedition"
                checked={expedition == 'jne'}
                onChange={() => setExpedition('jne')}
              />
              <span>JNE</span>
            </div>
            <p className="highlight semibold">Rp 42.000,00</p>
          </label>
          <label
            htmlFor="expedition-local"
            className="mt-05 card-bordered flex items-center justify-between pointer"
          >
            <div className="flex gap-1 items-center">
              <input
                type="radio"
                checked={expedition == 'local'}
                onChange={() => setExpedition('local')}
                id="expedition-local"
                name="expedition"
              />
              <span>Local Expedition</span>
            </div>
            <p className="highlight semibold">Rp 30.000,00</p>
          </label>
        </>
      )}

      {changeAddressFlow['change-address'].active && (
        <AppModal title="Change Address" close={() => changingAddressFlow('change-address', false)}>
          <SearchBar placeholder="Find the name of the destination address/city/subdistrict for delivery." />
          <button
            className="btn mt-1 btn-outline w-100"
            onClick={() => {
              changingAddressFlow('change-address', false);
              changingAddressFlow('new-address', true);
            }}
          >
            Add New Address
          </button>

          {/* card container */}
          <div
            style={{
              overflowY: 'auto',
              maxHeight: '400px',
            }}
          >
            <div className="card-bordered active mt-1 flex items-center gap-05">
              <div>
                <div className="flex gap-05">
                  <div className="highlight">
                    <IconLocation width="20" height="20" />
                  </div>
                  <p className="semibold">Rumah Michelle</p>
                </div>
                <p className="mt-05">
                  Sungai Jawi, Kec. Pontianak Kota, Kota Pontianak, Kalimantan Barat , Pontianak
                  Kota, Kota Pontianak, Kalimantan Barat, 628983167799
                </p>
                <button className="btn btn-actor btn-pill mt-1">Change Address</button>
              </div>
              <div>
                <IconCheck width="32" height="32" />
              </div>
            </div>

            <div className="card-bordered mt-1 flex items-center gap-05">
              <div>
                <div className="flex gap-05">
                  <div className="highlight">
                    <IconLocation width="20" height="20" />
                  </div>
                  <p className="semibold">Rumah Michelle</p>
                </div>
                <p className="mt-05">
                  Sungai Jawi, Kec. Pontianak Kota, Kota Pontianak, Kalimantan Barat , Pontianak
                  Kota, Kota Pontianak, Kalimantan Barat, 628983167799
                </p>
                <button className="btn btn-actor btn-pill mt-1">Change Address</button>
              </div>
              <div>
                <button className="btn btn-actor mt-1">Select</button>
              </div>
            </div>
          </div>
        </AppModal>
      )}
      {(changeAddressFlow['new-address'].active ||
        changeAddressFlow['new-address-pinpoint'].active ||
        changeAddressFlow['new-address-detail'].active) && (
        <AppModal
          title="New Address"
          close={() => {
            changingAddressFlow('new-address', false);
            changingAddressFlow('new-address-pinpoint', false);
            changingAddressFlow('new-address-detail', false);
          }}
        >
          <HeaderProgress
            navigations={['Cari Lokasi Pengirimanmu', 'Pinpoint', 'Lengkapi Detail']}
            actives={[
              changeAddressFlow['new-address'].active ||
                changeAddressFlow['new-address-pinpoint'].active ||
                changeAddressFlow['new-address-detail'].active,
              changeAddressFlow['new-address-pinpoint'].active ||
                changeAddressFlow['new-address-detail'].active,
              changeAddressFlow['new-address-detail'].active,
            ]}
          />

          {/* different modal view */}
          {changeAddressFlow['new-address'].active && (
            <>
              <div className="mt-1">
                <SearchBar placeholder="Find the name of the destination address/city/subdistrict for delivery." />
              </div>
              <p className="mt-1">
                Want another way? Fill in the{' '}
                <button
                  className="btn-link highlight bold pointer"
                  onClick={() => {
                    changingAddressFlow('new-address-another-way', true);
                    changingAddressFlow('new-address', false);
                  }}
                >
                  address manually
                </button>{' '}
              </p>
              <button
                className="btn"
                onClick={() => {
                  changingAddressFlow('new-address-pinpoint', true);
                  changingAddressFlow('new-address', false);
                }}
              >
                Next
              </button>
            </>
          )}
          {changeAddressFlow['new-address-pinpoint'].active && (
            <>
              <h2 className="mt-1">Pinpoint your location</h2>
              <div className="carding mt-1">
                <div className="carding-image">
                  <div
                    style={{
                      width: '100%',
                      height: '200px',
                      background: 'lightgray',
                    }}
                  ></div>
                </div>
                <div className="carding-content">
                  <h3>Parit Tokaya</h3>
                  <p>Pontianak Selatan, Kota Pontianak, Kalimantan Barat</p>
                </div>
              </div>
              <button
                className="btn mt-1 w-100"
                onClick={() => {
                  changingAddressFlow('new-address-pinpoint', false);

                  changingAddressFlow('new-address-detail', true);
                }}
              >
                Select location and continue to fill address
              </button>
              <p className="mt-05 text-center">
                Want another way? Fill in the{' '}
                <button
                  className="btn-link highlight bold pointer"
                  onClick={() => {
                    changingAddressFlow('new-address-another-way', true);
                    changingAddressFlow('new-address-pinpoint', false);
                  }}
                >
                  address manually
                </button>{' '}
              </p>
            </>
          )}
          {changeAddressFlow['new-address-detail'].active && (
            <>
              <h2 className="mt-1">Complete the detailed address</h2>
              <div className="input-icon mt-1-05">
                <IconLocation width="24" height="24" className="ml-1" />
                <input
                  type="text"
                  value="Parit Tokaya, Pontianak Selatan, Kota Pontianak,
								Kalimantan Barat"
                  className="tj-input"
                  readOnly={true}
                />
                <div className="pointer highlight bold ml-auto mr-1">Set</div>
              </div>
              <form className="mt-1-05">
                <div className="split-item gap-1">
                  <div className="input-box w-100">
                    <label htmlFor="name">
                      Recipient's name <span className="accent">*</span>
                    </label>
                    <input type="text" id="name" name="name" placeholder="Edwin" />
                  </div>
                  <div className="input-box w-100">
                    <label htmlFor="label">
                      Label <span className="accent">*</span>
                    </label>
                    <input type="text" id="label" name="label" placeholder="Hendly" />
                  </div>
                </div>

                <div className="input-box w-100 mt-1">
                  <label htmlFor="phone">Phone Number (Whatsapp)</label>
                  <div className="flex gap-05">
                    <div className="flag-phone">
                      <div className="flag">
                        <div className="red"></div>
                        <div className="white"></div>
                      </div>
                      <select name="countryPhone" id="countryPhone">
                        <option value="indonesia">+62</option>
                        <option value="malaysia">+60</option>
                        <option value="singapore">+65</option>
                      </select>
                    </div>
                    <input
                      className="w-100"
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="089796245748"
                    />
                  </div>
                </div>

                <div className="input-box w-100 mt-1">
                  <label htmlFor="Address">
                    Address <span className="accent">*</span>
                  </label>
                  <input type="text" id="Address" name="Address" />
                </div>

                <div className="input-box w-100 mt-1">
                  <label htmlFor="Address">
                    Note For Courier <span className="muted italic">(Optional)</span>
                  </label>
                  <input type="text" id="Address" name="Address" />
                </div>

                <label
                  htmlFor="main-address"
                  className="btn-link flex items-center gap-05 mt-1-05"
                  style={{
                    fontSize: '1rem',
                  }}
                >
                  <input
                    type="checkbox"
                    style={{
                      width: '15px',
                      height: '15px',
                    }}
                    id="main-address"
                  />
                  <span
                    style={{
                      color: 'var(--black)',
                    }}
                  >
                    Make it the main address
                  </span>
                </label>

                <button type="button" className="btn w-100 mt-1-05">
                  Save
                </button>
              </form>
            </>
          )}
        </AppModal>
      )}
      {changeAddressFlow['new-address-another-way'].active && (
        <AppModal
          title="New Address"
          close={() => changingAddressFlow('new-address-another-way', false)}
        >
          <h2>Complete the detailed address</h2>
          <form className="mt-1-05">
            <div className="split-item gap-1">
              <div className="input-box w-100">
                <label htmlFor="name">
                  Recipient's name <span className="accent">*</span>
                </label>
                <input type="text" id="name" name="name" className="tj-input" placeholder="Edwin" />
              </div>
              <div className="input-box w-100">
                <label htmlFor="label">
                  Label <span className="accent">*</span>
                </label>
                <input type="text" id="label" name="label" placeholder="Hendly" />
              </div>
            </div>

            <div className="input-box w-100 mt-1">
              <label htmlFor="phone">Phone Number (Whatsapp)</label>
              <div className="flex gap-05">
                <div className="flag-phone">
                  <div className="flag">
                    <div className="red"></div>
                    <div className="white"></div>
                  </div>
                  <select name="countryPhone" id="countryPhone">
                    <option value="indonesia">+62</option>
                    <option value="malaysia">+60</option>
                    <option value="singapore">+65</option>
                  </select>
                </div>
                <input
                  className="w-100"
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="089796245748"
                />
              </div>
            </div>

            <div className="split-item gap-1 mt-1">
              <div className="input-box w-100">
                <label htmlFor="city">
                  City <span className="accent">*</span>
                </label>
                <input type="text" id="city" name="city" />
              </div>
              <div className="input-box w-100">
                <label htmlFor="subdistrict">
                  Subdistrict <span className="accent">*</span>
                </label>
                <input type="text" id="subdistrict" name="subdistrict" />
              </div>
            </div>

            <div className="input-box w-100 mt-1">
              <label htmlFor="Address">
                Address <span className="accent">*</span>
              </label>
              <input type="text" id="Address" name="Address" />
            </div>

            <div className="input-box w-100 mt-1">
              <label htmlFor="Address">
                Note For Courier <span className="muted italic">(Optional)</span>
              </label>
              <input type="text" id="Address" name="Address" />
            </div>

            <div className="input-icon mt-1-05">
              <IconLocation width="24" height="24" className="ml-1" />
              <p
                style={{
                  padding: '.8rem',
                  paddingLeft: '.2rem',
                }}
              >
                You haven't pinpointed yet.{' '}
                <span className="highlight semibold">
                  Set pinpoint <span className="italic">(Optional)</span>
                </span>
              </p>
              <div className="pointer highlight bold ml-auto mr-1">Set</div>
            </div>

            <label
              htmlFor="main-address"
              className="btn-link flex items-center gap-05 mt-1-05"
              style={{
                fontSize: '1rem',
              }}
            >
              <input
                type="checkbox"
                style={{
                  width: '15px',
                  height: '15px',
                }}
                id="main-address"
              />
              <span
                style={{
                  color: 'var(--black)',
                }}
              >
                Make it the main address
              </span>
            </label>

            <button type="button" className="btn w-100 mt-1-05">
              Save
            </button>
          </form>
        </AppModal>
      )}
    </section>
  );
}
