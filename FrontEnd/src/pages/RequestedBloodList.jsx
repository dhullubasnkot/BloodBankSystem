import React, { useEffect, useState } from "react";
import GetAllRequestedBlood from "../api/RequestBlood/getAllBloodRequest";
import GetAllDonors from "../api/donors/getAllDonors";
import GetAllDonationStats from "../api/DonationStats/GetAllDonationStats";
import CreateDonation from "../api/DonationStats/DonationStats";

const RequestedBloodList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [donor, setDonor] = useState(null);
  const [donorLoading, setDonorLoading] = useState(true);
  const [donatedIds, setDonatedIds] = useState([]);

  const Donor_Id = localStorage.getItem("Donor_id");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bloodRequestsRes, allDonorsRes, allDonationsStats] =
          await Promise.all([
            GetAllRequestedBlood(),
            GetAllDonors(),
            GetAllDonationStats(),
          ]);

        setRequests(bloodRequestsRes.data || []);

        const donorMatch = allDonorsRes.find(
          (d) => String(d.id) === String(Donor_Id)
        );
        setDonor(donorMatch || null);

        const donations = allDonationsStats.donationDetails || [];

        const donatedToIds = donations
          .filter((donation) => donation.donorId === Donor_Id)
          .map((donation) => donation.requestId);

        setDonatedIds(donatedToIds);
      } catch (err) {
        console.error("Error fetching data", err);
        setRequests([]);
        setDonor(null);
      } finally {
        setLoading(false);
        setDonorLoading(false);
      }
    };

    fetchData();
  }, [Donor_Id]);

  const handleDonate = async (request) => {
    if (!donor || donatedIds.includes(request.id)) return;

    try {
      await CreateDonation({
        donorId: donor.id,
        requesterId: request.userId,
        requestId: request.id,
      });

      setDonatedIds((prev) => [...prev, request.id]);
      alert(`You volunteered to donate for ${request.name}`);
    } catch (err) {
      console.error("Donation failed:", err);
      alert("Failed to submit donation");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-10">
      <h2 className="text-3xl font-bold text-red-700 mb-8 text-center">
        🩸 All Blood Requests
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading blood requests...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {requests.map((request) => {
            const isMatch =
              donor?.bloodGroup?.toUpperCase() ===
              request.bloodGroup?.toUpperCase();

            return (
              <div
                key={request.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-t-4 border-red-500"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {request.name || "Unknown"}
                </h3>
                <p className="text-sm text-gray-600">
                  <strong>Blood Group:</strong> {request.bloodGroup}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Phone:</strong> {request.phone}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {request.district}, {request.city}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Notes:</strong> {request.notes || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Requested On:</strong>{" "}
                  {new Date(request.requestedAt).toLocaleDateString()}
                </p>

                {!donorLoading && donor ? (
                  isMatch ? (
                    <button
                      onClick={() => handleDonate(request)}
                      disabled={donatedIds.includes(request.id)}
                      className={`mt-4 w-full px-4 py-2 rounded font-semibold ${
                        donatedIds.includes(request.id)
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {donatedIds.includes(request.id)
                        ? "✅ Already Donated"
                        : "✅ I Can Donate"}
                    </button>
                  ) : (
                    <button
                      className="mt-4 w-full px-4 py-2 bg-gray-300 text-gray-600 rounded cursor-not-allowed"
                      disabled
                    >
                      ❌ Blood Type Not Matching
                    </button>
                  )
                ) : !donorLoading ? (
                  <p className="text-sm text-red-500 mt-2 text-center">
                    Login as a donor to respond
                  </p>
                ) : (
                  <p className="text-sm text-gray-400 mt-2 text-center">
                    Checking donor info…
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RequestedBloodList;
