import { useEffect, useState } from "react";
import GetDonorByIds from "../api/donors/GetDonorById";

export default function UserProfile() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donors = await GetDonorByIds();
        setData(donors);
      } catch (err) {
        setError(err.message || "Failed to fetch donors");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading user profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const donorList = Array.isArray(data) ? data : [data];

  return (
    <div>
      <h2>User Profile</h2>
      {donorList.length === 0 ? (
        <div>No donor data found.</div>
      ) : (
        donorList.map((donor, idx) => (
          <div
            key={donor.id || idx}
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              marginBottom: "12px",
            }}
          >
            <p>
              <strong>Name:</strong> {donor.user.name}
            </p>
            <p>
              <strong>City:</strong> {donor.city}
            </p>
            <p>
              <strong>Blood Group:</strong> {donor.bloodGroup}
            </p>
            <p>
              <strong>District:</strong> {donor.district}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
