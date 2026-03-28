import { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import PreferencesTable from "@/components/preferences/PreferencesTable";
import AddPreferenceDialog from "@/components/preferences/AddPreferenceDialog";
import {
  getPreferences,
  createPreference,
  deletePreference,
  updatePreference,
} from "@/services/preferences";
import { getTeachers } from "@/services/teachers";
import { getDays } from "@/services/days";
import { getTimeSlots } from "@/services/timeslots";
import { useToast } from "@/components/ui/use-toast";

function Preferences() {
  const [preferences, setPreferences] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [days, setDays] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadData = async () => {
    try {
      setLoading(true);
      const [prefs, tchs, dys, slts] = await Promise.all([
        getPreferences(),
        getTeachers(),
        getDays(),
        getTimeSlots(),
      ]);

      setPreferences(prefs);
      setTeachers(tchs);
      setDays(dys);
      setSlots(slts);
    } catch {
      toast({ title: "Error loading preferences" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async (data) => {
    try {
      await createPreference(data);
      toast({ title: "Preference added" });
      loadData();
    } catch {
      toast({ title: "Failed to add preference" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePreference(id);
      toast({ title: "Preference deleted" });
      loadData();
    } catch {
      toast({ title: "Failed to delete preference" });
    }
  };

  const handleEdit = async (id, data) => {
    try {
      await updatePreference(id, data);
      toast({ title: "Preference updated" });
      loadData();
    } catch {
      toast({ title: "Failed to update preference" });
    }
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Teacher Preferences</h1>
        <AddPreferenceDialog
          onAdd={handleAdd}
          teachers={teachers}
          days={days}
          slots={slots}
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <PreferencesTable
          preferences={preferences}
          onDelete={handleDelete}
          onEdit={handleEdit}
          teachers={teachers}
          days={days}
          slots={slots}
        />
      )}
    </AppLayout>
  );
}

export default Preferences;
