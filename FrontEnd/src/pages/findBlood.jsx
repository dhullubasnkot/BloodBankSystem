import React, { useState, useEffect } from "react";
import GetAllDonors from "../api/donors/getAllDonors";
import Navbar from "../components/navbar";

export default function FindBlood() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donors = await GetAllDonors();
        setData(donors);
      } catch (err) {
        setError(err.message || "Failed to fetch donors");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length) return <div>No donors found.</div>;

  return (
    <>
      <Navbar />
      <div>
        <h2>Donors List</h2>
        {/* <ul>
        {data.map((donor, idx) => (
            <li key={donor.id || idx}>
            {donor.district} - {donor.bloodType}
            </li>
            ))}
            </ul> */}
        <div>
          {data.map((donor) => (
            <div
              key={donor.id}
              className="bg-white shadow-md rounded-md p-4 mb-4"
            >
              <h3 className="">{donor.user.name}</h3>
              <h3 className="text-lg ">{donor.bloodGroup}</h3>
              <p className="text-gray-600">{donor.district}</p>
              <p className="text-[10px]">{donor.city}</p>
              <p>{donor.lastDonated}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
