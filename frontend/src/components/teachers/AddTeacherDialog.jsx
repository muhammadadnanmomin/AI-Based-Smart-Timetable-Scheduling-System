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

function AddTeacherDialog({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    department: "",
    max_lectures_per_day: 4,
    user_id: null,
  });

  const handleSubmit = () => {
    if (!form.name.trim()) return;

    onAdd({
      ...form,
      max_lectures_per_day: Number(form.max_lectures_per_day),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Teacher</Button>
      </DialogTrigger>

      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add Teacher</DialogTitle>
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
            <Label>Department (optional)</Label>
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
            <Button onClick={handleSubmit}>Save</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddTeacherDialog;
