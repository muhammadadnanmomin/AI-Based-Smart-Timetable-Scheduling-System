import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

function EditPreferenceDialog({ pref, onEdit, days, slots }) {
  const [form, setForm] = useState({
    preferred_day_id: pref.preferred_day_id || "",
    preferred_slot_id: pref.preferred_slot_id || "",
    priority: pref.priority,
  });

  const handleSubmit = () => {
    onEdit(pref.id, {
      preferred_day_id: form.preferred_day_id
        ? Number(form.preferred_day_id)
        : null,
      preferred_slot_id: form.preferred_slot_id
        ? Number(form.preferred_slot_id)
        : null,
      priority: Number(form.priority),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Edit Preference</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Preferred Day</Label>
            <select
              className="w-full border rounded px-2 py-1"
              value={form.preferred_day_id}
              onChange={(e) =>
                setForm({ ...form, preferred_day_id: e.target.value })
              }
            >
              <option value="">None</option>
              {days.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Preferred Slot</Label>
            <select
              className="w-full border rounded px-2 py-1"
              value={form.preferred_slot_id}
              onChange={(e) =>
                setForm({ ...form, preferred_slot_id: e.target.value })
              }
            >
              <option value="">None</option>
              {slots.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.start_time} - {s.end_time}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Priority</Label>
            <input
              type="number"
              className="w-full border rounded px-2 py-1"
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
            />
          </div>

          <DialogClose asChild>
            <Button onClick={handleSubmit}>Save Changes</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditPreferenceDialog;
