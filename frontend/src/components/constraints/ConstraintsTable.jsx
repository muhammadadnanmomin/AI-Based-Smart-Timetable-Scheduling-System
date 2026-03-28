import { Button } from "@/components/ui/button";
import EditConstraintDialog from "./EditConstraintDialog";

function ConstraintsTable({ constraints, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-slate-200 bg-slate-50/50 text-slate-500">
            <th className="p-2">Type</th>
            <th className="p-2">Value</th>
            <th className="p-2">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {constraints.map((c) => (
            <tr key={c.id} className="border-b border-slate-200 hover:bg-slate-50/80 transition-colors">
              <td className="p-2 font-medium">{c.type}</td>
              <td className="p-2">{c.value}</td>
              <td className="p-2">{c.description || "—"}</td>
              <td className="p-2 flex gap-2">
                <EditConstraintDialog
                  constraint={c}
                  onEdit={onEdit}
                />
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

export default ConstraintsTable;
