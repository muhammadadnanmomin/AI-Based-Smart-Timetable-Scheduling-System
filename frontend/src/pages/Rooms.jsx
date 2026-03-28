import { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import RoomsTable from "@/components/rooms/RoomsTable";
import AddRoomDialog from "@/components/rooms/AddRoomDialog";
import {
  getRooms,
  createRoom,
  deleteRoom,
  updateRoom,
} from "@/services/rooms";
import { useToast } from "@/components/ui/use-toast";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadRooms = async () => {
    try {
      setLoading(true);
      const data = await getRooms();
      setRooms(data);
    } catch {
      toast({ title: "Error loading rooms" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleAdd = async (room) => {
    try {
      await createRoom(room);
      toast({ title: "Room added" });
      loadRooms();
    } catch {
      toast({ title: "Failed to add room" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRoom(id);
      toast({ title: "Room deleted" });
      loadRooms();
    } catch {
      toast({ title: "Failed to delete room" });
    }
  };

  const handleEdit = async (id, data) => {
    try {
      await updateRoom(id, data);
      toast({ title: "Room updated" });
      loadRooms();
    } catch {
      toast({ title: "Failed to update room" });
    }
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Rooms</h1>
        <AddRoomDialog onAdd={handleAdd} />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <RoomsTable
          rooms={rooms}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </AppLayout>
  );
}

export default Rooms;
