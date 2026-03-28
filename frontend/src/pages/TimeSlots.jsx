import { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import TimeSlotsTable from "@/components/timeslots/TimeSlotsTable";
import AddTimeSlotDialog from "@/components/timeslots/AddTimeSlotDialog";
import {
  getTimeSlots,
  createTimeSlot,
  deleteTimeSlot,
  updateTimeSlot,
} from "@/services/timeslots";
import { useToast } from "@/components/ui/use-toast";

function TimeSlots() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadSlots = async () => {
    try {
      setLoading(true);
      const data = await getTimeSlots();
      setSlots(data);
    } catch {
      toast({ title: "Error loading time slots" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSlots();
  }, []);

  const handleAdd = async (slot) => {
    try {
      await createTimeSlot(slot);
      toast({ title: "Time slot added" });
      loadSlots();
    } catch {
      toast({ title: "Failed to add time slot" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTimeSlot(id);
      toast({ title: "Time slot deleted" });
      loadSlots();
    } catch {
      toast({ title: "Failed to delete time slot" });
    }
  };

  const handleEdit = async (id, data) => {
    try {
      await updateTimeSlot(id, data);
      toast({ title: "Time slot updated" });
      loadSlots();
    } catch {
      toast({ title: "Failed to update time slot" });
    }
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Time Slots</h1>
        <AddTimeSlotDialog onAdd={handleAdd} />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <TimeSlotsTable
          slots={slots}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </AppLayout>
  );
}

export default TimeSlots;
