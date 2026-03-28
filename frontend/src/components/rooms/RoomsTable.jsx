import { Button } from "@/components/ui/button";
import EditRoomDialog from "./EditRoomDialog";

function RoomsTable({ rooms, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-slate-200 bg-slate-50/50 text-slate-500">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Capacity</th>
            <th className="p-2">Type</th>
            <th className="p-2">Building</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((r) => (
            <tr key={r.id} className="border-b border-slate-200 hover:bg-slate-50/80 transition-colors">
              <td className="p-2">{r.id}</td>
              <td className="p-2 font-medium">{r.name}</td>
              <td className="p-2">{r.capacity ?? "-"}</td>
              <td className="p-2 capitalize">{r.type}</td>
              <td className="p-2">{r.building || "-"}</td>
              <td className="p-2 flex gap-2">
                <EditRoomDialog room={r} onEdit={onEdit} />
                <Button
                  variant="outline" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                  onClick={() => onDelete(r.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoomsTable;
