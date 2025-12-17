import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Building,
  Key,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout
      title="Settings"
      subtitle="Configure your account and organization"
    >
      <div className="space-y-6 animate-fade-in">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-background"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-background"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-background"
            >
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="data-[state=active]:bg-background"
            >
              <Palette className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger
              value="organization"
              className="data-[state=active]:bg-background"
            >
              <Building className="h-4 w-4 mr-2" />
              Organization
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Profile Settings
                </CardTitle>
                <CardDescription>
                  Manage your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-fleet-blue to-fleet-purple flex items-center justify-center text-primary-foreground text-2xl font-bold">
                    JD
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG or GIF. Max 2MB
                    </p>
                  </div>
                </div>

                <Separator className="bg-border/50" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@fleetoptima.com"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-foreground">
                      Role
                    </Label>
                    <Select defaultValue="admin">
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="manager">Fleet Manager</SelectItem>
                        <SelectItem value="dispatcher">Dispatcher</SelectItem>
                        <SelectItem value="driver">Driver</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-foreground">
                      Timezone
                    </Label>
                    <Select defaultValue="utc-5">
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-8">
                          Pacific Time (UTC-8)
                        </SelectItem>
                        <SelectItem value="utc-5">
                          Eastern Time (UTC-5)
                        </SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="utc+1">
                          Central European (UTC+1)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-fleet-blue hover:bg-fleet-blue/90">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Route Alerts
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Get notified about delays and route changes
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator className="bg-border/50" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Delivery Updates
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Notifications for completed deliveries
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator className="bg-border/50" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Vehicle Maintenance
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Alerts for upcoming maintenance schedules
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator className="bg-border/50" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Driver Status
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Updates on driver availability and status
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Separator className="bg-border/50" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Email Digest
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Daily summary of fleet activities
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security and authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-4">
                      Change Password
                    </h3>
                    <div className="space-y-4 max-w-md">
                      <div className="space-y-2">
                        <Label
                          htmlFor="currentPassword"
                          className="text-foreground"
                        >
                          Current Password
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="newPassword"
                          className="text-foreground"
                        >
                          New Password
                        </Label>
                        <Input
                          id="newPassword"
                          type="password"
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="confirmPassword"
                          className="text-foreground"
                        >
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          className="bg-background/50"
                        />
                      </div>
                      <Button className="bg-fleet-blue hover:bg-fleet-blue/90">
                        <Key className="h-4 w-4 mr-2" />
                        Update Password
                      </Button>
                    </div>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Two-Factor Authentication
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Session Management
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Manage active sessions across devices
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Sessions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Appearance Settings
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Theme</Label>
                    <Select defaultValue="dark">
                      <SelectTrigger className="bg-background/50 w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="space-y-2">
                    <Label className="text-foreground">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="bg-background/50 w-[200px]">
                        <Globe className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="tr">Türkçe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Compact Mode
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Reduce spacing for more content on screen
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Animations</p>
                      <p className="text-sm text-muted-foreground">
                        Enable smooth transitions and animations
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Organization Tab */}
          <TabsContent value="organization">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Organization Settings
                </CardTitle>
                <CardDescription>
                  Manage your organization's fleet settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="orgName" className="text-foreground">
                      Organization Name
                    </Label>
                    <Input
                      id="orgName"
                      placeholder="FleetOptima Inc."
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orgId" className="text-foreground">
                      Organization ID
                    </Label>
                    <Input
                      id="orgId"
                      value="ORG-2024-001"
                      disabled
                      className="bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-foreground">
                      Address
                    </Label>
                    <Input
                      id="address"
                      placeholder="123 Business Park"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-foreground">
                      Country
                    </Label>
                    <Select defaultValue="us">
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="tr">Turkey</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="bg-border/50" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">
                    Fleet Defaults
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-foreground">
                        Default Distance Unit
                      </Label>
                      <Select defaultValue="km">
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="km">Kilometers</SelectItem>
                          <SelectItem value="mi">Miles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">Fuel Unit</Label>
                      <Select defaultValue="l">
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="l">Liters</SelectItem>
                          <SelectItem value="gal">Gallons</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-fleet-blue hover:bg-fleet-blue/90">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
