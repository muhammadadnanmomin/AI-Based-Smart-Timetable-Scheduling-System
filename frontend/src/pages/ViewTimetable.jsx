import { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import TimetableGrid from "@/components/timetable/TimetableGrid";
import { Button } from "@/components/ui/button";

function ViewTimetable() {
  const [data, setData] = useState({
    status: "idle",
    timetable: [],
    conflicts: [],
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadTimetable = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/timetable/load");

      setData({
        status: "success",
        timetable: res.data || [],
        conflicts: [],
      });

      toast({ title: "Timetable loaded" });
    } catch (err) {
      console.error(err);
      toast({ title: "Failed to load timetable", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const autoFix = async () => {
    try {
      const res = await axios.post("http://localhost:8000/auto-fix", {
        timetable: data.timetable,
      });

      setData((prev) => ({
        ...prev,
        timetable: res.data.timetable || [],
        conflicts: res.data.conflicts || [],
      }));

      toast({ title: "Conflicts auto-fixed" });
    } catch (err) {
      console.error(err);
      toast({ title: "Auto-fix failed", variant: "destructive" });
    }
  };

  useEffect(() => {
    loadTimetable();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Timetable</h1>

        {loading && <div>Loading...</div>}

        {!loading && data.status === "success" && (
          <>
            <div className="flex gap-4">
              <Button onClick={loadTimetable} variant="outline">
                Reload
              </Button>

              <Button
                onClick={autoFix}
                className="bg-orange-600 text-white hover:bg-orange-700"
              >
                Auto-Fix Conflicts
              </Button>
            </div>

            <TimetableGrid
              timetable={data.timetable}
              conflicts={data.conflicts}
            />
          </>
        )}
      </div>
    </AppLayout>
  );
}

export default ViewTimetable;
