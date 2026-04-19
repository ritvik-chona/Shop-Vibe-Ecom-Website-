import { FiSearch, FiX } from 'react-icons/fi'

const SearchBar = ({ value, onChange }) => (
  <div style={styles.wrap}>
    <FiSearch style={styles.icon} size={18} />
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={e => onChange(e.target.value)}
      style={styles.input}
    />
    {value && (
      <button style={styles.clear} onClick={() => onChange('')}>
        <FiX size={16} />
      </button>
    )}
  </div>
)

const styles = {
  wrap: {
    position: 'relative', display: 'flex', alignItems: 'center',
    background: '#1E1E32', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12, overflow: 'hidden', flex: 1, maxWidth: 400,
  },
  icon:  { position: 'absolute', left: 14, color: '#606080' },
  input: {
    width: '100%', padding: '0.7rem 2.8rem',
    background: 'transparent', border: 'none',
    color: '#F0F0FF', fontSize: '0.9rem',
  },
  clear: {
    position: 'absolute', right: 12,
    background: 'transparent', border: 'none',
    color: '#606080', cursor: 'pointer',
    display: 'flex', alignItems: 'center',
  },
}

export default SearchBar