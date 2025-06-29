import { useEffect, useState } from "react";
import GetDonorByIds from "../api/donors/GetDonorById";
import GetAllDonationStats from "../api/DonationStats/GetAllDonationStats";
import GetAllRequestedBlood from "../api/RequestBlood/getAllBloodRequest";

export default function UserProfile() {
  const [donorData, setDonorData] = useState(null);
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const donorId = localStorage.getItem("Donor_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donor = await GetDonorByIds();
        const allDonations = await GetAllDonationStats();
        const allRequests = await GetAllRequestedBlood();

        const donationDetails = allDonations?.donationDetails || [];
        const currentDonorDonations = donationDetails.filter(
          (d) => String(d.donorId) === String(donorId)
        );

        setDonorData(donor);
        setRequests(allRequests.data || []);
        setDonations(currentDonorDonations);
      } catch (err) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [donorId]);

  if (loading) return <div className="p-4">Loading user profile...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-red-600">👤 Your Profile</h2>

      {donorData && (
        <div className="mb-8 bg-gray-50 p-4 rounded">
          <p>
            <strong>Name:</strong> {donorData?.user?.name}
          </p>
          <p>
            <strong>City:</strong> {donorData.city}
          </p>
          <p>
            <strong>Blood Group:</strong> {donorData.bloodGroup}
          </p>
          <p>
            <strong>District:</strong> {donorData.district}
          </p>
        </div>
      )}

      <h3 className="text-xl font-semibold mb-4">📝 Donations You Made</h3>

      {donations.length === 0 ? (
        <p className="text-gray-500">You haven’t donated yet.</p>
      ) : (
        <div className="space-y-4">
          {donations.map((donation, idx) => {
            const request = requests.find((r) => r.id === donation.requestId);

            return (
              <div
                key={idx}
                className="border border-gray-200 p-4 rounded shadow-sm"
              >
                <p>
                  <strong>Recipient:</strong> {request?.name || "Unknown"}
                </p>
                <p>
                  <strong>Blood Group:</strong> {request?.bloodGroup}
                </p>
                <p>
                  <strong>Location:</strong> {request?.district},{" "}
                  {request?.city}
                </p>
                <p>
                  <strong>Donated At:</strong>{" "}
                  {donation.createdAt
                    ? new Date(donation.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
