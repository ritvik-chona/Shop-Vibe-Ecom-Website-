import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiCheck, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/helpers'
import { toast } from 'react-toastify'

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate  = useNavigate()
  const [placed,  setPlaced]  = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', card: ''
  })

  const tax   = cartTotal * 0.08
  const total = cartTotal + tax

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.address || !form.card) {
      toast.error('Please fill all fields')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setPlaced(true)
      clearCart()
    }, 1500)
  }

  if (cartItems.length === 0 && !placed) return (
    <div className="page-container" style={{ textAlign: 'center', padding: '4rem' }}>
      <p style={{ color: '#A0A0C0', fontSize: '1.1rem' }}>No items in cart.</p>
      <Link to="/products" className="btn-primary"
        style={{ marginTop: '1rem', display: 'inline-flex' }}>Shop Now</Link>
    </div>
  )

  if (placed) return (
    <div className="page-container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <div style={styles.successIcon}><FiCheck size={40} /></div>
      <h1 style={{ ...styles.title, marginTop: '1.5rem', marginBottom: '0.5rem' }}>Order Placed!</h1>
      <p style={{ color: '#A0A0C0', marginBottom: '2rem' }}>
        Thank you, {form.name}! Your order has been confirmed and will be shipped soon.
      </p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  )

  return (
    <div className="page-container">
      <h1 style={styles.title}>Checkout</h1>

      <div style={styles.layout}>

        {/* Form */}
        <div style={styles.form}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Delivery Information</h2>
            {[
              { name: 'name',    placeholder: 'Full Name',        type: 'text'  },
              { name: 'email',   placeholder: 'Email Address',    type: 'email' },
              { name: 'address', placeholder: 'Street Address',   type: 'text'  },
              { name: 'city',    placeholder: 'City, State, ZIP', type: 'text'  },
            ].map(f => (
              <input key={f.name}
                name={f.name} type={f.type}
                placeholder={f.placeholder}
                value={form[f.name]}
                onChange={handleChange}
                style={styles.input} />
            ))}
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Payment</h2>
            <input name="card" type="text"
              placeholder="Card Number (16 digits)"
              value={form.card} onChange={handleChange}
              maxLength={16} style={styles.input} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input type="text" placeholder="MM/YY"  style={styles.input} />
              <input type="text" placeholder="CVV"    style={styles.input} maxLength={3} />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div style={styles.summary}>
          <h2 style={styles.sectionTitle}>Order Summary</h2>

          {cartItems.map(item => (
            <div key={item.id} style={styles.summaryItem}>
              <img src={item.image} alt={item.title} style={styles.summaryImg} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.82rem', color: '#F0F0FF' }}>
                  {item.title.slice(0, 36)}...
                </p>
                <p style={{ fontSize: '0.75rem', color: '#606080' }}>Qty: {item.quantity}</p>
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FF6B35' }}>
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}

          <div style={styles.divider} />

          {[
            ['Subtotal', formatPrice(cartTotal)],
            ['Shipping', 'Free'],
            ['Tax (8%)', formatPrice(tax)],
          ].map(([k, v]) => (
            <div key={k} style={styles.row}>
              <span style={{ color: '#A0A0C0' }}>{k}</span>
              <span style={{ color: k === 'Shipping' ? '#4CAF50' : '#F0F0FF' }}>{v}</span>
            </div>
          ))}

          <div style={{ ...styles.row, ...styles.totalRow }}>
            <span>Total</span>
            <span style={{ color: '#FF6B35', fontSize: '1.2rem' }}>{formatPrice(total)}</span>
          </div>

          <button onClick={handleSubmit} disabled={loading}
            style={{ ...styles.placeBtn, ...(loading ? { opacity: 0.7 } : {}) }}>
            <FiShoppingBag size={18} />
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>

      </div>
    </div>
  )
}

const styles = {
  title: {
    fontFamily: 'Clash Display, sans-serif',
    fontSize: '1.8rem', fontWeight: 700, color: '#F0F0FF', marginBottom: '1.5rem',
  },
  layout:  { display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem', alignItems: 'start' },
  form:    { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  section: {
    background: '#1E1E32', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 16, padding: '1.5rem',
    display: 'flex', flexDirection: 'column', gap: 12,
  },
  sectionTitle: {
    fontFamily: 'Clash Display, sans-serif',
    fontSize: '1rem', fontWeight: 600, marginBottom: 4, color: '#F0F0FF',
  },
  input: {
    width: '100%', padding: '0.7rem 1rem', borderRadius: 10,
    background: '#252540', border: '1px solid rgba(255,255,255,0.1)',
    color: '#F0F0FF', fontSize: '0.9rem',
  },
  summary: {
    background: '#1E1E32', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20, padding: '1.5rem', position: 'sticky', top: 80,
  },
  summaryItem: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 },
  summaryImg:  {
    width: 44, height: 44, objectFit: 'contain',
    background: '#fff', borderRadius: 8, padding: 4,
  },
  divider:  { height: 1, background: 'rgba(255,255,255,0.07)', margin: '1rem 0' },
  row:      { display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.7rem' },
  totalRow: { fontSize: '1rem', fontWeight: 700, color: '#F0F0FF', marginTop: '0.3rem' },
  placeBtn: {
    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    padding: '0.9rem', marginTop: '1rem', borderRadius: 12,
    background: '#FF6B35', color: 'white', fontWeight: 700,
    fontSize: '0.95rem', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
  },
  successIcon: {
    width: 80, height: 80, borderRadius: '50%',
    background: 'rgba(76,175,80,0.15)', border: '2px solid #4CAF50',
    color: '#4CAF50', display: 'flex', alignItems: 'center',
    justifyContent: 'center', margin: '0 auto',
  },
}

export default Checkout