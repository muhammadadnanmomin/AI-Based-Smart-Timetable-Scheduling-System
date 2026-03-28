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

function AddDayDialog({ onAdd }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onAdd({ name });
    setName("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Day</Button>
      </DialogTrigger>

      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add Day</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              className="bg-white text-black"
              placeholder="Monday"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

export default AddDayDialog;
