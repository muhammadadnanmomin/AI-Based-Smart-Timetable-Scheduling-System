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

function AddRoomDialog({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    capacity: "",
    type: "lecture",
    building: "",
  });

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    if (!form.type.trim()) return;

    onAdd({
      name: form.name,
      capacity: form.capacity ? Number(form.capacity) : null,
      type: form.type,
      building: form.building || null,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Room</Button>
      </DialogTrigger>

      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add Room</DialogTitle>
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
            <Label>Capacity</Label>
            <Input
              type="number"
              className="bg-white text-black"
              value={form.capacity}
              onChange={(e) =>
                setForm({ ...form, capacity: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Type</Label>
            <select
              className="w-full border rounded px-2 py-1 bg-white text-black"
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >
              <option value="lecture">Lecture</option>
              <option value="lab">Lab</option>
            </select>
          </div>

          <div>
            <Label>Building</Label>
            <Input
              className="bg-white text-black"
              value={form.building}
              onChange={(e) =>
                setForm({ ...form, building: e.target.value })
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

export default AddRoomDialog;
