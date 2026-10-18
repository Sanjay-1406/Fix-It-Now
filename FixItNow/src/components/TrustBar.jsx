import './TrustBar.css';

const brands = ['TechCrunch', 'Forbes', 'YourStory', 'Mint', 'Economic Times', 'Business Insider'];

function TrustBar() {
  return (
    <section className="trustbar">
      <p className="trustbar__label">Trusted by teams & featured in</p>
      <div className="trustbar__viewport">
        <div className="trustbar__track">
          {[...brands, ...brands].map((b, i) => (
            <span key={i} className="trustbar__item">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustBar;