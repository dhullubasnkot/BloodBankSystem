import React, { useState } from "react";

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
const id = localStorage.getItem("id");
const RequestBloodForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    userId: id,
    bloodGroup: "",
    district: "",
    city: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/bloodrequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message || "Blood request sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to send request");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold mb-4">🩸 Request Blood</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="bloodGroup"
          required
          className="w-full border p-2"
          onChange={handleChange}
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>
              {bg.replace("_", "+").replace("POS", "+").replace("NEG", "-")}
            </option>
          ))}
        </select>
        <input
          name="name"
          placeholder="Name"
          required
          className="w-full border p-2"
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          required
          className="w-full border p-2"
          onChange={handleChange}
        />
        <input
          name="district"
          placeholder="District"
          required
          className="w-full border p-2"
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="City"
          required
          className="w-full border p-2"
          onChange={handleChange}
        />
        <textarea
          name="notes"
          placeholder="Notes (Optional)"
          className="w-full border p-2"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Request Blood
        </button>
      </form>
    </div>
  );
};

export default RequestBloodForm;
