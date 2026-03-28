import { useState, useEffect } from "react";
import AppLayout from "@/layouts/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Presentation, BookOpen, Building2, Loader2 } from "lucide-react";
import { getTeachers, getClasses, getSubjects, getRooms } from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    teachers: 0,
    classes: 0,
    subjects: 0,
    rooms: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [teachersRes, classesRes, subjectsRes, roomsRes] = await Promise.all([
          getTeachers(),
          getClasses(),
          getSubjects(),
          getRooms()
        ]);
        
        if (isMounted) {
          setStats({
            teachers: teachersRes.data.length || 0,
            classes: classesRes.data.length || 0,
            subjects: subjectsRes.data.length || 0,
            rooms: roomsRes.data.length || 0
          });
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Overview of your timetable system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Users className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Teachers</p>
              <p className="text-2xl font-semibold text-slate-900">{loading ? "..." : stats.teachers}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Presentation className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Classes</p>
              <p className="text-2xl font-semibold text-slate-900">{loading ? "..." : stats.classes}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg shrink-0">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <BookOpen className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Subjects</p>
              <p className="text-2xl font-semibold text-slate-900">{loading ? "..." : stats.subjects}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg shrink-0">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Building2 className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Rooms</p>
              <p className="text-2xl font-semibold text-slate-900">{loading ? "..." : stats.rooms}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

export default Dashboard;
