import React, { useState } from "react";
import BulkPromoCodeGeneration from "./BulkCode";
import PromoCodeEdit from "./EditPromocode";
import SuperAdminSidebar from "../../../partials/SuperAdminSidebar";
import SuperAdminHeader from "../../../partials/SuperAdminHeader";

function PromoCodeManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SuperAdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
        {/* Site header */}
        <SuperAdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* pointer-events-none cursor-not-allowed grayscale opacity-70 */}
        <main>
          <p className="text-3xl font-extrabold p-10">
            *This feature is in development mode
          </p>
          <div className="p-4 w-full max-w-screen-md mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800">
              Promo Code Management
            </h1>
            <BulkPromoCodeGeneration />
            <PromoCodeEdit />
          </div>
        </main>
      </div>
    </div>
  );
}

export default PromoCodeManagement;
