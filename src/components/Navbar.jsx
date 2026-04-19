import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiHome, FiGrid, FiMenu, FiX } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const { cartCount, wishlist } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: '/',         label: 'Home',     icon: <FiHome /> },
    { to: '/products', label: 'Products', icon: <FiGrid /> },
    { to: '/wishlist', label: 'Wishlist', icon: <FiHeart /> },
  ]

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>

        <Link to="/" style={styles.logo}>
          <span style={{ fontSize: 24 }}>🛍</span>
          <span style={styles.logoText}>ShopVibe</span>
        </Link>

        <div style={styles.links}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              style={({ isActive }) => ({
                ...styles.link,
                ...(isActive ? styles.linkActive : {})
              })}>
              {l.icon} {l.label}
            </NavLink>
          ))}
        </div>

        <div style={styles.actions}>
          <Link to="/wishlist" style={styles.iconBtn}>
            <FiHeart size={20} />
            {wishlist.length > 0 && (
              <span style={{ ...styles.badge, background: '#E91E63' }}>
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" style={styles.cartBtn}>
            <FiShoppingCart size={20} />
            <span>Cart</span>
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </Link>
        </div>

        <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div style={styles.mobileMenu}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              style={({ isActive }) => ({
                ...styles.mobileLink,
                ...(isActive ? styles.linkActive : {})
              })}
              onClick={() => setMenuOpen(false)}>
              {l.icon} {l.label}
            </NavLink>
          ))}
          <Link to="/cart" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>
            <FiShoppingCart /> Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
        </div>
      )}
    </nav>
  )
}

const styles = {
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(15,15,26,0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  inner: {
    maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem',
    height: 64, display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', gap: '1rem',
  },
  logo: { display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' },
  logoText: {
    fontFamily: 'Clash Display, sans-serif',
    fontSize: '1.3rem', fontWeight: 700, color: '#F0F0FF',
  },
  links: { display: 'flex', alignItems: 'center', gap: 4 },
  link: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '0.45rem 0.9rem', borderRadius: 8,
    fontSize: '0.9rem', fontWeight: 500, color: '#A0A0C0',
    transition: 'all 0.2s', textDecoration: 'none',
  },
  linkActive: { color: '#FF6B35', background: 'rgba(255,107,53,0.1)' },
  actions: { display: 'flex', alignItems: 'center', gap: 8 },
  iconBtn: {
    position: 'relative', display: 'flex', alignItems: 'center',
    justifyContent: 'center', width: 40, height: 40, borderRadius: 10,
    background: 'rgba(255,255,255,0.05)', color: '#A0A0C0',
    transition: 'all 0.2s', textDecoration: 'none',
  },
  cartBtn: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '0.45rem 1rem', borderRadius: 10,
    background: '#FF6B35', color: 'white',
    fontWeight: 600, fontSize: '0.9rem',
    position: 'relative', textDecoration: 'none', transition: 'all 0.2s',
  },
  badge: {
    position: 'absolute', top: -6, right: -6,
    background: '#FF6B35', color: 'white',
    borderRadius: '50%', width: 18, height: 18,
    fontSize: '0.65rem', fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  hamburger: {
    display: 'none', background: 'transparent',
    color: '#F0F0FF', padding: 4, cursor: 'pointer',
  },
  mobileMenu: {
    display: 'flex', flexDirection: 'column', gap: 4,
    padding: '1rem 1.5rem',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    background: '#0F0F1A',
  },
  mobileLink: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '0.7rem 1rem', borderRadius: 8, color: '#A0A0C0',
    fontWeight: 500, fontSize: '0.95rem', textDecoration: 'none',
  },
}

export default Navbar