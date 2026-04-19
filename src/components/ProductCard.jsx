import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { formatPrice, truncate, getCategoryStyle } from '../utils/helpers'

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useCart()
  const catStyle = getCategoryStyle(product.category)
  const inWish   = isInWishlist(product.id)
  const inCart   = isInCart(product.id)

  return (
    <div style={styles.card} className="fade-in">

      <div style={styles.imageWrap}>
        <Link to={`/products/${product.id}`}>
          <img src={product.image} alt={product.title} style={styles.img} loading="lazy" />
        </Link>
        <button
          onClick={() => toggleWishlist(product)}
          style={{ ...styles.wishBtn, ...(inWish ? styles.wishActive : {}) }}>
          <FiHeart size={16} fill={inWish ? 'currentColor' : 'none'} />
        </button>
        <div style={{ ...styles.catBadge, background: catStyle.bg, color: catStyle.color }}>
          {product.category}
        </div>
      </div>

      <div style={styles.body}>
        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
          <p style={styles.title}>{truncate(product.title, 52)}</p>
        </Link>

        <div style={styles.rating}>
          <FiStar size={13} fill="#FFB300" stroke="#FFB300" />
          <span style={styles.ratingText}>{product.rating?.rate}</span>
          <span style={styles.ratingCount}>({product.rating?.count})</span>
        </div>

        <div style={styles.footer}>
          <span style={styles.price}>{formatPrice(product.price)}</span>
          <button
            onClick={() => addToCart(product)}
            style={{ ...styles.cartBtn, ...(inCart ? styles.cartBtnAdded : {}) }}>
            <FiShoppingCart size={14} />
            {inCart ? 'Added' : 'Add'}
          </button>
        </div>
      </div>

    </div>
  )
}

const styles = {
  card: {
    background: '#1E1E32',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 16, overflow: 'hidden',
    transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
    display: 'flex', flexDirection: 'column',
  },
  imageWrap: {
    position: 'relative', background: '#fff',
    height: 200, display: 'flex',
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  img: {
    width: '100%', height: 200, objectFit: 'contain',
    padding: '1rem', transition: 'transform 0.3s ease',
  },
  wishBtn: {
    position: 'absolute', top: 10, right: 10,
    width: 32, height: 32, borderRadius: '50%',
    background: 'rgba(15,15,26,0.8)', border: 'none',
    color: '#A0A0C0', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s',
  },
  wishActive: { color: '#E91E63', background: 'rgba(233,30,99,0.15)' },
  catBadge: {
    position: 'absolute', bottom: 10, left: 10,
    padding: '3px 10px', borderRadius: 20,
    fontSize: '0.68rem', fontWeight: 600,
    textTransform: 'capitalize', letterSpacing: '0.03em',
  },
  body: { padding: '1rem', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 },
  title: {
    fontSize: '0.88rem', fontWeight: 500,
    color: '#F0F0FF', lineHeight: 1.5, minHeight: '2.6em',
  },
  rating: { display: 'flex', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: '0.82rem', fontWeight: 600, color: '#FFB300' },
  ratingCount: { fontSize: '0.75rem', color: '#606080' },
  footer: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', marginTop: 'auto',
  },
  price: { fontSize: '1.1rem', fontWeight: 700, color: '#FF6B35' },
  cartBtn: {
    display: 'flex', alignItems: 'center', gap: 5,
    padding: '0.4rem 0.9rem', borderRadius: 8,
    background: '#FF6B35', color: 'white',
    fontWeight: 600, fontSize: '0.8rem',
    border: 'none', cursor: 'pointer', transition: 'all 0.2s',
  },
  cartBtnAdded: { background: '#4CAF50' },
}

export default ProductCard