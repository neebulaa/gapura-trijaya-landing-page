import Hero from '@/commons/components/Public/Hero';
import Products from '@/pages/Home/components/Products';
import Promos from '@/pages/Home/components/Promos.tsx';

export default function Home() {
  return (
    <>
      <Hero />
      {/* BENEFITS SECTION  */}
      <section className="fill-container" id="benefits-bg">
        <section className="container" id="benefits">
          <div className="benefit first-benefit">
            <h2>Proses Order Sangat Mudah</h2>
            <p>Pilih produk, konfirmasi, pembayaran, barang siap dikirim</p>
          </div>
          <div className="benefit second-benefit">
            <h2>Pengiriman ke seluruh Indonesia</h2>
            <p>Pengiriman ke seluruh daerah indonesia, tanpa terkecuali</p>
          </div>
        </section>
        {/* image pattern */}
        <img
          src={`${import.meta.env.VITE_APP_URL}./images/pattern-left.png`}
          alt={`${import.meta.env.VITE_APP_NAME} - Pattern Left `}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
        <img
          src={`${import.meta.env.VITE_APP_URL}./images/pattern-left.png`}
          alt={`${import.meta.env.VITE_APP_NAME} - Pattern Left `}
          style={{
            position: 'absolute',
            top: '225px',
            left: 0,
          }}
        />
        <img
          src={`${import.meta.env.VITE_APP_URL}./images/pattern-left.png`}
          alt={`${import.meta.env.VITE_APP_NAME} - Pattern Left `}
          style={{
            position: 'absolute',
            top: '450px',
            left: 0,
          }}
        />
        <img
          src={`${import.meta.env.VITE_APP_URL}./images/reverse-stamp.png`}
          alt={`${import.meta.env.VITE_APP_NAME} - Reverse Stamp Icon`}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            translate: '-50% -50%',
          }}
        />
        <img
          src={`${import.meta.env.VITE_APP_URL}./images/pattern-right.png`}
          alt={`${import.meta.env.VITE_APP_NAME} - Pattern Right`}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        />
        <img
          src={`${import.meta.env.VITE_APP_URL}./images/pattern-right.png`}
          alt={`${import.meta.env.VITE_APP_NAME} - Pattern Right`}
          style={{
            position: 'absolute',
            top: '225px',
            right: 0,
          }}
        />
        <img
          src={`${import.meta.env.VITE_APP_URL}./images/pattern-right.png`}
          alt={`${import.meta.env.VITE_APP_NAME} - Pattern Right`}
          style={{
            position: 'absolute',
            top: '450px',
            right: 0,
          }}
        />
      </section>
      {/* ./BENEFITS SECTION  */}
      <Products />
      {/* PROMOS SECTION */}
      <Promos />
      {/* ABOUT SECTION */}
      <section
        className="container"
        id="about"
        style={{
          marginTop: '2rem',
        }}
      >
        <section className="about-thumb">
          <img src="./images/about1.png" alt={`${import.meta.env.VITE_APP_NAME} - About`} />
          <img src="./images/about2.png" alt={`${import.meta.env.VITE_APP_NAME} - About`} />
        </section>

        <section className="about-content">
          <h2>Cetak Cepat, Berkualitas, dan Terjangkau</h2>
          <p>
            Percetakan Online Kami adalah solusi terbaik untuk semua kebutuhan cetak Anda. Dengan
            teknologi cetak terkini, kami menjamin hasil cetak berkualitas tinggi dengan harga yang
            terjangkau.
          </p>
        </section>
      </section>
      {/* ./ABOUT SECTION */}
    </>
  );
}
