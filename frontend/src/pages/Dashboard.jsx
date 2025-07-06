import React from "react";
import ActiveStudents from "../components/ActiveStudents";
import UpcomingExams from "../components/UpcomingExams";
import PendingFees from "../components/PendingFees";

export default function Dashboard() {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard Budokan</h1>
      <div className="flex flex-col md:flex-row gap-20">
        
        <div className="flex flex-col flex-1 gap-6">
          <UpcomingExams />
          <PendingFees />
        </div>
        
        <div className="w-full md:w-1/2">
          <ActiveStudents />
        </div>
        
      </div>
    </div>
  );
}

