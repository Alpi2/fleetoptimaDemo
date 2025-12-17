import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Truck, Mail, Lock, Eye, EyeOff, User, Building } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-fleet-blue to-fleet-purple flex items-center justify-center">
            <Truck className="h-7 w-7 text-primary-foreground" />
          </div>
          <span className="text-3xl font-bold gradient-text">FleetOptima</span>
        </div>

        <Card className="glass border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">
              Create Account
            </CardTitle>
            <CardDescription>
              Get started with FleetOptima today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="pl-10 bg-background/50"
                    />
                  </div>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-foreground">
                  Company
                </Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="company"
                    placeholder="Your Company"
                    className="pl-10 bg-background/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    className="pl-10 bg-background/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-background/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters with uppercase, lowercase and
                  number
                </p>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox id="terms" className="mt-1" />
                <Label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground cursor-pointer leading-5"
                >
                  I agree to the{" "}
                  <Link to="/terms" className="text-fleet-blue hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-fleet-blue hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-fleet-blue hover:bg-fleet-blue/90"
              >
                Create Account
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-fleet-blue hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
