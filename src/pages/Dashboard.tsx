import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { mockDashboardStats } from "@/lib/mockData";
import { Gamepad2, Users, Trophy, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Games",
      value: mockDashboardStats.totalGames,
      icon: Gamepad2,
      color: "text-accent"
    },
    {
      title: "Total Players",
      value: mockDashboardStats.totalPlayers,
      icon: Users,
      color: "text-success"
    },
    {
      title: "Active Games",
      value: mockDashboardStats.activeGames,
      icon: TrendingUp,
      color: "text-primary"
    },
    {
      title: "Total Points",
      value: mockDashboardStats.totalPoints.toLocaleString(),
      icon: Trophy,
      color: "text-accent"
    }
  ];

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome to Clicky Admin Panel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 bg-secondary ${stat.color}`}>
                  <stat.icon className="h-8 w-8" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Recent Games
            </h2>
            <div className="space-y-4">
              {mockDashboardStats.recentGames.map((game) => (
                <div
                  key={game.id}
                  className="flex items-center justify-between p-4 bg-secondary"
                >
                  <div>
                    <p className="font-medium text-foreground">{game.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {game.location} • {game.date}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium ${
                      game.status === "Completed"
                        ? "bg-success text-success-foreground"
                        : game.status === "In Progress"
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {game.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Top Players
            </h2>
            <div className="space-y-4">
              {mockDashboardStats.topPlayers.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-4 bg-secondary"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {player.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {player.gamesPlayed} games • {player.wins} wins
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium bg-accent text-accent-foreground">
                    {player.rank}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
