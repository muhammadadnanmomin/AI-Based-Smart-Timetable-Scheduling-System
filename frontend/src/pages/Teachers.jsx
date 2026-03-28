import { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import TeachersTable from "@/components/teachers/TeachersTable";
import AddTeacherDialog from "@/components/teachers/AddTeacherDialog";
import {
  getTeachers,
  createTeacher,
  deleteTeacher,
  updateTeacher,
} from "@/services/teachers";
import { useToast } from "@/components/ui/use-toast";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadTeachers = async () => {
    try {
      setLoading(true);
      const data = await getTeachers();
      setTeachers(data);
    } catch {
      toast({ title: "Error loading teachers" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const handleAdd = async (teacher) => {
    try {
      await createTeacher(teacher);
      toast({ title: "Teacher added" });
      loadTeachers();
    } catch {
      toast({ title: "Failed to add teacher" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTeacher(id);
      toast({ title: "Teacher deleted" });
      loadTeachers();
    } catch {
      toast({ title: "Failed to delete teacher" });
    }
  };

  const handleEdit = async (id, data) => {
    try {
      await updateTeacher(id, data);
      toast({ title: "Teacher updated" });
      loadTeachers();
    } catch {
      toast({ title: "Failed to update teacher" });
    }
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Teachers</h1>
        <AddTeacherDialog onAdd={handleAdd} />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <TeachersTable
          teachers={teachers}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </AppLayout>
  );
}

export default Teachers;
