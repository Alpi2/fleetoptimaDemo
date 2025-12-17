// Shared TypeScript types for FleetOptima

// Vehicle Types
export type VehicleStatus = "active" | "idle" | "maintenance" | "offline";
export type VehicleType =
  | "heavy-truck"
  | "medium-truck"
  | "delivery-van"
  | "light-vehicle";

export interface Vehicle {
  id: string;
  name: string;
  type: VehicleType;
  licensePlate: string;
  status: VehicleStatus;
  driver?: Driver;
  location?: GeoLocation;
  fuel: number;
  mileage: number;
  capacity: {
    weight: number; // in kg
    volume: number; // in m³
  };
  fuelType: "diesel" | "gasoline" | "electric" | "hybrid";
  tankCapacity: number;
  avgConsumption: number;
  nextService: string;
  createdAt: string;
  updatedAt: string;
}

// Driver Types
export type DriverStatus = "available" | "on-route" | "off-duty" | "break";

export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: DriverStatus;
  skills: string[];
  certifications: string[];
  vehicleId?: string;
  rating: number;
  totalDeliveries: number;
  createdAt: string;
  updatedAt: string;
}

// Order Types
export type OrderPriority = "urgent" | "high" | "medium" | "low";
export type OrderStatus =
  | "pending"
  | "assigned"
  | "in-transit"
  | "delivered"
  | "cancelled"
  | "failed";

export interface Order {
  id: string;
  customer: Customer;
  deliveryAddress: Address;
  items: OrderItem[];
  totalWeight: number;
  totalVolume: number;
  priority: OrderPriority;
  status: OrderStatus;
  timeWindow: TimeWindow;
  vehicle?: Vehicle;
  driver?: Driver;
  route?: Route;
  eta?: string;
  actualDeliveryTime?: string;
  notes?: string;
  proofOfDelivery?: ProofOfDelivery;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  weight: number;
  volume: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates: GeoLocation;
}

export interface TimeWindow {
  from: string; // ISO datetime
  to: string; // ISO datetime
  isHard: boolean; // hard constraint vs soft preference
}

export interface ProofOfDelivery {
  signature?: string;
  photos?: string[];
  notes?: string;
  timestamp: string;
}

// Route Types
export type RouteStatus =
  | "pending"
  | "in-progress"
  | "completed"
  | "delayed"
  | "cancelled";

export interface Route {
  id: string;
  name: string;
  driver: Driver;
  vehicle: Vehicle;
  depot: Depot;
  stops: RouteStop[];
  totalDistance: number; // in km
  totalDuration: number; // in minutes
  estimatedFuel: number; // in liters
  estimatedCO2: number; // in kg
  status: RouteStatus;
  startTime?: string;
  endTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RouteStop {
  id: string;
  order: Order;
  sequence: number;
  arrivalTime: string;
  departureTime: string;
  status: "pending" | "arrived" | "completed" | "skipped";
  distance: number; // from previous stop
  duration: number; // from previous stop
}

export interface Depot {
  id: string;
  name: string;
  address: Address;
  type: "main" | "satellite";
  capacity: number;
  operatingHours: {
    open: string;
    close: string;
  };
}

// Geo Types
export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface GeoFence {
  id: string;
  name: string;
  type: "circle" | "polygon";
  center?: GeoLocation;
  radius?: number;
  points?: GeoLocation[];
}

// Analytics Types
export interface AnalyticsOverview {
  totalDeliveries: number;
  deliveriesChange: number;
  activeVehicles: number;
  vehiclesChange: number;
  fleetUtilization: number;
  utilizationChange: number;
  avgDeliveryTime: number;
  deliveryTimeChange: number;
  totalDistance: number;
  fuelConsumed: number;
  co2Emissions: number;
  costSavings: number;
}

export interface DeliveryTrend {
  date: string;
  deliveries: number;
  onTime: number;
  delayed: number;
  cancelled: number;
}

export interface FleetEfficiency {
  date: string;
  efficiency: number;
  utilization: number;
}

export interface CostBreakdown {
  category: string;
  value: number;
  percentage: number;
}

export interface EmissionsData {
  period: string;
  actual: number;
  target: number;
  reduction: number;
}

// Optimization Types
export interface OptimizationRequest {
  orders: string[];
  vehicles: string[];
  depots: string[];
  constraints: OptimizationConstraints;
  objectives: OptimizationObjectives;
}

export interface OptimizationConstraints {
  maxRouteDistance?: number;
  maxRouteDuration?: number;
  maxStopsPerRoute?: number;
  respectTimeWindows: boolean;
  respectVehicleCapacity: boolean;
  respectDriverWorkHours: boolean;
}

export interface OptimizationObjectives {
  minimizeCost: boolean;
  minimizeDistance: boolean;
  minimizeCO2: boolean;
  balanceWorkload: boolean;
  weights?: {
    cost: number;
    distance: number;
    co2: number;
    workload: number;
  };
}

export interface OptimizationResult {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  routes: Route[];
  metrics: {
    totalDistance: number;
    totalDuration: number;
    totalCost: number;
    co2Emissions: number;
    unassignedOrders: number;
    optimizationTime: number;
  };
  savings: {
    distanceReduction: number;
    costReduction: number;
    co2Reduction: number;
  };
  createdAt: string;
  completedAt?: string;
}

// Notification Types
export type NotificationType = "info" | "warning" | "error" | "success";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

// User Types
export type UserRole = "admin" | "manager" | "dispatcher" | "driver";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    routeAlerts: boolean;
    deliveryUpdates: boolean;
    maintenanceReminders: boolean;
  };
}
