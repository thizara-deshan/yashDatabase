import { requireRole } from "@/lib/requireRole";
import Booking from "@/components/customer/Bookings";

export default async function ClientDashboardPage() {
  await requireRole("CUSTOMER");

  return <Booking selectedPackageId={1} />;
}
