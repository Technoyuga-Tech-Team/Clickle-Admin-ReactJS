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
import { mockPlayers } from "@/lib/mockData";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const PlayerManagement = () => {
  const [players, setPlayers] = useState(mockPlayers);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  const handleDelete = (id: string) => {
    setPlayers(players.filter((player) => player.id !== id));
    toast.success("Player deleted successfully");
  };

  const handleView = (player: any) => {
    setSelectedPlayer(player);
    setIsViewOpen(true);
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Player Management
            </h1>
            <p className="text-muted-foreground mt-2">Manage all players</p>
          </div>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button variant="success" size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Add Player
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Player</DialogTitle>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Player Name</Label>
                  <Input id="name" placeholder="Enter player name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="player@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1 234 567 8900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rank">Rank</Label>
                  <Input id="rank" placeholder="Beginner/Intermediate/Pro" />
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
                      toast.success("Player added successfully");
                      setIsAddOpen(false);
                    }}
                  >
                    Add Player
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Games Played</TableHead>
                <TableHead>Wins</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.id}>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell>{player.email}</TableCell>
                  <TableCell>{player.phone}</TableCell>
                  <TableCell>{player.gamesPlayed}</TableCell>
                  <TableCell>{player.wins}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground">
                      {player.rank}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(player)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(player.id)}
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
              <DialogTitle>Player Details</DialogTitle>
            </DialogHeader>
            {selectedPlayer && (
              <div className="space-y-4 mt-4">
                <div>
                  <Label className="text-muted-foreground">Name</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedPlayer.name}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedPlayer.email}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedPlayer.phone}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Games Played</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedPlayer.gamesPlayed}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Wins</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedPlayer.wins}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Rank</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedPlayer.rank}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Join Date</Label>
                  <p className="text-foreground font-medium mt-1">
                    {selectedPlayer.joinDate}
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

export default PlayerManagement;
