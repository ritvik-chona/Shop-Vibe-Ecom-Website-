import { Link } from 'react-router-dom'
import { FiArrowRight, FiShoppingBag, FiStar, FiTruck } from 'react-icons/fi'
import useProducts from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const { products, loading } = useProducts()
  const featured = products.slice(0, 4)

  return (
    <div>
      {/* ── Hero ── */}
      <section style={styles.hero}>
        <div style={styles.heroBg} />
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>✨ New Arrivals 2024</div>
          <h1 style={styles.heroTitle}>
            Shop the <span style={{ color: '#FF6B35' }}>Vibe</span><br />You Deserve
          </h1>
          <p style={styles.heroSub}>
            Discover curated products across electronics, fashion,
            jewelry &amp; more. Handpicked quality, unbeatable prices.
          </p>
          <div style={styles.heroActions}>
            <Link to="/products" className="btn-primary"
              style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
              Shop Now <FiArrowRight />
            </Link>
            <Link to="/wishlist" className="btn-outline"
              style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
              My Wishlist
            </Link>
          </div>
        </div>
        <div style={styles.heroVisual}>
          <div style={styles.heroCard}>
            <span style={{ fontSize: 64 }}>🛍️</span>
            <p style={{ color: '#FF6B35', fontWeight: 700, fontSize: '1.1rem' }}>500+ Products</p>
            <p style={{ color: '#A0A0C0', fontSize: '0.85rem' }}>Across 4 Categories</p>
          </div>
        </div>
      </section>

      {/* ── Features strip ── */}
      <section style={styles.features}>
        {[
          { icon: <FiTruck size={22} />,       title: 'Free Shipping', sub: 'On orders over $50' },
          { icon: <FiStar size={22} />,         title: 'Top Rated',    sub: 'Curated quality picks' },
          { icon: <FiShoppingBag size={22} />,  title: 'Easy Returns', sub: '30-day return policy' },
        ].map((f, i) => (
          <div key={i} style={styles.featureItem}>
            <div style={styles.featureIcon}>{f.icon}</div>
            <div>
              <p style={styles.featureTitle}>{f.title}</p>
              <p style={styles.featureSub}>{f.sub}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Featured Products ── */}
      <section className="page-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 className="section-title" style={{ margin: 0 }}>Featured Products</h2>
          <Link to="/products" className="btn-outline" style={{ fontSize: '0.85rem' }}>
            View All <FiArrowRight size={14} />
          </Link>
        </div>

        {loading
          ? <div className="loading-spinner"><div className="spinner" /></div>
          : <div style={styles.grid}>{featured.map(p => <ProductCard key={p.id} product={p} />)}</div>
        }
      </section>

      {/* ── CTA Banner ── */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>Ready to find your perfect item?</h2>
        <p style={styles.ctaSub}>Browse our full catalog of 500+ products</p>
        <Link to="/products" className="btn-primary"
          style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
          Explore All Products <FiArrowRight />
        </Link>
      </section>
    </div>
  )
}

const styles = {
  hero: {
    position: 'relative', overflow: 'hidden', minHeight: 480,
    display: 'flex', alignItems: 'center',
    padding: '4rem 1.5rem', maxWidth: 1280, margin: '0 auto', gap: '2rem',
  },
  heroBg: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 70% 50%, rgba(255,107,53,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroContent: { flex: 1, position: 'relative', zIndex: 1 },
  heroBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: 'rgba(255,107,53,0.15)', color: '#FF6B35',
    padding: '0.4rem 1rem', borderRadius: 20,
    fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.2rem',
    border: '1px solid rgba(255,107,53,0.3)',
  },
  heroTitle: {
    fontFamily: 'Clash Display, sans-serif',
    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
    fontWeight: 700, lineHeight: 1.15, color: '#F0F0FF', marginBottom: '1rem',
  },
  heroSub: { color: '#A0A0C0', fontSize: '1rem', lineHeight: 1.7, maxWidth: 480, marginBottom: '2rem' },
  heroActions: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  heroVisual: { display: 'flex', justifyContent: 'center' },
  heroCard: {
    background: '#1E1E32', border: '1px solid rgba(255,107,53,0.2)',
    borderRadius: 24, padding: '2rem 3rem',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
    boxShadow: '0 8px 40px rgba(255,107,53,0.1)',
  },
  features: {
    display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
    background: '#1A1A2E',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  featureItem: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '1.2rem 2.5rem',
    borderRight: '1px solid rgba(255,255,255,0.06)',
  },
  featureIcon: {
    width: 44, height: 44, borderRadius: 12,
    background: 'rgba(255,107,53,0.12)', color: '#FF6B35',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  featureTitle: { fontWeight: 600, fontSize: '0.9rem', color: '#F0F0FF' },
  featureSub:   { fontSize: '0.78rem', color: '#606080', marginTop: 2 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' },
  cta: {
    margin: '3rem auto', maxWidth: 1280,
    background: 'linear-gradient(135deg, rgba(255,107,53,0.2) 0%, rgba(255,107,53,0.05) 100%)',
    border: '1px solid rgba(255,107,53,0.2)',
    borderRadius: 24, padding: '3rem', textAlign: 'center',
  },
  ctaTitle: {
    fontFamily: 'Clash Display, sans-serif',
    fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700,
    color: '#F0F0FF', marginBottom: '0.5rem',
  },
  ctaSub: { color: '#A0A0C0', marginBottom: '1.5rem' },
}

export default Home