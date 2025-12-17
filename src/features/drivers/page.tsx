import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Plus,
  Phone,
  Mail,
  MapPin,
  Star,
  Clock,
  Truck,
} from "lucide-react";

const drivers = [
  {
    id: "DRV-001",
    name: "Anton Walter",
    avatar: "",
    phone: "+90 555 123 4567",
    email: "anton.walter@fleet.com",
    status: "active",
    vehicle: "GB ABC 123",
    rating: 4.8,
    deliveries: 1247,
    hoursToday: 6.5,
    location: "Munich, Germany",
    skills: ["ADR", "Cold Chain"],
  },
  {
    id: "DRV-002",
    name: "James Smith",
    avatar: "",
    phone: "+49 555 234 5678",
    email: "james.smith@fleet.com",
    status: "on_route",
    vehicle: "GB DEF 456",
    rating: 4.6,
    deliveries: 892,
    hoursToday: 4.2,
    location: "Prague, Czechia",
    skills: ["Heavy Vehicle"],
  },
  {
    id: "DRV-003",
    name: "Anton Hermann",
    avatar: "",
    phone: "+90 555 345 6789",
    email: "anton.hermann@fleet.com",
    status: "break",
    vehicle: "GB GHI 789",
    rating: 4.9,
    deliveries: 2103,
    hoursToday: 3.0,
    location: "Hamburg, Germany",
    skills: ["ADR", "Heavy Vehicle", "Cold Chain"],
  },
  {
    id: "DRV-004",
    name: "Heidi Müller",
    avatar: "",
    phone: "+55 555 456 7890",
    email: "heidi.mueller@fleet.com",
    status: "offline",
    vehicle: "GB JKL 012",
    rating: 4.5,
    deliveries: 654,
    hoursToday: 0,
    location: "Düseldorf, Germany",
    skills: ["Cold Chain"],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-accent/20 text-accent border-accent/30";
    case "on_route":
      return "bg-primary/20 text-primary border-primary/30";
    case "break":
      return "bg-warning/20 text-warning border-warning/30";
    case "offline":
      return "bg-muted text-muted-foreground border-border";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Active";
    case "on_route":
      return "On Route";
    case "break":
      return "On Break";
    case "offline":
      return "Offline";
    default:
      return status;
  }
};

export default function DriversPage() {
  return (
    <DashboardLayout
      title="Drivers"
      subtitle="Driver management and performance tracking"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Button className="gap-2 ml-auto">
            <Plus className="h-4 w-4" />
            Add Driver
          </Button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Sürücü ara..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-accent/20"
            >
              All
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-accent/20"
            >
              Active
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-accent/20"
            >
              On Route
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-accent/20"
            >
              On Break
            </Badge>
          </div>
        </div>

        {/* Drivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {drivers.map((driver) => (
            <Card
              key={driver.id}
              className="group hover:border-primary/30 transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-border">
                      <AvatarImage src={driver.avatar} />
                      <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                        {driver.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{driver.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {driver.id}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(driver.status)}>
                    {getStatusText(driver.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" />
                    <span>{driver.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{driver.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{driver.location}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-warning">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span className="font-semibold">{driver.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Point</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-primary">
                      <Truck className="h-3.5 w-3.5" />
                      <span className="font-semibold">{driver.deliveries}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Deliveries</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-accent">
                      <Clock className="h-3.5 w-3.5" />
                      <span className="font-semibold">
                        {driver.hoursToday}s
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {driver.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Vehicle */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    Vehicle:
                  </span>
                  <Badge variant="outline">{driver.vehicle}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
