// pages/admin/revenue-report.tsx or app/admin/revenue-report/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Package } from "lucide-react";

// Types
interface RevenueData {
  totalRevenue: number;
  totalBookings: number;
  averageBookingValue: number;
}

interface PackageRevenueData {
  packageId: number;
  packageTitle: string;
  country: string;
  packageType: string;
  totalRevenue: number;
  totalBookings: number;
  averageBookingValue: number;
}

export default function RevenueReport() {
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null);
  const [packageData, setPackageData] = useState<PackageRevenueData[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  // Fetch revenue data
  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setIsLoading(true);
        const [overviewRes, packageRes] = await Promise.all([
          fetch("http://localhost:5000/api/admin/revenue/overview", {
            credentials: "include",
          }),
          fetch("http://localhost:5000/api/admin/revenue/packages", {
            credentials: "include",
          }),
        ]);

        const [overview, packages] = await Promise.all([
          overviewRes.json(),
          packageRes.json(),
        ]);

        setRevenueData(overview.data);
        setPackageData(packages.data);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Revenue Report</h1>
        <p className="text-gray-600 mt-2">
          Total revenue analytics and insights
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(revenueData?.totalRevenue || 0)}
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Accepted Bookings
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {revenueData?.totalBookings || 0}
                </p>
              </div>
              <Package className="w-10 h-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Package */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Revenue by Tour Package
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Package</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Avg. Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packageData.map((pkg) => (
                  <TableRow key={pkg.packageId}>
                    <TableCell className="font-medium">
                      {pkg.packageTitle}
                    </TableCell>
                    <TableCell>{pkg.country}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{pkg.packageType}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      {formatCurrency(pkg.totalRevenue)}
                    </TableCell>
                    <TableCell>{pkg.totalBookings}</TableCell>
                    <TableCell>
                      {formatCurrency(pkg.averageBookingValue)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
