import { Button } from "@/components/ui/button";
import EditTeacherDialog from "./EditTeacherDialog";

function TeachersTable({ teachers, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-slate-200 bg-slate-50/50 text-slate-500">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Department</th>
            <th className="p-2">Max / Day</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((t) => (
            <tr key={t.id} className="border-b border-slate-200 hover:bg-slate-50/80 transition-colors">
              <td className="p-2">{t.id}</td>
              <td className="p-2 font-medium">{t.name}</td>
              <td className="p-2">{t.department || "-"}</td>
              <td className="p-2">{t.max_lectures_per_day}</td>
              <td className="p-2 flex gap-2">
                <EditTeacherDialog teacher={t} onEdit={onEdit} />
                <Button
                  variant="outline" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                  onClick={() => onDelete(t.id)}
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

export default TeachersTable;
