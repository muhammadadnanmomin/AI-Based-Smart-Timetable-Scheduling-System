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

function EditDayDialog({ day, onEdit }) {
  const [name, setName] = useState(day.name || "");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onEdit(day.id, { name });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Edit Day</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              className="bg-white text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

export default EditDayDialog;
