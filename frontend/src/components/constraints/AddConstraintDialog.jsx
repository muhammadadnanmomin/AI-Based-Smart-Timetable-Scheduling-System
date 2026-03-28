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

function AddConstraintDialog({ onAdd }) {
  const [form, setForm] = useState({
    type: "",
    value: "",
    description: "",
  });

  const handleSubmit = () => {
    if (!form.type.trim() || !form.value.trim()) return;

    onAdd({
      type: form.type,
      value: form.value,
      description: form.description || null,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Constraint</Button>
      </DialogTrigger>

      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add Constraint</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Type</Label>
            <Input
              className="bg-white text-black"
              placeholder="NO_OVERLAP"
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
              placeholder="teacher"
              value={form.value}
              onChange={(e) =>
                setForm({ ...form, value: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Description (optional)</Label>
            <Input
              className="bg-white text-black"
              placeholder="No teacher can have overlapping slots"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
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

export default AddConstraintDialog;
