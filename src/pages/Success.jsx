import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSearchParams } from "react-router-dom";

function Success() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    const user = JSON.parse(localStorage.getItem("user"));
    const productName = localStorage.getItem("lastProduct");

    const purchasedProduct = {
      "Business ERP Software": {
        file: "/downloads/erp-software.zip",
        price: 99
      },
      "CRM Management System": {
        file: "/downloads/crm-software.zip",
        price: 149
      }
    };

    if (productName && purchasedProduct[productName]) {
      setProduct({
        name: productName,
        download: purchasedProduct[productName].file,
        price: purchasedProduct[productName].price
      });

      // Save purchase to backend
      if (session_id && user) {
        fetch("https://masstech-react.vercel.app/api/save-purchase", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            productName,
            price: purchasedProduct[productName].price,
            sessionId: session_id
          })
        });
      }
    }

    setTimeout(() => setLoading(false), 1000);

  }, [searchParams]);

  return (
    <>
      <Navbar />

      <div className="success-page">
        {loading ? (
          <h2>Confirming payment...</h2>
        ) : (
          <>
            <h1>Payment Successful</h1>
            <p>Your software is ready to download</p>

            {product && (
              <a
                href={product.download}
                download
                className="download-btn"
              >
                Download {product.name}
              </a>
            )}
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Success;