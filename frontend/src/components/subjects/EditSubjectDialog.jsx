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

function EditSubjectDialog({ subject, onEdit }) {
  const [form, setForm] = useState({
    name: subject.name || "",
    code: subject.code || "",
    weekly_lectures: subject.weekly_lectures || 1,
    is_lab: subject.is_lab || false,
    lab_duration: subject.lab_duration || 1,
  });

  const handleSubmit = () => {
    if (!form.name.trim()) return;

    onEdit(subject.id, {
      ...form,
      weekly_lectures: Number(form.weekly_lectures),
      lab_duration: Number(form.lab_duration),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Edit Subject</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              className="bg-white text-black"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <Label>Code (optional)</Label>
            <Input
              className="bg-white text-black"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
            />
          </div>

          <div>
            <Label>Weekly Lectures</Label>
            <Input
              type="number"
              className="bg-white text-black"
              value={form.weekly_lectures}
              onChange={(e) =>
                setForm({ ...form, weekly_lectures: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Lab Subject?</Label>
            <select
              className="w-full border rounded px-2 py-1 bg-white text-black"
              value={form.is_lab}
              onChange={(e) =>
                setForm({ ...form, is_lab: e.target.value === "true" })
              }
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {form.is_lab && (
            <div>
              <Label>Lab Duration (hours)</Label>
              <Input
                type="number"
                className="bg-white text-black"
                value={form.lab_duration}
                onChange={(e) =>
                  setForm({ ...form, lab_duration: e.target.value })
                }
              />
            </div>
          )}

          <DialogClose asChild>
            <Button onClick={handleSubmit}>Save Changes</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditSubjectDialog;
