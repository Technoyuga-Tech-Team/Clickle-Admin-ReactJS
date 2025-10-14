// Mock data for the admin panel

export const mockGames = [
  {
    id: "1",
    name: "Summer Championship 2024",
    date: "2024-06-15",
    location: "Central Court A",
    status: "Completed",
    players: 4,
    winner: "John Doe"
  },
  {
    id: "2",
    name: "Weekly Tournament #23",
    date: "2024-06-20",
    location: "Court B",
    status: "In Progress",
    players: 4,
    winner: "-"
  },
  {
    id: "3",
    name: "Regional Finals",
    date: "2024-06-25",
    location: "Main Arena",
    status: "Scheduled",
    players: 8,
    winner: "-"
  }
];

export const mockPlayers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 234 567 8900",
    gamesPlayed: 45,
    wins: 32,
    rank: "Pro",
    joinDate: "2023-01-15"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1 234 567 8901",
    gamesPlayed: 38,
    wins: 24,
    rank: "Intermediate",
    joinDate: "2023-03-20"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.j@email.com",
    phone: "+1 234 567 8902",
    gamesPlayed: 52,
    wins: 41,
    rank: "Pro",
    joinDate: "2022-11-10"
  }
];

export const mockPoints = [
  {
    id: "1",
    gameId: "1",
    gameName: "Summer Championship 2024",
    playerId: "1",
    playerName: "John Doe",
    points: 150,
    date: "2024-06-15"
  },
  {
    id: "2",
    gameId: "1",
    gameName: "Summer Championship 2024",
    playerId: "2",
    playerName: "Jane Smith",
    points: 120,
    date: "2024-06-15"
  },
  {
    id: "3",
    gameId: "2",
    gameName: "Weekly Tournament #23",
    playerId: "3",
    playerName: "Mike Johnson",
    points: 95,
    date: "2024-06-20"
  }
];

export const mockDevices = [
  {
    id: "1",
    deviceName: "Court Tablet A1",
    deviceType: "Tablet",
    serialNumber: "CLK-TAB-001",
    location: "Court A",
    status: "Active",
    lastSync: "2024-06-20 14:30"
  },
  {
    id: "2",
    deviceName: "Score Display B2",
    deviceType: "Display",
    serialNumber: "CLK-DSP-002",
    location: "Court B",
    status: "Active",
    lastSync: "2024-06-20 14:25"
  },
  {
    id: "3",
    deviceName: "Admin Console",
    deviceType: "Desktop",
    serialNumber: "CLK-DSK-003",
    location: "Admin Office",
    status: "Inactive",
    lastSync: "2024-06-19 18:00"
  }
];

export const mockDashboardStats = {
  totalGames: 127,
  totalPlayers: 342,
  activeGames: 8,
  totalPoints: 45280,
  recentGames: mockGames.slice(0, 5),
  topPlayers: mockPlayers.slice(0, 5)
};
