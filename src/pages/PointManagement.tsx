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
import { mockPoints } from "@/lib/mockData";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const PointManagement = () => {
  const [points, setPoints] = useState(mockPoints);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  const handleDelete = (id: string) => {
    setPoints(points.filter((point) => point.id !== id));
    toast.success("Point record deleted successfully");
  };

  const handleView = (point: any) => {
    setSelectedPoint(point);
    setIsViewOpen(true);
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Point Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage player points and scores
            </p>
          </div>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button variant="success" size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Add Points
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Point Record</DialogTitle>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="game">Game</Label>
                  <Input id="game" placeholder="Select game" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="player">Player</Label>
                  <Input id="player" placeholder="Select player" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="points">Points</Label>
                  <Input id="points" type="number" placeholder="Enter points" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
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
                      toast.success("Point record added successfully");
                      setIsAddOpen(false);
                    }}
                  >
                    Add Points
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
                <TableHead>Game</TableHead>
                <TableHead>Player</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {points.map((point) => (
                <TableRow key={point.id}>
                  <TableCell className="font-medium">{point.gameName}</TableCell>
                  <TableCell>{point.playerName}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs font-medium bg-success text-success-foreground">
                      {point.points}
                    </span>
                  </TableCell>
                  <TableCell>{point.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(point)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(point.id)}
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
              <DialogTitle>Point Record Details</DialogTitle>
            </DialogHeader>
            {selectedPoint && (
              <div className="space-y-4 mt-4">
                <div>
                  <Label className="text-muted-foreground">Game</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedPoint.gameName}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Player</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedPoint.playerName}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Points</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedPoint.points}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Date</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedPoint.date}
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

export default PointManagement;
