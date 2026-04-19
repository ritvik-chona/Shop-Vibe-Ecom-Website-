import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart')) || [] } catch { return [] }
  })
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wishlist')) || [] } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) {
        toast.info('Quantity updated!')
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      toast.success('Added to cart!')
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id))
    toast.error('Removed from cart')
  }

  const updateQuantity = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return }
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
  }

  const clearCart = () => {
    setCartItems([])
    toast.success('Cart cleared!')
  }

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) {
        toast.info('Removed from wishlist')
        return prev.filter(i => i.id !== product.id)
      }
      toast.success('Added to wishlist!')
      return [...prev, product]
    })
  }

  const isInWishlist = (id) => wishlist.some(i => i.id === id)
  const isInCart    = (id) => cartItems.some(i => i.id === id)
  const cartCount   = cartItems.reduce((s, i) => s + i.quantity, 0)
  const cartTotal   = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{
      cartItems, wishlist,
      addToCart, removeFromCart, updateQuantity, clearCart,
      toggleWishlist, isInWishlist, isInCart,
      cartCount, cartTotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)