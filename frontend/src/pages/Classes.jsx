import { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import ClassesTable from "@/components/classes/ClassesTable";
import AddClassDialog from "@/components/classes/AddClassDialog";
import {
  getClasses,
  createClass,
  deleteClass,
  updateClass,
} from "@/services/classes";
import { useToast } from "@/components/ui/use-toast";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadClasses = async () => {
    try {
      setLoading(true);
      const data = await getClasses();
      setClasses(data);
    } catch {
      toast({ title: "Error loading classes" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClasses();
  }, []);

  const handleAdd = async (classItem) => {
    try {
      await createClass(classItem);
      toast({ title: "Class added" });
      loadClasses();
    } catch {
      toast({ title: "Failed to add class" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteClass(id);
      toast({ title: "Class deleted" });
      loadClasses();
    } catch {
      toast({ title: "Failed to delete class" });
    }
  };

  const handleEdit = async (id, data) => {
    try {
      await updateClass(id, data);
      toast({ title: "Class updated" });
      loadClasses();
    } catch {
      toast({ title: "Failed to update class" });
    }
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Classes</h1>
        <AddClassDialog onAdd={handleAdd} />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ClassesTable
          classes={classes}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </AppLayout>
  );
}

export default Classes;
