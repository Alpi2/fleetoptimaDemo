import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, MapPin, Clock, User } from "lucide-react";

interface OrderFormProps {
  onSubmit?: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
}

export function OrderForm({ onSubmit, onCancel }: OrderFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
          <User className="h-5 w-5 text-fleet-blue" />
          Customer Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="customerName" className="text-foreground">
              Customer Name
            </Label>
            <Input
              id="customerName"
              placeholder="Enter customer name"
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
        </div>
      </div>

      {/* Delivery Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-fleet-green" />
          Delivery Address
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address" className="text-foreground">
              Street Address
            </Label>
            <Input
              id="address"
              placeholder="123 Main Street"
              className="bg-background/50"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-foreground">
                City
              </Label>
              <Input
                id="city"
                placeholder="City"
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state" className="text-foreground">
                State
              </Label>
              <Input
                id="state"
                placeholder="State"
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip" className="text-foreground">
                ZIP Code
              </Label>
              <Input
                id="zip"
                placeholder="12345"
                className="bg-background/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
          <Package className="h-5 w-5 text-fleet-purple" />
          Order Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="items" className="text-foreground">
              Number of Items
            </Label>
            <Input
              id="items"
              type="number"
              placeholder="1"
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-foreground">
              Total Weight (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              placeholder="0.0"
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority" className="text-foreground">
              Priority
            </Label>
            <Select defaultValue="medium">
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicle" className="text-foreground">
              Assign Vehicle
            </Label>
            <Select>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select vehicle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-assign</SelectItem>
                <SelectItem value="trk-2847">TRK-2847</SelectItem>
                <SelectItem value="trk-1923">TRK-1923</SelectItem>
                <SelectItem value="trk-3421">TRK-3421</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Time Window */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
          <Clock className="h-5 w-5 text-warning" />
          Time Window
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="timeFrom" className="text-foreground">
              From
            </Label>
            <Input id="timeFrom" type="time" className="bg-background/50" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeTo" className="text-foreground">
              To
            </Label>
            <Input id="timeTo" type="time" className="bg-background/50" />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes" className="text-foreground">
          Special Instructions
        </Label>
        <Textarea
          id="notes"
          placeholder="Any special delivery instructions..."
          className="bg-background/50 min-h-[100px]"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-fleet-blue hover:bg-fleet-blue/90">
          Create Order
        </Button>
      </div>
    </form>
  );
}
