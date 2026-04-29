import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/admin.css";

function Admin() {
  const [tab, setTab] = useState("contacts");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const adminKey = "masstech-admin-2026";

  // FETCH DATA
  const fetchData = async (type) => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://masstech-react.onrender.com/api/admin/${type}`,
        {
          headers: {
            "admin-key": adminKey,
          },
        }
      );

      const result = await res.json();

      if (!res.ok) {
        console.log("ADMIN ERROR:", result);
        setData([]);
        setLoading(false);
        return;
      }

      setData(Array.isArray(result) ? result : []);
      setLoading(false);

    } catch (err) {
      console.log("FETCH ERROR:", err);
      setData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(tab);
  }, [tab]);

  return (
    <>
      <Navbar />

      <div className="admin-container">
        <h1>🛠 Admin Panel</h1>

        {/* TABS */}
        <div className="admin-tabs">
          <button onClick={() => setTab("contacts")}>Contacts</button>
          <button onClick={() => setTab("services")}>Services</button>
          <button onClick={() => setTab("purchases")}>Purchases</button>
        </div>

        {/* LOADING */}
        {loading && <p>Loading data...</p>}

        {/* TABLE AREA */}
        {!loading && (
          <div className="admin-table">

            {/* CONTACTS */}
            {tab === "contacts" && (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((c, i) => (
                    <tr key={i}>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.message}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* SERVICES */}
            {tab === "services" && (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Service</th>
                    <th>Details</th>
                    <th>whatsapp</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((s, i) => (
                    <tr key={i}>
                      <td>{s.name}</td>
                      <td>{s.service}</td>
                      <td>{s.details}</td>
                      <td>{s.whatsapp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* PURCHASES */}
            {tab === "purchases" && (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Session</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((p, i) => (
                    <tr key={i}>
                      <td>{p.name}</td>
                      <td>{p.email}</td>
                      <td>{p.productName}</td>
                      <td>${p.price}</td>
                      <td>{p.sessionId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Admin;