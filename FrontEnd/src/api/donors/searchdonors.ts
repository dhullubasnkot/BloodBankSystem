const API_URL = import.meta.env.VITE_API_URL;
const SearchDonor = async (formData) => {
  const response = await fetch(`${API_URL}donor/search`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to Search Donor");
  }

  return result;
};

export default SearchDonor;
