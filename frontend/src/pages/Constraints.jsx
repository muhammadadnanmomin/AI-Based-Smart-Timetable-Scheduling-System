import { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import ConstraintsTable from "@/components/constraints/ConstraintsTable";
import AddConstraintDialog from "@/components/constraints/AddConstraintDialog";
import {
  getConstraints,
  createConstraint,
  deleteConstraint,
  updateConstraint,
} from "@/services/constraints";
import { useToast } from "@/components/ui/use-toast";

function Constraints() {
  const [constraints, setConstraints] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadConstraints = async () => {
    try {
      setLoading(true);
      const data = await getConstraints();
      setConstraints(data);
    } catch {
      toast({ title: "Error loading constraints" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConstraints();
  }, []);

  const handleAdd = async (data) => {
    try {
      await createConstraint(data);
      toast({ title: "Constraint added" });
      loadConstraints();
    } catch {
      toast({ title: "Failed to add constraint" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteConstraint(id);
      toast({ title: "Constraint deleted" });
      loadConstraints();
    } catch {
      toast({ title: "Failed to delete constraint" });
    }
  };

  const handleEdit = async (id, data) => {
    try {
      await updateConstraint(id, data);
      toast({ title: "Constraint updated" });
      loadConstraints();
    } catch {
      toast({ title: "Failed to update constraint" });
    }
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Constraints</h1>
        <AddConstraintDialog onAdd={handleAdd} />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ConstraintsTable
          constraints={constraints}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </AppLayout>
  );
}

export default Constraints;
