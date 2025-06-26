const SearchDonor = async (formData) => {
  const response = await fetch("http://localhost:3000/donor/search", {
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
