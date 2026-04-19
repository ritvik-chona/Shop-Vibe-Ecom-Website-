import { Link } from 'react-router-dom'
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { formatPrice, truncate, getCategoryStyle } from '../utils/helpers'

const WishList = () => {
  const { wishlist, toggleWishlist, addToCart, isInCart } = useCart()

  if (wishlist.length === 0) return (
    <div className="page-container">
      <h1 style={styles.pageTitle}>My Wishlist</h1>
      <div className="empty-state">
        <div style={{ fontSize: 64, marginBottom: 12 }}>💝</div>
        <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#A0A0C0' }}>Your wishlist is empty</p>
        <p style={{ color: '#606080', marginBottom: '1.5rem' }}>Save products you love for later</p>
        <Link to="/products" className="btn-primary">Discover Products</Link>
      </div>
    </div>
  )

  return (
    <div className="page-container">
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>My Wishlist</h1>
        <p style={{ color: '#606080', fontSize: '0.88rem', marginTop: 4 }}>
          {wishlist.length} saved items
        </p>
      </div>

      <div style={styles.grid}>
        {wishlist.map(item => {
          const catStyle = getCategoryStyle(item.category)
          const inCart   = isInCart(item.id)
          return (
            <div key={item.id} style={styles.card} className="fade-in">
              <div style={styles.imgWrap}>
                <Link to={`/products/${item.id}`}>
                  <img src={item.image} alt={item.title} style={styles.img} />
                </Link>
                <div style={{ ...styles.catBadge, background: catStyle.bg, color: catStyle.color }}>
                  {item.category}
                </div>
              </div>
              <div style={styles.body}>
                <Link to={`/products/${item.id}`} style={{ textDecoration: 'none' }}>
                  <p style={styles.title}>{truncate(item.title, 52)}</p>
                </Link>
                <p style={styles.price}>{formatPrice(item.price)}</p>
                <div style={styles.actions}>
                  <button
                    onClick={() => addToCart(item)}
                    style={{ ...styles.cartBtn, ...(inCart ? styles.cartBtnAdded : {}) }}>
                    <FiShoppingCart size={14} />
                    {inCart ? 'In Cart' : 'Add to Cart'}
                  </button>
                  <button onClick={() => toggleWishlist(item)} style={styles.removeBtn}>
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const styles = {
  pageTitle: { fontFamily: 'Clash Display, sans-serif', fontSize: '1.8rem', fontWeight: 700, color: '#F0F0FF' },
  header:    { marginBottom: '1.5rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' },
  card: {
    background: '#1E1E32', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 16, overflow: 'hidden', transition: 'all 0.25s',
  },
  imgWrap: {
    position: 'relative', background: '#fff',
    height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  img: { width: '100%', height: 200, objectFit: 'contain', padding: '1rem' },
  catBadge: {
    position: 'absolute', bottom: 10, left: 10,
    padding: '3px 10px', borderRadius: 20,
    fontSize: '0.68rem', fontWeight: 600, textTransform: 'capitalize',
  },
  body:  { padding: '1rem', display: 'flex', flexDirection: 'column', gap: 8 },
  title: { fontSize: '0.88rem', fontWeight: 500, color: '#F0F0FF', lineHeight: 1.5 },
  price: { fontSize: '1.1rem', fontWeight: 700, color: '#FF6B35' },
  actions: { display: 'flex', gap: 8, marginTop: 4 },
  cartBtn: {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    padding: '0.5rem', borderRadius: 8, background: '#FF6B35',
    color: 'white', fontWeight: 600, fontSize: '0.82rem',
    border: 'none', cursor: 'pointer', transition: 'all 0.2s',
  },
  cartBtnAdded: { background: '#4CAF50' },
  removeBtn: {
    width: 36, height: 36, borderRadius: 8,
    background: 'rgba(244,67,54,0.1)', border: '1px solid rgba(244,67,54,0.2)',
    color: '#F44336', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
  },
}

export default WishList