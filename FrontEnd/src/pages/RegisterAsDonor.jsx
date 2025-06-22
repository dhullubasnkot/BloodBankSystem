import { useState } from "react";
import CreateDonors from "../api/donors/registerAsDonors";

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

  const NewUserId = localStorage.getItem("id");
  const [form, setForm] = useState({
    userId: NewUserId,
    bloodGroup: "",
    district: "",
    city: "",
    available: true,
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CreateDonors({
        ...form,
      });
      alert("Donor registered successfully!");
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="userId"
        placeholder="User ID"
        value={form.userId}
        onChange={handleChange}
        readOnly
      />
      <select
        name="bloodGroup"
        value={form.bloodGroup}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Select Blood Group
        </option>
        {bloodGroups.map((group) => (
          <option key={group} value={group}>
            {group.replace("_", " ").replace("POS", "+").replace("NEG", "-")}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="district"
        placeholder="District"
        value={form.district}
        onChange={handleChange}
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
      />
      <input
        type="text"
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
      />
      <button type="submit">Register as Donor</button>
    </form>
  );
}
