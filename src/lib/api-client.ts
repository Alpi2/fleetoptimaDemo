// API Client for FleetOptima Backend Services
// This will be the SDK for communicating with backend microservices

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, ...fetchOptions } = options;

    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Vehicles API
  vehicles = {
    list: () => this.request<Vehicle[]>("/fleet/vehicles"),
    get: (id: string) => this.request<Vehicle>(`/fleet/vehicles/${id}`),
    create: (data: CreateVehicleDto) =>
      this.request<Vehicle>("/fleet/vehicles", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: UpdateVehicleDto) =>
      this.request<Vehicle>(`/fleet/vehicles/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      this.request<void>(`/fleet/vehicles/${id}`, { method: "DELETE" }),
  };

  // Drivers API
  drivers = {
    list: () => this.request<Driver[]>("/fleet/drivers"),
    get: (id: string) => this.request<Driver>(`/fleet/drivers/${id}`),
    create: (data: CreateDriverDto) =>
      this.request<Driver>("/fleet/drivers", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: UpdateDriverDto) =>
      this.request<Driver>(`/fleet/drivers/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  };

  // Orders API
  orders = {
    list: (params?: { status?: string; page?: number }) =>
      this.request<Order[]>("/orders", {
        params: params as Record<string, string>,
      }),
    get: (id: string) => this.request<Order>(`/orders/${id}`),
    create: (data: CreateOrderDto) =>
      this.request<Order>("/orders", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: UpdateOrderDto) =>
      this.request<Order>(`/orders/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    cancel: (id: string) =>
      this.request<Order>(`/orders/${id}/cancel`, { method: "POST" }),
  };

  // Routes API
  routes = {
    list: () => this.request<Route[]>("/vrp/routes"),
    get: (id: string) => this.request<Route>(`/vrp/routes/${id}`),
    optimize: (data: OptimizeRoutesDto) =>
      this.request<OptimizationResult>("/vrp/optimize", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  };

  // Analytics API
  analytics = {
    overview: () => this.request<AnalyticsOverview>("/analytics/overview"),
    deliveryTrends: (period: string) =>
      this.request<DeliveryTrend[]>("/analytics/delivery-trends", {
        params: { period },
      }),
    fleetEfficiency: () =>
      this.request<FleetEfficiency>("/analytics/fleet-efficiency"),
    emissions: (period: string) =>
      this.request<EmissionsData[]>("/analytics/emissions", {
        params: { period },
      }),
  };
}

// Types
export interface Vehicle {
  id: string;
  name: string;
  type: string;
  status: "active" | "idle" | "maintenance" | "offline";
  driver?: Driver;
  location?: { lat: number; lng: number };
  fuel: number;
  mileage: number;
  capacity: number;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "available" | "on-route" | "off-duty";
  skills: string[];
}

export interface Order {
  id: string;
  customer: string;
  address: string;
  items: number;
  weight: number;
  priority: "urgent" | "high" | "medium" | "low";
  status: "pending" | "in-transit" | "delivered" | "cancelled";
  timeWindow: { from: string; to: string };
  vehicle?: Vehicle;
  eta?: string;
}

export interface Route {
  id: string;
  name: string;
  driver: Driver;
  vehicle: Vehicle;
  stops: number;
  completed: number;
  distance: number;
  status: "pending" | "in-progress" | "completed" | "delayed";
  eta: string;
}

export interface OptimizationResult {
  routes: Route[];
  totalDistance: number;
  totalTime: number;
  costSavings: number;
  co2Savings: number;
}

export interface AnalyticsOverview {
  totalDeliveries: number;
  activeVehicles: number;
  fleetUtilization: number;
  avgDeliveryTime: number;
}

export interface DeliveryTrend {
  date: string;
  deliveries: number;
  onTime: number;
  delayed: number;
}

export interface FleetEfficiency {
  utilization: number;
  fuelEfficiency: number;
  maintenanceScore: number;
}

export interface EmissionsData {
  month: string;
  co2: number;
  target: number;
}

// DTOs
export interface CreateVehicleDto {
  name: string;
  type: string;
  capacity: number;
}

export interface UpdateVehicleDto extends Partial<CreateVehicleDto> {}

export interface CreateDriverDto {
  name: string;
  email: string;
  phone: string;
  skills?: string[];
}

export interface UpdateDriverDto extends Partial<CreateDriverDto> {}

export interface CreateOrderDto {
  customer: string;
  address: string;
  items: number;
  weight: number;
  priority: string;
  timeWindow: { from: string; to: string };
}

export interface UpdateOrderDto extends Partial<CreateOrderDto> {}

export interface OptimizeRoutesDto {
  orders: string[];
  vehicles: string[];
  constraints?: {
    maxDistance?: number;
    maxTime?: number;
    respectTimeWindows?: boolean;
  };
}

export const apiClient = new ApiClient(API_BASE_URL);
