import { Button } from "@/components/ui/button";
import EditClassDialog from "./EditClassDialog";

function ClassesTable({ classes, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-slate-200 bg-slate-50/50 text-slate-500">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Department</th>
            <th className="p-2">Semester</th>
            <th className="p-2">Students</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {classes.map((c) => (
            <tr key={c.id} className="border-b border-slate-200 hover:bg-slate-50/80 transition-colors">
              <td className="p-2">{c.id}</td>
              <td className="p-2 font-medium">{c.name}</td>
              <td className="p-2">{c.department || "-"}</td>
              <td className="p-2">{c.semester || "-"}</td>
              <td className="p-2">{c.total_students || "-"}</td>
              <td className="p-2 flex gap-2">
                <EditClassDialog classItem={c} onEdit={onEdit} />
                <Button
                  variant="outline" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                  onClick={() => onDelete(c.id)}
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

export default ClassesTable;
