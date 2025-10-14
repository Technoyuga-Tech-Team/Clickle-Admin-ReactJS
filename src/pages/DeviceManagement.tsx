import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockDevices } from "@/lib/mockData";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const DeviceManagement = () => {
  const [devices, setDevices] = useState(mockDevices);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);

  const handleDelete = (id: string) => {
    setDevices(devices.filter((device) => device.id !== id));
    toast.success("Device deleted successfully");
  };

  const handleView = (device: any) => {
    setSelectedDevice(device);
    setIsViewOpen(true);
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Device Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage all connected devices
            </p>
          </div>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button variant="success" size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Add Device
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Device</DialogTitle>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="deviceName">Device Name</Label>
                  <Input id="deviceName" placeholder="Enter device name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deviceType">Device Type</Label>
                  <Input id="deviceType" placeholder="Tablet/Display/Desktop" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Serial Number</Label>
                  <Input id="serialNumber" placeholder="CLK-XXX-000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter location" />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsAddOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="success"
                    className="flex-1"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.success("Device added successfully");
                      setIsAddOpen(false);
                    }}
                  >
                    Add Device
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Serial Number</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell className="font-medium">
                    {device.deviceName}
                  </TableCell>
                  <TableCell>{device.deviceType}</TableCell>
                  <TableCell>{device.serialNumber}</TableCell>
                  <TableCell>{device.location}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs font-medium ${
                        device.status === "Active"
                          ? "bg-success text-success-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {device.status}
                    </span>
                  </TableCell>
                  <TableCell>{device.lastSync}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(device)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(device.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Device Details</DialogTitle>
            </DialogHeader>
            {selectedDevice && (
              <div className="space-y-4 mt-4">
                <div>
                  <Label className="text-muted-foreground">Device Name</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedDevice.deviceName}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Device Type</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedDevice.deviceType}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Serial Number</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedDevice.serialNumber}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Location</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedDevice.location}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedDevice.status}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Last Sync</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedDevice.lastSync}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default DeviceManagement;
