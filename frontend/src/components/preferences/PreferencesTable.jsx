import { Button } from "@/components/ui/button";
import EditPreferenceDialog from "./EditPreferenceDialog";

function PreferencesTable({
  preferences,
  onDelete,
  onEdit,
  teachers,
  days,
  slots,
}) {
  const getTeacherName = (id) =>
    teachers.find((t) => t.id === id)?.name || "—";

  const getDayName = (id) =>
    days.find((d) => d.id === id)?.name || "—";

  const getSlotLabel = (id) =>
    slots.find((s) => s.id === id)
      ? `${slots.find((s) => s.id === id).start_time} - ${
          slots.find((s) => s.id === id).end_time
        }`
      : "—";

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-slate-200 bg-slate-50/50 text-slate-500">
            <th className="p-2">Teacher</th>
            <th className="p-2">Day</th>
            <th className="p-2">Slot</th>
            <th className="p-2">Priority</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {preferences.map((p) => (
            <tr key={p.id} className="border-b border-slate-200 hover:bg-slate-50/80 transition-colors">
              <td className="p-2">{getTeacherName(p.teacher_id)}</td>
              <td className="p-2">
                {p.preferred_day_id
                  ? getDayName(p.preferred_day_id)
                  : "—"}
              </td>
              <td className="p-2">
                {p.preferred_slot_id
                  ? getSlotLabel(p.preferred_slot_id)
                  : "—"}
              </td>
              <td className="p-2">{p.priority}</td>
              <td className="p-2 flex gap-2">
                <EditPreferenceDialog
                  pref={p}
                  onEdit={onEdit}
                  days={days}
                  slots={slots}
                />
                <Button
                  variant="outline" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                  onClick={() => onDelete(p.id)}
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

export default PreferencesTable;
