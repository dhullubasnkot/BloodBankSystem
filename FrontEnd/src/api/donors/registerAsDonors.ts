const API_URL = import.meta.env.VITE_API_URL;

const CreateDonors = async (formData) => {
  const response = await fetch(`${API_URL}donor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });
  localStorage.setItem("isDonor", "true");

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create donor");
  }

  return result;
};

export default CreateDonors;
