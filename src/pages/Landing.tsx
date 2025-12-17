import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigate } from "react-router-dom";
import {
  Truck,
  MapPin,
  BarChart3,
  Clock,
  Shield,
  Zap,
  Route,
  Users,
  Package,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import heroImage from "@/assets/fleet_delivery_truck.jpg";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Route,
      title: "VRP Optimization",
      description:
        "Advanced vehicle routing algorithms minimize distance, time, and costs across your entire fleet.",
    },
    {
      icon: MapPin,
      title: "Real-time Tracking",
      description:
        "Monitor all vehicles in real-time with GPS integration and live map visualization.",
    },
    {
      icon: Clock,
      title: "Time Windows",
      description:
        "Honor customer time preferences with intelligent scheduling and constraint management.",
    },
    {
      icon: Truck,
      title: "Fleet Management",
      description:
        "Comprehensive vehicle and driver management with capacity planning and maintenance tracking.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Gain actionable insights with detailed performance metrics and cost analysis.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Role-based access control, audit logs, and compliance-ready security features.",
    },
  ];

  const stats = [
    { value: "35%", label: "Cost Reduction", icon: TrendingUp },
    { value: "10K+", label: "Routes Optimized", icon: Route },
    { value: "500+", label: "Vehicles Managed", icon: Truck },
    { value: "99.9%", label: "Uptime SLA", icon: Zap },
  ];

  const benefits = [
    {
      title: "Multi-Depot Optimization",
      description:
        "Manage multiple warehouses and distribution centers with intelligent load balancing and cross-depot routing.",
      features: [
        "Automatic depot assignment",
        "Load balancing algorithms",
        "Cross-depot transfers",
      ],
    },
    {
      title: "Dynamic Re-routing",
      description:
        "Adapt to real-world conditions with automatic route adjustments based on traffic, delays, and new orders.",
      features: ["Traffic integration", "Order insertion", "Delay management"],
    },
    {
      title: "Cost & Emissions Tracking",
      description:
        "Monitor and optimize both operational costs and environmental impact with detailed reporting.",
      features: [
        "Fuel consumption analytics",
        "CO2 emission reports",
        "Cost per delivery metrics",
      ],
    },
  ];

  const handleSignIn = () => {
    localStorage.setItem(
      "dev_user",
      JSON.stringify({
        id: "dev",
        email: "dev@local",
        firstName: "Dev",
        lastName: "User",
      })
    );
    localStorage.setItem("dev_signed_in", "true");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Truck className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">FleetOptima</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#benefits"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Benefits
            </a>
            <a
              href="#stats"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Results
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button onClick={handleSignIn}>Sign In</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Optimize Your Fleet.
                <br />
                <span className="text-primary">Maximize Efficiency.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Enterprise-grade vehicle routing platform that reduces costs by
                up to 35% while improving delivery times and customer
                satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={handleSignIn} className="gap-2">
                  Start Optimizing Routes
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#features">View Features</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="Fleet delivery truck"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Cost Savings
                    </p>
                    <p className="text-xl font-bold">35% Reduction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage and optimize your fleet operations
              at enterprise scale.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group hover:shadow-lg transition-all hover:border-primary/50"
              >
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className="h-6 w-6 opacity-80" />
                  <span className="text-3xl md:text-4xl font-bold">
                    {stat.value}
                  </span>
                </div>
                <p className="text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Enterprise Benefits
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for scale, designed for efficiency, trusted by industry
              leaders.
            </p>
          </div>
          <div className="space-y-12">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {benefit.description}
                  </p>
                  <ul className="space-y-3">
                    {benefit.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
                    <CardContent className="p-8 flex items-center justify-center min-h-[250px]">
                      <div className="text-center">
                        {index === 0 && (
                          <Package className="h-16 w-16 text-primary mx-auto mb-4" />
                        )}
                        {index === 1 && (
                          <Route className="h-16 w-16 text-primary mx-auto mb-4" />
                        )}
                        {index === 2 && (
                          <BarChart3 className="h-16 w-16 text-primary mx-auto mb-4" />
                        )}
                        <p className="text-muted-foreground">Feature Preview</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Optimize Your Fleet?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of logistics companies already saving time and money
            with FleetOptima.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={handleSignIn}
            className="gap-2"
          >
            Get Started Now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Truck className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold">FleetOptima</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Enterprise vehicle routing optimization platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#features"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} FleetOptima. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
