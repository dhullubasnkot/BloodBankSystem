export default async function GetAllDonors() {
  try {
    const response = await fetch("http://localhost:3000/donor", {
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
