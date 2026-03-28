import { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import SubjectsTable from "@/components/subjects/SubjectsTable";
import AddSubjectDialog from "@/components/subjects/AddSubjectDialog";
import {
  getSubjects,
  createSubject,
  deleteSubject,
  updateSubject,
} from "@/services/subjects";
import { useToast } from "@/components/ui/use-toast";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadSubjects = async () => {
    try {
      setLoading(true);
      const data = await getSubjects();
      setSubjects(data);
    } catch {
      toast({ title: "Error loading subjects" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const handleAdd = async (subject) => {
    try {
      await createSubject(subject);
      toast({ title: "Subject added" });
      loadSubjects();
    } catch {
      toast({ title: "Failed to add subject" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubject(id);
      toast({ title: "Subject deleted" });
      loadSubjects();
    } catch {
      toast({ title: "Failed to delete subject" });
    }
  };

  const handleEdit = async (id, data) => {
    try {
      await updateSubject(id, data);
      toast({ title: "Subject updated" });
      loadSubjects();
    } catch {
      toast({ title: "Failed to update subject" });
    }
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Subjects</h1>
        <AddSubjectDialog onAdd={handleAdd} />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <SubjectsTable
          subjects={subjects}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </AppLayout>
  );
}

export default Subjects;
