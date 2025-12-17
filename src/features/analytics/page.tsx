import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Truck,
  Package,
  Clock,
  Fuel,
  Leaf,
  Calendar,
  Download,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// --- Renk Paleti (CSS Değişkeni Sorununa Karşı Sabitler) ---
const COLORS = {
  blue: "#3b82f6", // fleet-blue
  green: "#10b981", // fleet-green
  purple: "#8b5cf6", // fleet-purple
  warning: "#f59e0b",
  destructive: "#ef4444",
  muted: "#94a3b8",
};

// --- Veri Setleri ---
const deliveryTrends = [
  { month: "Jan", deliveries: 2400, onTime: 2200, delayed: 200 },
  { month: "Feb", deliveries: 2210, onTime: 2050, delayed: 160 },
  { month: "Mar", deliveries: 2890, onTime: 2700, delayed: 190 },
  { month: "Apr", deliveries: 3200, onTime: 3050, delayed: 150 },
  { month: "May", deliveries: 3400, onTime: 3200, delayed: 200 },
  { month: "Jun", deliveries: 3100, onTime: 2900, delayed: 200 },
  { month: "Jul", deliveries: 3450, onTime: 3300, delayed: 150 },
  { month: "Aug", deliveries: 3800, onTime: 3650, delayed: 150 },
  { month: "Sep", deliveries: 3600, onTime: 3400, delayed: 200 },
  { month: "Oct", deliveries: 4100, onTime: 3900, delayed: 200 },
  { month: "Nov", deliveries: 4500, onTime: 4300, delayed: 200 },
  { month: "Dec", deliveries: 4200, onTime: 4000, delayed: 200 },
];

const costBreakdown = [
  { name: "Fuel", value: 35, color: COLORS.blue },
  { name: "Labor", value: 40, color: COLORS.green },
  { name: "Maintenance", value: 15, color: COLORS.purple },
  { name: "Insurance", value: 10, color: COLORS.warning },
];

const fleetEfficiency = [
  { day: "Mon", efficiency: 88, utilization: 92 },
  { day: "Tue", efficiency: 92, utilization: 95 },
  { day: "Wed", efficiency: 85, utilization: 88 },
  { day: "Thu", efficiency: 94, utilization: 96 },
  { day: "Fri", efficiency: 91, utilization: 94 },
  { day: "Sat", efficiency: 78, utilization: 75 },
  { day: "Sun", efficiency: 65, utilization: 60 },
];

const emissionsData = [
  { month: "Jan", co2: 12.5, target: 15 },
  { month: "Feb", co2: 11.8, target: 14.5 },
  { month: "Mar", co2: 13.2, target: 14 },
  { month: "Apr", co2: 11.5, target: 13.5 },
  { month: "May", co2: 10.8, target: 13 },
  { month: "Jun", co2: 10.2, target: 12.5 },
];

const kpiCards = [
  {
    title: "Total Revenue",
    value: "$1.2M",
    change: "+12.5%",
    changeType: "positive",
    icon: DollarSign,
    description: "vs last month",
  },
  {
    title: "Fleet Utilization",
    value: "87%",
    change: "+5.2%",
    changeType: "positive",
    icon: Truck,
    description: "vs last month",
  },
  {
    title: "Deliveries",
    value: "4,523",
    change: "+8.1%",
    changeType: "positive",
    icon: Package,
    description: "this month",
  },
  {
    title: "Avg. Delivery Time",
    value: "2.4h",
    change: "-15min",
    changeType: "positive",
    icon: Clock,
    description: "vs last month",
  },
  {
    title: "Fuel Efficiency",
    value: "8.2 L/100km",
    change: "-0.5L",
    changeType: "positive",
    icon: Fuel,
    description: "improvement",
  },
  {
    title: "CO₂ Reduced",
    value: "2.4t",
    change: "+18%",
    changeType: "positive",
    icon: Leaf,
    description: "this month",
  },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout
      title="Analytics Dashboard"
      subtitle="Comprehensive insights into fleet performance and sustainability"
    >
      {/* 1. Aksiyon Barı (İlk dosyadan aldık) */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="space-y-6 animate-in fade-in duration-500">
        {/* 2. KPI Kartları (İkinci dosyadan aldık - 6'lı Izgara) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpiCards.map((kpi, index) => (
            <Card
              key={index}
              className="border-border/50 shadow-sm hover:border-primary/30 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <kpi.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div
                    className={`flex items-center text-xs font-medium ${
                      kpi.changeType === "positive"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {kpi.changeType === "positive" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {kpi.change}
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {kpi.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {kpi.title}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 3. Grafikler Satır 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Delivery Trends */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Delivery Trends</CardTitle>
              <CardDescription>Monthly delivery performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={deliveryTrends}>
                    <defs>
                      <linearGradient
                        id="colorDeliveries"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={COLORS.blue}
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor={COLORS.blue}
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorOnTime"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={COLORS.green}
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor={COLORS.green}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis
                      dataKey="month"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="deliveries"
                      stroke={COLORS.blue}
                      fillOpacity={1}
                      fill="url(#colorDeliveries)"
                    />
                    <Area
                      type="monotone"
                      dataKey="onTime"
                      stroke={COLORS.green}
                      fillOpacity={1}
                      fill="url(#colorOnTime)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
              <CardDescription>Operating cost distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {costBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {costBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 4. Grafikler Satır 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fleet Efficiency */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Weekly Fleet Efficiency</CardTitle>
              <CardDescription>Efficiency vs Utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fleetEfficiency}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis
                      dataKey="day"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: "transparent" }} />
                    <Bar
                      dataKey="efficiency"
                      fill={COLORS.blue}
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="utilization"
                      fill={COLORS.green}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Emissions Tracking (Sustainability) */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Emissions Tracking</CardTitle>
              <CardDescription>CO₂ targets vs actuals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={emissionsData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis
                      dataKey="month"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="co2"
                      stroke={COLORS.blue}
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke={COLORS.warning}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
