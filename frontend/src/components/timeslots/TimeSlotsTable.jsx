import { Button } from "@/components/ui/button";
import EditTimeSlotDialog from "./EditTimeSlotDialog";

function TimeSlotsTable({ slots, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-slate-200 bg-slate-50/50 text-slate-500">
            <th className="p-2">ID</th>
            <th className="p-2">Start</th>
            <th className="p-2">End</th>
            <th className="p-2">Order</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {slots.map((s) => (
            <tr key={s.id} className="border-b border-slate-200 hover:bg-slate-50/80 transition-colors">
              <td className="p-2">{s.id}</td>
              <td className="p-2">{s.start_time}</td>
              <td className="p-2">{s.end_time}</td>
              <td className="p-2">{s.slot_order}</td>
              <td className="p-2 flex gap-2">
                <EditTimeSlotDialog slot={s} onEdit={onEdit} />
                <Button
                  variant="outline" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                  onClick={() => onDelete(s.id)}
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

export default TimeSlotsTable;
