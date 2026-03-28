import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

function AddTimeSlotDialog({ onAdd }) {
  const [form, setForm] = useState({
    start_time: "",
    end_time: "",
    slot_order: "",
  });

  const handleSubmit = () => {
    if (!form.start_time || !form.end_time || !form.slot_order) return;

    onAdd({
      start_time: form.start_time,
      end_time: form.end_time,
      slot_order: Number(form.slot_order),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Time Slot</Button>
      </DialogTrigger>

      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add Time Slot</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Start Time</Label>
            <Input
              type="time"
              className="bg-white text-black"
              value={form.start_time}
              onChange={(e) =>
                setForm({ ...form, start_time: e.target.value })
              }
            />
          </div>

          <div>
            <Label>End Time</Label>
            <Input
              type="time"
              className="bg-white text-black"
              value={form.end_time}
              onChange={(e) =>
                setForm({ ...form, end_time: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Slot Order</Label>
            <Input
              type="number"
              className="bg-white text-black"
              value={form.slot_order}
              onChange={(e) =>
                setForm({ ...form, slot_order: e.target.value })
              }
            />
          </div>

          <DialogClose asChild>
            <Button onClick={handleSubmit}>Save</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddTimeSlotDialog;
