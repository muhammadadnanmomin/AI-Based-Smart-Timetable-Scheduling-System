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

function EditClassDialog({ classItem, onEdit }) {
  const [form, setForm] = useState({
    name: classItem.name || "",
    department: classItem.department || "",
    semester: classItem.semester || "",
    total_students: classItem.total_students || "",
  });

  const handleSubmit = () => {
    if (!form.name.trim()) return;

    onEdit(classItem.id, {
      name: form.name,
      department: form.department || null,
      semester: form.semester ? Number(form.semester) : null,
      total_students: form.total_students
        ? Number(form.total_students)
        : null,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
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
            <Label>Semester</Label>
            <Input
              type="number"
              className="bg-white text-black"
              value={form.semester}
              onChange={(e) =>
                setForm({ ...form, semester: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Total Students</Label>
            <Input
              type="number"
              className="bg-white text-black"
              value={form.total_students}
              onChange={(e) =>
                setForm({ ...form, total_students: e.target.value })
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

export default EditClassDialog;
