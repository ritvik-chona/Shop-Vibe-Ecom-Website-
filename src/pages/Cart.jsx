import { Link } from 'react-router-dom'
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/helpers'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart()

  if (cartItems.length === 0) return (
    <div className="page-container">
      <h1 style={styles.pageTitle}>Shopping Cart</h1>
      <div className="empty-state">
        <div style={{ fontSize: 64, marginBottom: 12 }}>🛒</div>
        <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#A0A0C0' }}>Your cart is empty</p>
        <p style={{ color: '#606080', marginBottom: '1.5rem' }}>Add some products to get started</p>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    </div>
  )

  const tax   = cartTotal * 0.08
  const total = cartTotal + tax

  return (
    <div className="page-container">
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Shopping Cart</h1>
        <button onClick={clearCart} style={styles.clearBtn}>
          <FiTrash2 size={14} /> Clear All
        </button>
      </div>

      <div style={styles.layout}>

        {/* Cart items */}
        <div style={styles.items}>
          {cartItems.map(item => (
            <div key={item.id} style={styles.item} className="fade-in">
              <div style={styles.imgWrap}>
                <img src={item.image} alt={item.title} style={styles.img} />
              </div>
              <div style={styles.itemInfo}>
                <p style={styles.itemTitle}>{item.title}</p>
                <p style={styles.itemCategory}>{item.category}</p>
                <p style={styles.itemPrice}>{formatPrice(item.price)}</p>
              </div>
              <div style={styles.itemActions}>
                <div style={styles.qtyControl}>
                  <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <FiMinus size={12} />
                  </button>
                  <span style={styles.qty}>{item.quantity}</span>
                  <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <FiPlus size={12} />
                  </button>
                </div>
                <p style={styles.itemTotal}>{formatPrice(item.price * item.quantity)}</p>
                <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                  <FiTrash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div style={styles.summary}>
          <h2 style={styles.summaryTitle}>Order Summary</h2>
          <div style={styles.summaryRow}>
            <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Shipping</span>
            <span style={{ color: '#4CAF50' }}>Free</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Tax (8%)</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <div style={styles.divider} />
          <div style={{ ...styles.summaryRow, ...styles.totalRow }}>
            <span>Total</span>
            <span style={{ color: '#FF6B35' }}>{formatPrice(total)}</span>
          </div>
          <Link to="/checkout" className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '0.9rem' }}>
            <FiShoppingBag size={18} /> Proceed to Checkout
          </Link>
          <Link to="/products" style={styles.continueShopping}>← Continue Shopping</Link>
        </div>

      </div>
    </div>
  )
}

const styles = {
  pageTitle:   { fontFamily: 'Clash Display, sans-serif', fontSize: '1.8rem', fontWeight: 700, color: '#F0F0FF' },
  header:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
  clearBtn: {
    display: 'flex', alignItems: 'center', gap: 6,
    background: 'transparent', border: '1px solid rgba(244,67,54,0.3)',
    color: '#F44336', padding: '0.45rem 1rem', borderRadius: 8,
    fontSize: '0.85rem', cursor: 'pointer',
  },
  layout: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' },
  items:  { display: 'flex', flexDirection: 'column', gap: '1rem' },
  item: {
    display: 'flex', gap: '1rem', alignItems: 'center',
    background: '#1E1E32', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 16, padding: '1rem',
  },
  imgWrap: {
    width: 80, height: 80, background: '#fff', borderRadius: 12,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  img:          { width: 70, height: 70, objectFit: 'contain', padding: 4 },
  itemInfo:     { flex: 1 },
  itemTitle:    { fontSize: '0.88rem', fontWeight: 500, color: '#F0F0FF', lineHeight: 1.4 },
  itemCategory: { fontSize: '0.75rem', color: '#606080', textTransform: 'capitalize', marginTop: 4 },
  itemPrice:    { fontSize: '0.9rem', color: '#FF6B35', fontWeight: 600, marginTop: 4 },
  itemActions:  { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 },
  qtyControl: {
    display: 'flex', alignItems: 'center',
    background: '#252540', borderRadius: 8, overflow: 'hidden',
  },
  qtyBtn: {
    width: 30, height: 30, background: 'transparent', border: 'none',
    color: '#A0A0C0', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  qty:       { width: 32, textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: '#F0F0FF' },
  itemTotal: { fontSize: '1rem', fontWeight: 700, color: '#F0F0FF' },
  removeBtn: {
    background: 'transparent', border: 'none',
    color: '#606080', cursor: 'pointer', padding: 4, transition: 'color 0.2s',
  },
  summary: {
    background: '#1E1E32', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20, padding: '1.5rem', position: 'sticky', top: 80,
  },
  summaryTitle: { fontFamily: 'Clash Display, sans-serif', fontSize: '1.1rem', marginBottom: '1.2rem' },
  summaryRow: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: '0.88rem', color: '#A0A0C0', marginBottom: '0.8rem',
  },
  totalRow: { fontSize: '1rem', fontWeight: 700, color: '#F0F0FF', marginBottom: 0 },
  divider:  { height: 1, background: 'rgba(255,255,255,0.07)', margin: '1rem 0' },
  continueShopping: {
    display: 'block', textAlign: 'center',
    color: '#606080', fontSize: '0.85rem', marginTop: '0.75rem', textDecoration: 'none',
  },
}

export default Cart