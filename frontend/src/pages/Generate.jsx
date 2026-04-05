import { useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

function Generate() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setResult(null);

      const res = await axios.post("http://localhost:5000/generate-timetable");
      setResult(res.data);

      if (res.data.status === "success") {
        toast({ title: "Timetable generated successfully!" });
      } else {
        toast({ title: "Generation failed", description: res.data.message || "Failed to generate timetable", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error connecting to server", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Generate Timetable</h1>

        <Button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate Timetable"}
        </Button>

        {result && (
          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Result</h2>
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default Generate;
