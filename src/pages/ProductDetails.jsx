import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiStar, FiShoppingCart, FiHeart, FiArrowLeft, FiCheck } from 'react-icons/fi'
import { fetchProductById } from '../services/api'
import { useCart } from '../context/CartContext'
import { formatPrice, getCategoryStyle } from '../utils/helpers'

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useCart()

  useEffect(() => {
    setLoading(true)
    fetchProductById(id).then(r => {
      setProduct(r.data)
      setLoading(false)
    })
  }, [id])

  if (loading)   return <div className="loading-spinner"><div className="spinner" /></div>
  if (!product)  return <div style={{ textAlign: 'center', padding: '4rem', color: '#A0A0C0' }}>Product not found.</div>

  const catStyle = getCategoryStyle(product.category)
  const inWish   = isInWishlist(product.id)
  const inCart   = isInCart(product.id)

  return (
    <div className="page-container">
      <Link to="/products" style={styles.back}>
        <FiArrowLeft size={16} /> Back to Products
      </Link>

      <div style={styles.layout}>

        {/* Image panel */}
        <div style={styles.imgWrap}>
          <img src={product.image} alt={product.title} style={styles.img} />
          <div style={{ ...styles.catBadge, background: catStyle.bg, color: catStyle.color }}>
            {product.category}
          </div>
        </div>

        {/* Info panel */}
        <div style={styles.info}>
          <h1 style={styles.title}>{product.title}</h1>

          <div style={styles.ratingRow}>
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} size={16}
                fill={i < Math.round(product.rating?.rate) ? '#FFB300' : 'none'}
                stroke="#FFB300" />
            ))}
            <span style={styles.ratingText}>{product.rating?.rate}</span>
            <span style={styles.ratingCount}>· {product.rating?.count} reviews</span>
          </div>

          <div style={styles.priceRow}>
            <span style={styles.price}>{formatPrice(product.price)}</span>
            <span style={styles.originalPrice}>{formatPrice(product.price * 1.15)}</span>
            <span style={styles.discount}>15% OFF</span>
          </div>

          <p style={styles.desc}>{product.description}</p>

          <div style={styles.divider} />

          <div style={styles.actions}>
            <button onClick={() => addToCart(product)}
              style={{ ...styles.cartBtn, ...(inCart ? styles.cartBtnAdded : {}) }}>
              {inCart ? <FiCheck size={18} /> : <FiShoppingCart size={18} />}
              {inCart ? 'Added to Cart' : 'Add to Cart'}
            </button>
            <button onClick={() => toggleWishlist(product)}
              style={{ ...styles.wishBtn, ...(inWish ? styles.wishActive : {}) }}>
              <FiHeart size={18} fill={inWish ? 'currentColor' : 'none'} />
              {inWish ? 'Saved' : 'Wishlist'}
            </button>
          </div>

          <Link to="/cart" style={styles.checkoutLink}>Proceed to Checkout →</Link>

          <div style={styles.meta}>
            {[
              { label: 'Category', value: product.category },
              { label: 'Rating',   value: `${product.rating?.rate} / 5` },
              { label: 'Reviews',  value: product.rating?.count },
              { label: 'Price',    value: formatPrice(product.price) },
            ].map(m => (
              <div key={m.label} style={styles.metaItem}>
                <span style={styles.metaLabel}>{m.label}</span>
                <span style={styles.metaValue}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

const styles = {
  back: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    color: '#A0A0C0', fontSize: '0.88rem',
    marginBottom: '1.5rem', textDecoration: 'none',
  },
  layout: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' },
  imgWrap: {
    background: '#fff', borderRadius: 20, padding: '2rem',
    position: 'relative', display: 'flex',
    alignItems: 'center', justifyContent: 'center', minHeight: 360,
  },
  img:      { maxWidth: '100%', maxHeight: 320, objectFit: 'contain' },
  catBadge: {
    position: 'absolute', bottom: 16, left: 16,
    padding: '4px 12px', borderRadius: 20,
    fontSize: '0.72rem', fontWeight: 700, textTransform: 'capitalize',
  },
  info:         { display: 'flex', flexDirection: 'column', gap: '1rem' },
  title:        { fontFamily: 'Clash Display, sans-serif', fontSize: '1.6rem', fontWeight: 700, color: '#F0F0FF', lineHeight: 1.3 },
  ratingRow:    { display: 'flex', alignItems: 'center', gap: 4 },
  ratingText:   { fontWeight: 600, color: '#FFB300', fontSize: '0.9rem', marginLeft: 4 },
  ratingCount:  { color: '#606080', fontSize: '0.85rem' },
  priceRow:     { display: 'flex', alignItems: 'center', gap: 10 },
  price:        { fontSize: '2rem', fontWeight: 700, color: '#FF6B35' },
  originalPrice:{ fontSize: '1rem', color: '#606080', textDecoration: 'line-through' },
  discount:     { background: 'rgba(76,175,80,0.15)', color: '#4CAF50', padding: '3px 10px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700 },
  desc:         { color: '#A0A0C0', fontSize: '0.92rem', lineHeight: 1.8 },
  divider:      { height: 1, background: 'rgba(255,255,255,0.07)' },
  actions:      { display: 'flex', gap: 12 },
  cartBtn: {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    padding: '0.85rem', borderRadius: 12, background: '#FF6B35',
    color: 'white', fontWeight: 700, fontSize: '0.95rem',
    border: 'none', cursor: 'pointer', transition: 'all 0.2s',
  },
  cartBtnAdded: { background: '#4CAF50' },
  wishBtn: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '0.85rem 1.4rem', borderRadius: 12,
    background: 'transparent', border: '1px solid rgba(255,255,255,0.12)',
    color: '#A0A0C0', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
  },
  wishActive:    { color: '#E91E63', borderColor: '#E91E63', background: 'rgba(233,30,99,0.08)' },
  checkoutLink:  { textAlign: 'center', color: '#FF6B35', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' },
  meta: {
    background: '#1A1A2E', borderRadius: 12, padding: '1rem',
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
  },
  metaItem:  { display: 'flex', flexDirection: 'column', gap: 2, padding: '0.5rem 0.75rem' },
  metaLabel: { fontSize: '0.72rem', color: '#606080', textTransform: 'uppercase', letterSpacing: '0.05em' },
  metaValue: { fontSize: '0.9rem', fontWeight: 600, color: '#F0F0FF', textTransform: 'capitalize' },
}

export default ProductDetails