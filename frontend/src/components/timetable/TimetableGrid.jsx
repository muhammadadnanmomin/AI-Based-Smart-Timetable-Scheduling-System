import { useEffect, useState } from "react";
import { getDays } from "@/services/days";
import { getTimeSlots } from "@/services/timeslots";
import { getSubjects } from "@/services/subjects";
import { getTeachers } from "@/services/teachers";
import { getRooms } from "@/services/rooms";
import { getClasses } from "@/services/classes";
import { DndContext } from "@dnd-kit/core";
import DraggableCell from "./DraggableCell";
import DroppableCell from "./DroppableCell";
import { saveTimetable } from "@/services/timetable";
import html2pdf from "html2pdf.js";

function TimetableGrid({ timetable = [], conflicts = [] }) {
  const [days, setDays] = useState([]);
  const [slots, setSlots] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [classes, setClasses] = useState([]);

  const [filters, setFilters] = useState({
    class: "",
    teacher: "",
    subject: "",
    room: "",
  });

  const [localTimetable, setLocalTimetable] = useState(timetable);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  useEffect(() => {
    setLocalTimetable(timetable);
  }, [timetable]);

  useEffect(() => {
    Promise.all([
      getDays(),
      getTimeSlots(),
      getSubjects(),
      getTeachers(),
      getRooms(),
      getClasses(),
    ]).then(([d, s, sub, t, r, c]) => {
      setDays(d);
      setSlots(s);
      setSubjects(sub);
      setTeachers(t);
      setRooms(r);
      setClasses(c);
    });
  }, []);

  const resolve = (id, arr) => arr.find((x) => x.id === id)?.name || "—";

  const filteredTimetable = localTimetable.filter((e) => {
    if (filters.class && e.class_id !== Number(filters.class)) return false;
    if (filters.teacher && e.teacher_id !== Number(filters.teacher)) return false;
    if (filters.subject && e.subject_id !== Number(filters.subject)) return false;
    if (filters.room && e.room_id !== Number(filters.room)) return false;
    return true;
  });

  const timetableMap = {};
  filteredTimetable.forEach((e) => {
    if (!timetableMap[e.day_id]) timetableMap[e.day_id] = {};
    timetableMap[e.day_id][e.slot_id] = e;
  });

  const getCell = (dayId, slotId) => timetableMap[dayId]?.[slotId];

  const getConflictForCell = (cell) => {
    if (!cell) return null;

    return conflicts.find(
      ([a, b]) =>
        (a.day_id === cell.day_id && a.slot_id === cell.slot_id) ||
        (b.day_id === cell.day_id && b.slot_id === cell.slot_id)
    );
  };

  const isValidMove = (movedEntry, newDay, newSlot) => {
    return !localTimetable.some((e) => {
      if (e === movedEntry) return false;

      if (e.day_id === newDay && e.slot_id === newSlot) {
        if (e.teacher_id === movedEntry.teacher_id) return false;
        if (e.room_id === movedEntry.room_id) return false;
        if (e.class_id === movedEntry.class_id) return false;
      }
      return true;
    });
  };

  const commitChange = (newState) => {
    setUndoStack((prev) => [...prev, localTimetable]);
    setRedoStack([]);
    setLocalTimetable(newState);
    saveTimetable(newState);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const [fromDay, fromSlot] = active.id.split("_").map(Number);
    const [toDay, toSlot] = over.id.split("_").map(Number);

    const movedEntry = localTimetable.find(
      (e) => e.day_id === fromDay && e.slot_id === fromSlot
    );

    if (!movedEntry) return;

    const valid = isValidMove(movedEntry, toDay, toSlot);
    if (!valid) {
      alert("❌ Conflict detected!");
      return;
    }

    const updated = localTimetable.map((entry) => {
      if (entry.day_id === fromDay && entry.slot_id === fromSlot) {
        return { ...entry, day_id: toDay, slot_id: toSlot };
      }
      return entry;
    });

    commitChange(updated);
  };

  const undo = () => {
    if (!undoStack.length) return;
    const prev = undoStack[undoStack.length - 1];
    setRedoStack((r) => [localTimetable, ...r]);
    setUndoStack((u) => u.slice(0, -1));
    setLocalTimetable(prev);
    saveTimetable(prev);
  };

  const redo = () => {
    if (!redoStack.length) return;
    const next = redoStack[0];
    setUndoStack((u) => [...u, localTimetable]);
    setRedoStack((r) => r.slice(1));
    setLocalTimetable(next);
    saveTimetable(next);
  };

  // EXPORTS
  const exportCSV = () => {
    const headers = ["Day", "Time Slot", "Class", "Subject", "Teacher", "Room"];

    const rows = localTimetable.map((e) => [
      e.day || resolve(e.day_id, days),
      `${e.start_time || slots.find((s) => s.id === e.slot_id)?.start_time} - ${
        e.end_time || slots.find((s) => s.id === e.slot_id)?.end_time
      }`,
      e.class_name || resolve(e.class_id, classes),
      e.subject || resolve(e.subject_id, subjects),
      e.teacher || resolve(e.teacher_id, teachers),
      e.room || resolve(e.room_id, rooms),
    ]);

    let csv = headers.join(",") + "\n";
    rows.forEach((row) => (csv += row.join(",") + "\n"));

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "timetable.csv";
    a.click();
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(localTimetable, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "timetable.json";
    a.click();
  };

  const exportPDF = () => {
    const element = document.getElementById("timetable-grid");

    html2pdf()
      .set({
        margin: 0.5,
        filename: "timetable.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
      })
      .from(element)
      .save();
  };

  return (
    <div className="space-y-6">
      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        <button onClick={undo} className="px-3 py-1.5 text-sm font-medium border border-slate-200 bg-white hover:bg-slate-50 rounded-md transition-colors">Undo</button>
        <button onClick={redo} className="px-3 py-1.5 text-sm font-medium border border-slate-200 bg-white hover:bg-slate-50 rounded-md transition-colors">Redo</button>
        <button onClick={exportCSV} className="px-3 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">Export CSV</button>
        <button onClick={exportPDF} className="px-3 py-1.5 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors">Export PDF</button>
        <button onClick={exportJSON} className="px-3 py-1.5 text-sm font-medium border border-slate-200 bg-white hover:bg-slate-50 rounded-md transition-colors">Export JSON</button>
      </div>

      {/* Filters BELOW buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg border border-slate-200">
        <select className="border border-slate-200 p-2 rounded-md bg-white text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600" onChange={(e) => setFilters({ ...filters, class: e.target.value })}>
          <option value="">All Classes</option>
          {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select className="border border-slate-200 p-2 rounded-md bg-white text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600" onChange={(e) => setFilters({ ...filters, teacher: e.target.value })}>
          <option value="">All Teachers</option>
          {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>

        <select className="border border-slate-200 p-2 rounded-md bg-white text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600" onChange={(e) => setFilters({ ...filters, subject: e.target.value })}>
          <option value="">All Subjects</option>
          {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>

        <select className="border border-slate-200 p-2 rounded-md bg-white text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600" onChange={(e) => setFilters({ ...filters, room: e.target.value })}>
          <option value="">All Rooms</option>
          {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
      </div>

      {/* Legend */}
      <div className="flex gap-6 text-sm items-center">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-50 border inline-block"></span> Normal
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-100 border border-red-400 inline-block"></span> Conflict
        </div>
      </div>

      {/* Grid */}
      <DndContext onDragEnd={handleDragEnd}>
        <div id="timetable-grid" className="overflow-x-auto bg-white rounded-lg border border-slate-200 p-4">
          <table className="w-full border-collapse border border-slate-200 text-sm">
            <thead>
              <tr>
                <th className="border border-slate-200 p-3 bg-slate-50 text-slate-600 font-medium">Time ↓ / Day →</th>
                {days.map((d) => (
                  <th key={d.id} className="border border-slate-200 p-3 bg-slate-50 text-slate-600 font-medium">{d.name}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {slots.map((slot) => (
                <tr key={slot.id}>
                  <td className="border border-slate-200 p-3 font-medium bg-slate-50 text-slate-700 whitespace-nowrap">
                    {slot.start_time} - {slot.end_time}
                  </td>

                  {days.map((day) => {
                    const cell = getCell(day.id, slot.id);
                    const conflict = getConflictForCell(cell);

                    return (
                      <td
                        key={day.id}
                        title={conflict ? conflict[2] : ""}
                        className={`border border-slate-200 p-2 text-sm align-top transition-colors ${
                          cell && conflict
                            ? "bg-red-50 border-red-300"
                            : cell
                            ? "bg-emerald-50/50"
                            : ""
                        }`}
                      >
                        <DroppableCell id={`${day.id}_${slot.id}`}>
                          {cell ? (
                            <DraggableCell id={`${cell.day_id}_${cell.slot_id}`}>
                              <div className="space-y-1">
                                {conflict && <div className="text-xs text-red-600 font-bold">⚠ Conflict</div>}
                                <div><b>Subject:</b> {cell.subject || resolve(cell.subject_id, subjects)}</div>
                                <div><b>Teacher:</b> {cell.teacher || resolve(cell.teacher_id, teachers)}</div>
                                <div><b>Room:</b> {cell.room || resolve(cell.room_id, rooms)}</div>
                                <div><b>Class:</b> {cell.class_name || resolve(cell.class_id, classes)}</div>
                              </div>
                            </DraggableCell>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </DroppableCell>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DndContext>
    </div>
  );
}

export default TimetableGrid;
