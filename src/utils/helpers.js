export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)

export const truncate = (str, n = 60) =>
  str?.length > n ? str.slice(0, n) + '...' : str

export const getDiscountedPrice = (price, pct = 10) =>
  (price * (1 - pct / 100)).toFixed(2)

export const getRatingColor = (r) =>
  r >= 4 ? '#4CAF50' : r >= 3 ? '#FFB300' : '#F44336'

export const categoryColors = {
  "electronics":    { bg: 'rgba(33,150,243,0.15)',  color: '#2196F3' },
  "jewelery":       { bg: 'rgba(255,193,7,0.15)',   color: '#FFC107' },
  "men's clothing": { bg: 'rgba(76,175,80,0.15)',   color: '#4CAF50' },
  "women's clothing":{ bg: 'rgba(233,30,99,0.15)',  color: '#E91E63' },
}

export const getCategoryStyle = (cat) =>
  categoryColors[cat] || { bg: 'rgba(255,107,53,0.15)', color: '#FF6B35' }