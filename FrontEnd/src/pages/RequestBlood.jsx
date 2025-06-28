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
    userId: id || "",
    bloodGroup: "",
    district: "",
    city: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      if (res.ok) {
        setForm({
          name: "",
          phone: "",
          userId: id || "",
          bloodGroup: "",
          district: "",
          city: "",
          notes: "",
        });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send request");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-red-600 flex items-center gap-2">
        🩸 Request Blood
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <select
          name="bloodGroup"
          value={form.bloodGroup}
          required
          onChange={handleChange}
          className="w-full border border-red-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>
              {bg.replace("_POS", "+").replace("_NEG", "-").replace("_", "")}
            </option>
          ))}
        </select>

        <input
          name="name"
          value={form.name}
          placeholder="Full Name"
          required
          onChange={handleChange}
          className="w-full border border-red-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          name="phone"
          value={form.phone}
          placeholder="Phone Number"
          type="tel"
          required
          onChange={handleChange}
          className="w-full border border-red-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          name="district"
          value={form.district}
          placeholder="District"
          required
          onChange={handleChange}
          className="w-full border border-red-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          name="city"
          value={form.city}
          placeholder="City"
          required
          onChange={handleChange}
          className="w-full border border-red-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <textarea
          name="notes"
          value={form.notes}
          placeholder="Additional Notes (Optional)"
          onChange={handleChange}
          rows={4}
          className="w-full border border-red-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
        />

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestBloodForm;
//ReqyestBllood
