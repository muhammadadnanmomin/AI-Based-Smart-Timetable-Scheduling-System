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

function EditConstraintDialog({ constraint, onEdit }) {
  const [form, setForm] = useState({
    type: constraint.type,
    value: constraint.value,
    description: constraint.description || "",
  });

  const handleSubmit = () => {
    if (!form.type.trim() || !form.value.trim()) return;

    onEdit(constraint.id, {
      type: form.type,
      value: form.value,
      description: form.description || null,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Edit Constraint</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Type</Label>
            <Input
              className="bg-white text-black"
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Value</Label>
            <Input
              className="bg-white text-black"
              value={form.value}
              onChange={(e) =>
                setForm({ ...form, value: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Description</Label>
            <Input
              className="bg-white text-black"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
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

export default EditConstraintDialog;
