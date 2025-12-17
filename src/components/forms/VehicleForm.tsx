import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Truck, Fuel, Settings } from "lucide-react";

interface VehicleFormProps {
  onSubmit?: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
}

export function VehicleForm({ onSubmit, onCancel }: VehicleFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Vehicle Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
          <Truck className="h-5 w-5 text-fleet-blue" />
          Vehicle Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vehicleId" className="text-foreground">
              Vehicle ID
            </Label>
            <Input
              id="vehicleId"
              placeholder="TRK-0000"
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicleName" className="text-foreground">
              Vehicle Name
            </Label>
            <Input
              id="vehicleName"
              placeholder="Mercedes Actros"
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type" className="text-foreground">
              Vehicle Type
            </Label>
            <Select defaultValue="heavy">
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="heavy">Heavy Truck</SelectItem>
                <SelectItem value="medium">Medium Truck</SelectItem>
                <SelectItem value="van">Delivery Van</SelectItem>
                <SelectItem value="light">Light Vehicle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="licensePlate" className="text-foreground">
              License Plate
            </Label>
            <Input
              id="licensePlate"
              placeholder="ABC-1234"
              className="bg-background/50"
            />
          </div>
        </div>
      </div>

      {/* Capacity */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-fleet-purple" />
          Capacity & Specifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="capacity" className="text-foreground">
              Max Capacity (tons)
            </Label>
            <Input
              id="capacity"
              type="number"
              step="0.1"
              placeholder="20"
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="volume" className="text-foreground">
              Volume (m³)
            </Label>
            <Input
              id="volume"
              type="number"
              step="0.1"
              placeholder="50"
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxSpeed" className="text-foreground">
              Max Speed (km/h)
            </Label>
            <Input
              id="maxSpeed"
              type="number"
              placeholder="120"
              className="bg-background/50"
            />
          </div>
        </div>
      </div>

      {/* Fuel */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
          <Fuel className="h-5 w-5 text-fleet-green" />
          Fuel Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fuelType" className="text-foreground">
              Fuel Type
            </Label>
            <Select defaultValue="diesel">
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="gasoline">Gasoline</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tankCapacity" className="text-foreground">
              Tank Capacity (L)
            </Label>
            <Input
              id="tankCapacity"
              type="number"
              placeholder="400"
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="consumption" className="text-foreground">
              Avg. Consumption (L/100km)
            </Label>
            <Input
              id="consumption"
              type="number"
              step="0.1"
              placeholder="8.5"
              className="bg-background/50"
            />
          </div>
        </div>
      </div>

      {/* Driver Assignment */}
      <div className="space-y-2">
        <Label htmlFor="driver" className="text-foreground">
          Assign Driver
        </Label>
        <Select>
          <SelectTrigger className="bg-background/50">
            <SelectValue placeholder="Select driver (optional)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Unassigned</SelectItem>
            <SelectItem value="john">John Smith</SelectItem>
            <SelectItem value="sarah">Sarah Johnson</SelectItem>
            <SelectItem value="mike">Mike Davis</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-fleet-blue hover:bg-fleet-blue/90">
          Add Vehicle
        </Button>
      </div>
    </form>
  );
}
