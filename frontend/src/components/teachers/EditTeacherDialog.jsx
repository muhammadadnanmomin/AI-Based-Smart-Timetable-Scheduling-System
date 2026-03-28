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

function EditTeacherDialog({ teacher, onEdit }) {
  const [form, setForm] = useState({
    name: teacher.name || "",
    department: teacher.department || "",
    max_lectures_per_day: teacher.max_lectures_per_day || 4,
  });

  const handleSubmit = () => {
    if (!form.name.trim()) return;

    onEdit(teacher.id, {
      ...form,
      max_lectures_per_day: Number(form.max_lectures_per_day),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Edit Teacher</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              className="bg-white text-black"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Department</Label>
            <Input
              className="bg-white text-black"
              value={form.department}
              onChange={(e) =>
                setForm({ ...form, department: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Max Lectures / Day</Label>
            <Input
              type="number"
              className="bg-white text-black"
              value={form.max_lectures_per_day}
              onChange={(e) =>
                setForm({
                  ...form,
                  max_lectures_per_day: e.target.value,
                })
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

export default EditTeacherDialog;
