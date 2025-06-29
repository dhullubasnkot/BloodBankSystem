export default async function GetAllDonationStats() {
  try {
    const response = await fetch("http://localhost:3000/donation", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Donors Stats");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Donors Stats:", error.message);
    throw error;
  }
}
