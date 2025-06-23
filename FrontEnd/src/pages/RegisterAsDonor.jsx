import { useState } from "react";
import CreateDonors from "../api/donors/registerAsDonors";
import Navbar from "../components/navbar";

export default function RegisterAsDonor() {
  const bloodGroups = [
    "A_POS",
    "A_NEG",
    "B_POS",
    "B_NEG",
    "AB_POS",
    "AB_NEG",
    "O_POS",
    "O_NEG",
  ];

  const userId = localStorage.getItem("id");

  const [form, setForm] = useState({
    userId,
    bloodGroup: "",
    district: "",
    city: "",
    available: true,
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CreateDonors(form);
      alert("Donor registered successfully!");
      setForm({
        userId,
        bloodGroup: "",
        district: "",
        city: "",
        available: true,
        notes: "",
      });
    } catch (error) {
      console.error("Failed to register donor:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
        <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-red-600 text-center mb-6">
            Register as Blood Donor
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
              >
                <option value="" disabled>
                  Select your blood group
                </option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group
                      .replace("_", " ")
                      .replace("POS", "+")
                      .replace("NEG", "-")}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <input
                type="text"
                name="district"
                placeholder="Enter your district"
                value={form.district}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                value={form.city}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <input
                type="text"
                name="notes"
                placeholder="e.g. Available after 3 months"
                value={form.notes}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-md font-medium tracking-wide"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
