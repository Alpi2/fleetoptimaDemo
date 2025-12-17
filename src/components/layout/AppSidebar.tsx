import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Route,
  Package,
  Truck,
  BarChart3,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  Users,
  MapPin,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Routes", href: "/routes", icon: Route, badge: "Live" },
  { name: "Orders", href: "/orders", icon: Package, badge: "24" },
  { name: "Fleet", href: "/fleet", icon: Truck },
  { name: "Drivers", href: "/drivers", icon: Users },
  { name: "Tracking", href: "/tracking", icon: MapPin, badge: "Active" },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

const bottomNavigation = [
  { name: "Notifications", href: "/notifications", icon: Bell, badge: "3" },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center w-full"
          )}
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
            <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-accent animate-pulse" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">
                FleetOptima
              </span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                Enterprise VRP
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon
                  className={cn("h-5 w-5 shrink-0", isActive && "text-primary")}
                />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge
                        variant={
                          item.badge === "Live" || item.badge === "Active"
                            ? "default"
                            : "secondary"
                        }
                        className={cn(
                          "h-5 text-[10px] font-semibold",
                          item.badge === "Live" &&
                            "bg-accent text-accent-foreground",
                          item.badge === "Active" &&
                            "bg-primary text-primary-foreground"
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-sidebar-border p-3 space-y-1">
        {bottomNavigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge
                      variant="destructive"
                      className="h-5 text-[10px] font-semibold"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        {/* Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full justify-center text-muted-foreground hover:text-foreground mt-2",
            !collapsed && "justify-start px-3"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
