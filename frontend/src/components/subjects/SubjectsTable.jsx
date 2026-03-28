import { Button } from "@/components/ui/button";
import EditSubjectDialog from "./EditSubjectDialog";

function SubjectsTable({ subjects, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-slate-200 bg-slate-50/50 text-slate-500">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Code</th>
            <th className="p-2">Weekly Lectures</th>
            <th className="p-2">Lab</th>
            <th className="p-2">Lab Duration</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((s) => (
            <tr key={s.id} className="border-b border-slate-200 hover:bg-slate-50/80 transition-colors">
              <td className="p-2">{s.id}</td>
              <td className="p-2 font-medium">{s.name}</td>
              <td className="p-2">{s.code || "-"}</td>
              <td className="p-2">{s.weekly_lectures}</td>
              <td className="p-2">
                {s.is_lab ? "Yes" : "No"}
              </td>
              <td className="p-2">
                {s.is_lab ? `${s.lab_duration} hr` : "-"}
              </td>
              <td className="p-2 flex gap-2">
                <EditSubjectDialog subject={s} onEdit={onEdit} />
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

export default SubjectsTable;
