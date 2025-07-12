import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/authServer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { valid } = await verifyToken();

  if (!valid) return redirect("/login");

  return <>{children}</>;
}
