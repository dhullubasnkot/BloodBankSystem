import { useEffect, useState } from "react";
import GetDonorByIds from "../api/donors/GetDonorById";
import GetAllDonationStats from "../api/DonationStats/GetAllDonationStats";
import GetAllRequestedBlood from "../api/RequestBlood/getAllBloodRequest";

export default function UserProfile() {
  const [donorData, setDonorData] = useState(null);
  const [donations, setDonations] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const donorId = localStorage.getItem("Donor_id");
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donor = await GetDonorByIds();
        const allDonations = await GetAllDonationStats();
        const allRequestsRes = await GetAllRequestedBlood();

        const donationDetails = allDonations?.donationDetails || [];
        const currentDonorDonations = donationDetails.filter(
          (d) => String(d.donorId) === String(donorId)
        );

        const allReq = allRequestsRes.data || [];
        const myRequests = allReq.filter(
          (r) => String(r.userId) === String(userId)
        );

        setDonorData(donor);
        setAllRequests(allReq);
        setDonations(currentDonorDonations);
        setUserRequests(myRequests);
      } catch (err) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [donorId, userId]);

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
            const request = allRequests.find(
              (r) => r.id === donation.requestId
            );
            return (
              <div
                key={idx}
                className="border p-4 rounded shadow-sm bg-gray-50"
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

      <h3 className="text-xl font-semibold mt-10 mb-4">
        📋 Your Blood Requests
      </h3>
      {userRequests.length === 0 ? (
        <p className="text-gray-500">You haven’t requested any blood yet.</p>
      ) : (
        <div className="space-y-4">
          {userRequests.map((request, idx) => (
            <div key={idx} className="border p-4 rounded shadow-sm bg-red-50">
              <p>
                <strong>Name:</strong> {request.name}
              </p>
              <p>
                <strong>Blood Group:</strong> {request.bloodGroup}
              </p>
              <p>
                <strong>Phone:</strong> {request.phone}
              </p>
              <p>
                <strong>Location:</strong> {request.district}, {request.city}
              </p>
              <p>
                <strong>Requested At:</strong>{" "}
                {request.requestedAt
                  ? new Date(request.requestedAt).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <strong>Notes:</strong> {request.notes || "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
