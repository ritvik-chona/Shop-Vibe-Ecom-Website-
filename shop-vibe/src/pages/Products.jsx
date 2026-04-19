import { useState, useMemo } from 'react'
import useProducts  from '../hooks/useProducts'
import useDebounce  from '../hooks/useDebounce'
import ProductCard  from '../components/ProductCard'
import SearchBar    from '../components/SearchBar'
import Filters      from '../components/Filters'

const Products = () => {
  const { products, categories, loading, error } = useProducts()
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy,   setSortBy]   = useState('default')
  const debouncedSearch = useDebounce(search, 400)

  const filtered = useMemo(() => {
    let list = [...products]

    if (category !== 'all')
      list = list.filter(p => p.category === category)

    if (debouncedSearch.trim())
      list = list.filter(p =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(debouncedSearch.toLowerCase())
      )

    if      (sortBy === 'price-asc')  list.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sortBy === 'rating')     list.sort((a, b) => b.rating.rate - a.rating.rate)
    else if (sortBy === 'name')       list.sort((a, b) => a.title.localeCompare(b.title))

    return list
  }, [products, category, debouncedSearch, sortBy])

  return (
    <div className="page-container">
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>All Products</h1>
          <p style={styles.subtitle}>{filtered.length} products found</p>
        </div>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <Filters
        categories={categories}
        selected={category}
        onSelect={setCategory}
        sortBy={sortBy}
        onSort={setSortBy}
      />

      {loading && <div className="loading-spinner"><div className="spinner" /></div>}

      {error && (
        <div style={styles.error}><p>⚠️ {error}</p></div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="empty-state">
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#A0A0C0' }}>No products found</p>
          <p style={{ color: '#606080', marginTop: 6 }}>Try a different search or category</p>
        </div>
      )}

      {!loading && (
        <div style={styles.grid}>
          {filtered.map((p, i) => (
            <div key={p.id} style={{ animationDelay: `${i * 0.04}s` }} className="fade-in">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  header: {
    display: 'flex', alignItems: 'flex-start',
    justifyContent: 'space-between', flexWrap: 'wrap',
    gap: 16, marginBottom: '0.5rem',
  },
  title:    { fontFamily: 'Clash Display, sans-serif', fontSize: '1.8rem', fontWeight: 700, color: '#F0F0FF' },
  subtitle: { color: '#606080', fontSize: '0.88rem', marginTop: 4 },
  grid:  { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' },
  error: {
    background: 'rgba(244,67,54,0.1)', border: '1px solid rgba(244,67,54,0.3)',
    borderRadius: 12, padding: '1rem 1.5rem', color: '#F44336',
  },
}

export default Products