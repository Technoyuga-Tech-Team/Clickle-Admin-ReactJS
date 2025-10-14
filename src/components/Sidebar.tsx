import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Gamepad2, 
  Users, 
  Trophy, 
  Smartphone,
  LogOut
} from "lucide-react";
import { Button } from "./ui/button";

const menuItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Game Management", path: "/games", icon: Gamepad2 },
  { title: "Player Management", path: "/players", icon: Users },
  { title: "Point Management", path: "/points", icon: Trophy },
  { title: "Device Management", path: "/devices", icon: Smartphone },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-sidebar-foreground">Clicky</h1>
        <p className="text-sm text-sidebar-foreground/70 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-sidebar-foreground transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-accent/50"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => window.location.href = "/"}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
};
