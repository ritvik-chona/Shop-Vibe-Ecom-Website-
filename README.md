# 🛍️ Shop Vibe — Modern E-commerce Web Application

A fully responsive e-commerce frontend built with **React** and deployed on **Vercel**.
This project demonstrates scalable frontend architecture, state management, and production-level debugging practices.

---

## 🌐 Live Application

🔗 https://shop-vibe-ecom-website.vercel.app/

---

## 📌 Overview

Shop Vibe is a modern e-commerce interface that allows users to browse products, filter/search items, manage cart and wishlist, and simulate checkout.

The application is designed with a focus on:

* Clean UI/UX
* Component reusability
* Efficient state management
* Real-world deployment practices

---

## ✨ Core Features

* **Product Catalog**

  * Dynamic product listing
  * Category-based filtering
  * Search functionality (debounced)

* **Cart System**

  * Add/remove items
  * Quantity management
  * Real-time price calculation

* **Wishlist**

  * Save and manage favorite products

* **Checkout Flow**

  * Form validation
  * Order summary
  * Simulated order placement

* **Performance**

  * Optimized build using Vite
  * Memoization with `useMemo`
  * Debounced search for efficiency

---

## 🧱 Tech Stack

| Category         | Technology       |
| ---------------- | ---------------- |
| Frontend         | React.js         |
| Routing          | React Router     |
| State Management | Context API      |
| Build Tool       | Vite             |
| UI Enhancements  | React Icons, CSS |
| Notifications    | React Toastify   |
| Deployment       | Vercel           |

---

## 📂 Project Structure

```id="tree1"
src/
├── components/     # Reusable UI components
├── context/        # Global state (Cart, Wishlist)
├── hooks/          # Custom hooks (useProducts, useDebounce)
├── pages/          # Route-based pages
├── utils/          # Helper functions
├── App.jsx
├── main.jsx
```

---

## ⚙️ Local Development

```bash id="install1"
git clone https://github.com/ritvik-chona/Shop-Vibe-Ecom-Website-.git
cd shop-vibe
npm install
npm run dev
```

---

## 🧠 Key Learnings

* Handling global state using **React Context API**
* Implementing **custom hooks** for reusable logic
* Managing **client-side routing** with React Router
* Debugging **case-sensitive deployment issues (Linux vs Windows)**
* Deploying and maintaining production builds on **Vercel**

---

## 🚀 Future Enhancements

* Authentication system (JWT / Firebase Auth)
* Backend integration (Node.js / Express)
* Payment gateway integration (Stripe)
* Product reviews & ratings
* Admin dashboard for product management

---

## 📈 Highlights

* Production-ready deployment on Vercel
* Real-world debugging experience (case sensitivity, build errors)
* Modular and scalable project structure

---

## 📬 Contact

GitHub: https://github.com/ritvik-chona

---

> ⭐ If you find this project useful, consider giving it a star!
