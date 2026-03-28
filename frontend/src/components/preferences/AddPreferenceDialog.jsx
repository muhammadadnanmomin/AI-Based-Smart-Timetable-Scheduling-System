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

function AddPreferenceDialog({ onAdd, teachers, days, slots }) {
  const [form, setForm] = useState({
    teacher_id: "",
    preferred_day_id: "",
    preferred_slot_id: "",
    priority: 1,
  });

  const handleSubmit = () => {
    if (!form.teacher_id) return;

    onAdd({
      teacher_id: Number(form.teacher_id),
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
        <Button>Add Preference</Button>
      </DialogTrigger>

      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add Preference</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Teacher</Label>
            <select
              className="w-full border rounded px-2 py-1"
              value={form.teacher_id}
              onChange={(e) =>
                setForm({ ...form, teacher_id: e.target.value })
              }
            >
              <option value="">Select Teacher</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Preferred Day (Optional)</Label>
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
            <Label>Preferred Slot (Optional)</Label>
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
            <Label>Priority (1 = High)</Label>
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
            <Button onClick={handleSubmit}>Save</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddPreferenceDialog;
