import { useState, useEffect } from 'react'
import { fetchProducts, fetchCategories } from '../services/api'

const useProducts = () => {
  const [products,   setProducts]   = useState([])
  const [categories, setCategories] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const [prodRes, catRes] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ])
        setProducts(prodRes.data)
        setCategories(['all', ...catRes.data])
      } catch (e) {
        setError('Failed to load products. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { products, categories, loading, error }
}

export default useProducts