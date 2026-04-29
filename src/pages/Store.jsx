import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/store.css";

function Store() {
  const products = [
    {
      id: 1,
      name: "Business ERP Software",
      price: 99,
      description: "Full ERP system for business management",
    },
    {
      id: 2,
      name: "CRM Management System",
      price: 149,
      description: "Customer relationship management software",
    },
  ];

  const handleBuy = async (product) => {
    try {
      // Save purchased product for success page
      localStorage.setItem("lastProduct", product.name);

      const res = await fetch(
        "https://masstech-react.onrender.com/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      const data = await res.json();

      console.log("Stripe response:", data);

      if (!data.url) {
        alert(data.error || "No checkout URL received");
        return;
      }

      // Redirect to Stripe checkout
      window.location.href = data.url;

    } catch (err) {
      console.log("PAYMENT ERROR:", err);
      alert("Payment error");
    }
  };

  return (
    <>
      <Navbar />

      <div className="store-page">
        <h1>Software Store</h1>
        <p>Buy premium software solutions instantly</p>

        <div className="product-grid">
          {products.map((item) => (
            <div className="product-card" key={item.id}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <h3>${item.price}</h3>

              <button onClick={() => handleBuy(item)}>
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Store;