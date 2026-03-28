import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, BookOpen, Presentation, Building2,
  CalendarDays, Clock, Settings2, ShieldBan, Wand2, TableIcon
} from "lucide-react";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Teachers", path: "/teachers", icon: Users },
  { name: "Subjects", path: "/subjects", icon: BookOpen },
  { name: "Classes", path: "/classes", icon: Presentation },
  { name: "Rooms", path: "/rooms", icon: Building2 },
  { name: "Days", path: "/days", icon: CalendarDays },
  { name: "Time Slots", path: "/timeslots", icon: Clock },
  { name: "Preferences", path: "/preferences", icon: Settings2 },
  { name: "Constraints", path: "/constraints", icon: ShieldBan },
  { name: "Generate", path: "/generate", icon: Wand2 },
  { name: "Timetable", path: "/timetable", icon: TableIcon },
];

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-slate-200 bg-white p-4 hidden md:flex flex-col shrink-0">
      <div className="flex items-center gap-2 px-2 mb-8 mt-2">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shrink-0">
          <CalendarDays className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">SmartTT</h1>
      </div>
      <nav className="space-y-1 flex-1">
        {menu.map((item) => {
          const active = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className={cn("w-4 h-4", active ? "text-blue-700" : "text-slate-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
