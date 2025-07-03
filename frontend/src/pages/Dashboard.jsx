import React from "react";
import ActiveStudents from "../components/ActiveStudents";
import UpcomingExams from "../components/UpcomingExams";
import PendingFees from "../components/PendingFees";

export default function Dashboard() {
  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Dashboard Budokan</h1>
      <ActiveStudents />
      <UpcomingExams />
      <PendingFees />
    </div>
  );
}
