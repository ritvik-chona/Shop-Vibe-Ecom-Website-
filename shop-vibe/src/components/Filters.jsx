import { getCategoryStyle } from '../utils/helpers'

const Filters = ({ categories, selected, onSelect, sortBy, onSort }) => (
  <div style={styles.wrap}>
    <div style={styles.cats}>
      {categories.map(cat => {
        const active = selected === cat
        const style  = cat !== 'all' ? getCategoryStyle(cat) : null
        return (
          <button key={cat} onClick={() => onSelect(cat)}
            style={{
              ...styles.catBtn,
              ...(active ? {
                background:  style ? style.bg    : 'rgba(255,107,53,0.15)',
                color:       style ? style.color : '#FF6B35',
                borderColor: style ? style.color : '#FF6B35',
              } : {})
            }}>
            {cat === 'all' ? 'All Products' : cat}
          </button>
        )
      })}
    </div>

    <select value={sortBy} onChange={e => onSort(e.target.value)} style={styles.select}>
      <option value="default">Sort: Default</option>
      <option value="price-asc">Price: Low → High</option>
      <option value="price-desc">Price: High → Low</option>
      <option value="rating">Top Rated</option>
      <option value="name">Name A-Z</option>
    </select>
  </div>
)

const styles = {
  wrap: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', flexWrap: 'wrap',
    gap: 12, margin: '1.5rem 0',
  },
  cats:  { display: 'flex', flexWrap: 'wrap', gap: 8 },
  catBtn: {
    padding: '0.45rem 1rem', borderRadius: 20,
    background: 'transparent', border: '1px solid rgba(255,255,255,0.12)',
    color: '#A0A0C0', fontSize: '0.82rem', fontWeight: 500,
    cursor: 'pointer', transition: 'all 0.2s', textTransform: 'capitalize',
  },
  select: {
    padding: '0.5rem 1rem', borderRadius: 10,
    background: '#1E1E32', border: '1px solid rgba(255,255,255,0.1)',
    color: '#F0F0FF', fontSize: '0.87rem', cursor: 'pointer',
  },
}

export default Filters