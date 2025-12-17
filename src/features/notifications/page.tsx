import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  Truck,
  MapPin,
  Clock,
  Fuel,
  Wrench,
  Package,
  Settings,
  CheckCheck,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "warning",
    title: "Low Fuel Level",
    message: "Vehicle with plate 34 ABC 123 has a fuel level below 15%.",
    time: "5 minutes ago",
    read: false,
    icon: Fuel,
  },
  {
    id: 2,
    type: "success",
    title: "Delivery Completed",
    message: "Order ORD-2024-001 has been successfully delivered.",
    time: "12 minutes ago",
    read: false,
    icon: Package,
  },
  {
    id: 3,
    type: "info",
    title: "Route Updated",
    message:
      "Route R-2024-003 has been re-optimized based on traffic conditions.",
    time: "25 minutes ago",
    read: false,
    icon: MapPin,
  },
  {
    id: 4,
    type: "warning",
    title: "Maintenance Reminder",
    message: "Vehicle with plate 34 DEF 456 is due for periodic maintenance.",
    time: "1 hour ago",
    read: true,
    icon: Wrench,
  },
  {
    id: 5,
    type: "error",
    title: "Route Deviation Detected",
    message:
      "Vehicle with plate 34 GHI 789 has deviated from the designated route.",
    time: "2 hours ago",
    read: true,
    icon: AlertTriangle,
  },
  {
    id: 6,
    type: "success",
    title: "Driver Login",
    message: "Anton Walter has logged in and started the shift.",
    time: "3 hours ago",
    read: true,
    icon: Truck,
  },
  {
    id: 7,
    type: "info",
    title: "System Update",
    message: "FleetOptima v2.1.0 update has been successfully applied.",
    time: "5 hours ago",
    read: true,
    icon: Settings,
  },
];

const getTypeStyles = (type: string) => {
  switch (type) {
    case "warning":
      return {
        bg: "bg-warning/10",
        border: "border-warning/30",
        icon: "text-warning",
      };
    case "success":
      return {
        bg: "bg-accent/10",
        border: "border-accent/30",
        icon: "text-accent",
      };
    case "error":
      return {
        bg: "bg-destructive/10",
        border: "border-destructive/30",
        icon: "text-destructive",
      };
    default:
      return {
        bg: "bg-primary/10",
        border: "border-primary/30",
        icon: "text-primary",
      };
  }
};

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DashboardLayout
      title="Bildirimler"
      subtitle={`${unreadCount} okunmamış bildirim`}
    >
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex justify-end">
          <Button variant="outline" className="gap-2">
            <CheckCheck className="h-4 w-4" />
            Mark All as Read
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {notifications.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {notifications.filter((n) => n.type === "warning").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Warning</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <CheckCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {notifications.filter((n) => n.type === "success").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Success</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Info className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {notifications.filter((n) => n.type === "info").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Info</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="warnings">Warnings</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3 pr-4">
                    {notifications.map((notification) => {
                      const styles = getTypeStyles(notification.type);
                      const Icon = notification.icon;
                      return (
                        <div
                          key={notification.id}
                          className={`p-4 rounded-lg border ${styles.border} ${
                            styles.bg
                          } ${
                            !notification.read ? "ring-1 ring-primary/20" : ""
                          } transition-all hover:shadow-md cursor-pointer`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`p-2 rounded-lg bg-background/50 ${styles.icon}`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <p className="font-medium text-foreground">
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <Badge className="bg-primary text-primary-foreground text-xs">
                                    New
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{notification.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="unread" className="mt-4">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3 pr-4">
                    {notifications
                      .filter((n) => !n.read)
                      .map((notification) => {
                        const styles = getTypeStyles(notification.type);
                        const Icon = notification.icon;
                        return (
                          <div
                            key={notification.id}
                            className={`p-4 rounded-lg border ${styles.border} ${styles.bg} ring-1 ring-primary/20 transition-all hover:shadow-md cursor-pointer`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`p-2 rounded-lg bg-background/50 ${styles.icon}`}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <p className="font-medium text-foreground">
                                    {notification.title}
                                  </p>
                                  <Badge className="bg-primary text-primary-foreground text-xs">
                                    New
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{notification.time}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="warnings" className="mt-4">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3 pr-4">
                    {notifications
                      .filter((n) => n.type === "warning" || n.type === "error")
                      .map((notification) => {
                        const styles = getTypeStyles(notification.type);
                        const Icon = notification.icon;
                        return (
                          <div
                            key={notification.id}
                            className={`p-4 rounded-lg border ${styles.border} ${styles.bg} transition-all hover:shadow-md cursor-pointer`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`p-2 rounded-lg bg-background/50 ${styles.icon}`}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{notification.time}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="info" className="mt-4">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3 pr-4">
                    {notifications
                      .filter((n) => n.type === "info" || n.type === "success")
                      .map((notification) => {
                        const styles = getTypeStyles(notification.type);
                        const Icon = notification.icon;
                        return (
                          <div
                            key={notification.id}
                            className={`p-4 rounded-lg border ${styles.border} ${styles.bg} transition-all hover:shadow-md cursor-pointer`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`p-2 rounded-lg bg-background/50 ${styles.icon}`}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{notification.time}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </DashboardLayout>
  );
}
