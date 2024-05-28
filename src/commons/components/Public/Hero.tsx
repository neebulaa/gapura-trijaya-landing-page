// import HeroImage from "../assets/images/hero.png";
// import Shape1 from "../assets/images/shapes/shape1.png";
// import Shape2 from "../assets/images/shapes/shape2.png";
// import Shape3 from "../assets/images/shapes/shape3.png";

import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="container" id="hero">
      <section className="hero-content">
        <h1>Cetak Berkualitas</h1>
        <h2>Bersama Trijaya!</h2>
        <p>
          Temukan produk unggulan kami, menawarkan kualitas yang tak tertandingi, harga yang sangat
          kompetitif, dan ketersediaan yang luas untuk kebutuhan Anda.
        </p>
        <button className="btn btn-secondary btn-glow">
          <Link to="/shop">Belanja Sekarang</Link>
        </button>
      </section>
      <section className="hero-image">
        <img
          src="./images/hero.png"
          className="image"
          alt={`${import.meta.env.VITE_APP_NAME} - Hero Image`}
          style={{
            height: '550px',
          }}
        />
        <img
          src="./images/shape1.png"
          className="shape1"
          alt={`${import.meta.env.VITE_APP_NAME} - Custom Shape`}
        />
        <img
          src="./images/shape2.png"
          className="shape2"
          alt={`${import.meta.env.VITE_APP_NAME} - Custom Shape`}
        />
        <img
          src="./images/shape3.png"
          className="shape3"
          alt={`${import.meta.env.VITE_APP_NAME} - Custom Shape`}
        />
      </section>
    </section>
  );
}
