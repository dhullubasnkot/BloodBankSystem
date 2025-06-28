import React, { useEffect, useState } from "react";
import GetAllRequestedBlood from "../api/RequestBlood/getAllBloodRequest";
import GetAllDonors from "../api/donors/getAllDonors";

const RequestedBloodList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [donor, setDonor] = useState(null);
  const [donorLoading, setDonorLoading] = useState(true);

  const Donor_Id = localStorage.getItem("Donor_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bloodRequestsRes, allDonorsRes] = await Promise.all([
          GetAllRequestedBlood(),
          GetAllDonors(),
        ]);

        console.log("Donor_Id from localStorage:", Donor_Id);
        console.log("All donors fetched:", allDonorsRes);
        console.log("Blood requests fetched:", bloodRequestsRes);

        setRequests(bloodRequestsRes.data || []);

        const donorMatch = allDonorsRes.find(
          (d) => String(d.id) === String(Donor_Id)
        );

        if (donorMatch) {
          setDonor(donorMatch);
        } else {
          setDonor(null);
        }
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

  return (
    <div>
      <h2 className="text-2xl font-bold text-red-700 mb-6">
        🩸 All Blood Requests
      </h2>

      {loading ? (
        <p>Loading blood requests...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {requests.map((request) => {
            const isMatch =
              donor?.bloodGroup?.toUpperCase() ===
              request.bloodGroup?.toUpperCase();

            return (
              <div
                key={request.id}
                className="bg-white rounded-lg shadow p-5 border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Requested By: {request.name || "Unknown"}
                </h3>
                <p className="text-sm text-gray-600">
                  <strong>Blood Group:</strong> {request.bloodGroup}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Phone Number:</strong> {request.phone}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {request.district}, {request.city}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Notes:</strong> {request.notes || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Date:</strong>{" "}
                  {new Date(request.requestedAt).toLocaleDateString()}
                </p>

                {!donorLoading && donor ? (
                  isMatch ? (
                    <button
                      className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={() =>
                        alert(`You volunteered to donate for ${request.name}`)
                      }
                    >
                      ✅ I Can Donate
                    </button>
                  ) : (
                    <button
                      className="mt-4 px-4 py-2 bg-gray-300 text-gray-600 rounded cursor-not-allowed"
                      disabled
                    >
                      ❌ Blood Type Not Matching
                    </button>
                  )
                ) : !donorLoading ? (
                  <p className="text-sm text-red-500 mt-2">
                    Login as a donor to respond
                  </p>
                ) : (
                  <p className="text-sm text-gray-400 mt-2">
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
//Request Blood List
