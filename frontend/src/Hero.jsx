import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-vignette" />

      <div className="hero-stage">
        <div className="turntable-ring" />
        <div className="turntable-glow" />

        <div className="car-wrap">
          <svg className="car-svg" viewBox="0 0 300 110" xmlns="http://www.w3.org/2000/svg">
  <path
    className="car-body"
    d="M25,85 C25,80 26,74 32,70 C50,58 68,46 95,38 C108,30 122,26 145,25 L185,25 C205,26 220,32 232,42 C248,50 260,58 267,68 C271,73 272,78 272,83 L272,85 L248,85 A20,20 0 0,1 208,85 L108,85 A20,20 0 0,1 68,85 Z"
  />
  <line className="car-glint" x1="60" y1="45" x2="200" y2="45" />
  <line className="windshield-line" x1="100" y1="38" x2="108" y2="26" />
  <circle className="wheel" cx="88" cy="85" r="13" />
  <circle className="wheel-hub" cx="88" cy="85" r="5" />
  <circle className="wheel" cx="228" cy="85" r="13" />
  <circle className="wheel-hub" cx="228" cy="85" r="5" />
  <circle className="headlight" cx="266" cy="70" r="2.5" />
</svg>
        </div>

        <div className="turntable-base" />
      </div>

      <div className="hero-sweep" />

      <div className="hero-content">
        <span className="eyebrow">Private Seller Appraisal</span>
        <h1>Car Price Estimator</h1>
        <p className="subtitle">
          Enter your vehicle's details for an instant, data-driven valuation.
        </p>
        <a href="#appraisal" className="scroll-cta">
          Begin Appraisal <span className="arrow">↓</span>
        </a>
      </div>
    </section>
  );
}

export default Hero;