"use server";

import { cookies } from "next/headers";

export async function getBookingData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log("Verifying token get user:", token);

  if (!token) return null;

  try {
    const response = await fetch(
      `http://localhost:5000/api/bookings/get-bookings`,
      {
        credentials: "include",
        method: "GET",
        headers: { Cookie: `token=${token}` },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch tour data");
      return null;
    }

    const data = await response.json();
    console.log("booking data", data);
    return data;
  } catch (error) {
    console.error("Error fetching tour data:", error);
    return null;
  }
}
