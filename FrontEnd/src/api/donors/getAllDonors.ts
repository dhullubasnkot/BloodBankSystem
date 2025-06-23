const API_URL = import.meta.env.VITE_API_URL;

export default async function GetAllDonors() {
  try {
    const response = await fetch(`${API_URL}donor`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Donors");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Donors:", error.message);
    throw error;
  }
}
