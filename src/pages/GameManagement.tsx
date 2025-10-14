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
import { mockGames } from "@/lib/mockData";
import { Plus, Eye, Pencil, Trash2, Gamepad2 } from "lucide-react";
import { toast } from "sonner";

const GameManagement = () => {
  const [games, setGames] = useState(mockGames);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);

  const handleDelete = (id: string) => {
    setGames(games.filter((game) => game.id !== id));
    toast.success("Game deleted successfully");
  };

  const handleView = (game: any) => {
    setSelectedGame(game);
    setIsViewOpen(true);
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Game Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage all pickleball games
            </p>
          </div>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button variant="success" size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Add Game
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md animate-scale-in">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  Add New Game
                  <Gamepad2 className="h-5 w-5 text-accent animate-wiggle" />
                </DialogTitle>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Game Name</Label>
                  <Input id="name" placeholder="Enter game name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter location" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="players">Number of Players</Label>
                  <Input id="players" type="number" placeholder="4" />
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
                      toast.success("Game added successfully");
                      setIsAddOpen(false);
                    }}
                  >
                    Add Game
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="animate-fade-in-up hover-lift">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Players</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Winner</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {games.map((game, index) => (
                <TableRow 
                  key={game.id} 
                  className="hover:bg-secondary/50 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <TableCell className="font-medium">{game.name}</TableCell>
                  <TableCell>{game.date}</TableCell>
                  <TableCell>{game.location}</TableCell>
                  <TableCell>{game.players}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs font-medium transition-all duration-300 ${
                        game.status === "Completed"
                          ? "bg-success text-success-foreground"
                          : game.status === "In Progress"
                          ? "bg-accent text-accent-foreground animate-pulse-glow"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {game.status}
                    </span>
                  </TableCell>
                  <TableCell>{game.winner}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(game)}
                        className="hover-scale"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover-scale">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(game.id)}
                        className="hover-scale"
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
          <DialogContent className="max-w-md animate-scale-in">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Game Details
                <Eye className="h-5 w-5 text-accent" />
              </DialogTitle>
            </DialogHeader>
            {selectedGame && (
              <div className="space-y-4 mt-4">
                <div>
                  <Label className="text-muted-foreground">Game Name</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedGame.name}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Date</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedGame.date}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Location</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedGame.location}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Players</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedGame.players}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedGame.status}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Winner</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedGame.winner}
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

export default GameManagement;
