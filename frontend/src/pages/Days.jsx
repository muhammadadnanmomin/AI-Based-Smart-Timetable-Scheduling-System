import { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import DaysTable from "@/components/days/DaysTable";
import AddDayDialog from "@/components/days/AddDayDialog";
import {
  getDays,
  createDay,
  deleteDay,
  updateDay,
} from "@/services/days";
import { useToast } from "@/components/ui/use-toast";

function Days() {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadDays = async () => {
    try {
      setLoading(true);
      const data = await getDays();
      setDays(data);
    } catch {
      toast({ title: "Error loading days" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDays();
  }, []);

  const handleAdd = async (day) => {
    try {
      await createDay(day);
      toast({ title: "Day added" });
      loadDays();
    } catch {
      toast({ title: "Failed to add day" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDay(id);
      toast({ title: "Day deleted" });
      loadDays();
    } catch {
      toast({ title: "Failed to delete day" });
    }
  };

  const handleEdit = async (id, data) => {
    try {
      await updateDay(id, data);
      toast({ title: "Day updated" });
      loadDays();
    } catch {
      toast({ title: "Failed to update day" });
    }
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Days</h1>
        <AddDayDialog onAdd={handleAdd} />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <DaysTable
          days={days}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </AppLayout>
  );
}

export default Days;
