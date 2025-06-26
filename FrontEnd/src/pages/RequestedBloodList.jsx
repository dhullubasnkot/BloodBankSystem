import React, { useEffect, useState } from "react";
import GetAllRequestedBlood from "../api/RequestBlood/getAllBloodRequest";

const RequestedBloodList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await GetAllRequestedBlood();
        setRequests(res.data || []);
      } catch (err) {
        console.error("Error fetching requests", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-red-700 mb-6">
        🩸 All Blood Requests
      </h2>
      {loading ? (
        <p>Loading blood requests...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {requests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Requested By: {request.user?.name || "Unknown"}
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Blood Group:</strong> {request.bloodGroup}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestedBloodList;
