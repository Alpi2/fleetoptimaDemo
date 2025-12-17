import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { LiveMapPreview } from "@/components/dashboard/LiveMapPreview";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { FleetOverview } from "@/components/dashboard/FleetOverview";
import { OptimizationStats } from "@/components/dashboard/OptimizationStats";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import {
  Truck,
  Package,
  Route,
  Clock,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

export default function OverviewPage() {
  return (
    <DashboardLayout
      title="Dashboard Overview"
      subtitle="Real-time insights and fleet performance metrics."
    >
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* 1. ÜST İSTATİSTİK KARTLARI (4'lü Grid) */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Active Vehicles"
            value="18"
            change="+2 vs yesterday"
            changeType="positive"
            icon={Truck}
            iconColor="text-blue-600"
          />
          <StatsCard
            title="Pending Orders"
            value="24"
            change="8 urgent priority"
            changeType="neutral"
            icon={Package}
            iconColor="text-yellow-600"
          />
          <StatsCard
            title="Routes Optimized"
            value="12"
            change="94% efficiency"
            changeType="positive"
            icon={Route}
            iconColor="text-emerald-600"
          />
          <StatsCard
            title="Avg. Delivery Time"
            value="42 min"
            change="-8% improvement"
            changeType="positive"
            icon={Clock}
            iconColor="text-purple-600"
          />
        </div>

        {/* 2. ANA İÇERİK IZGARASI (Sol: Geniş, Sağ: Dar) */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* SOL SÜTUN (Geniş - 2 birim yer kaplar) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Canlı Harita */}
            <LiveMapPreview />

            {/* Performans Grafiği */}
            <PerformanceChart />

            {/* Son Siparişler Tablosu */}
            <RecentOrders />
          </div>

          {/* SAĞ SÜTUN (Dar - 1 birim yer kaplar) */}
          <div className="space-y-6">
            {/* Optimizasyon Skorları */}
            <OptimizationStats />

            {/* Filo Özeti (Widget) */}
            <FleetOverview />

            {/* Son Aktiviteler */}
            <ActivityFeed />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
