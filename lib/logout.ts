export async function logout() {
  try {
    const response = await fetch(`http://localhost:5000/api/auth/logout`, {
      method: "POST",
      credentials: "include", // includes cookies
    });

    if (!response.ok) throw new Error("Logout failed");

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
