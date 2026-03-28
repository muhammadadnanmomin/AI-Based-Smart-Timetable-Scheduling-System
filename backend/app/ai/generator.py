from app.ai.data_loader import load_all_data
from app.ai.rules import is_valid_assignment
from app.ai.rules import detect_conflicts

def generate_timetable():
    data = load_all_data()

    teachers = data["teachers"]
    subjects = data["subjects"]
    classes = data["classes"]
    rooms = data["rooms"]
    days = data["days"]
    slots = data["slots"]

    if not teachers or not subjects or not classes or not rooms or not days or not slots:
        return {
            "status": "failed",
            "message": "Missing required data"
        }

    schedule = []
    teacher_index = 0

    for cls in classes:
        for subj in subjects:
            lectures_to_assign = subj.weekly_lectures or 1

            for _ in range(lectures_to_assign):
                placed = False

                for day in days:
                    for slot in slots:
                        for room in rooms:
                            teacher = teachers[teacher_index % len(teachers)]
                            teacher_index += 1

                            entry = {
                                "teacher_id": teacher.id,
                                "subject_id": subj.id,
                                "class_id": cls.id,
                                "room_id": room.id,
                                "day_id": day.id,
                                "slot_id": slot.id,
                            }

                            if is_valid_assignment(entry, schedule):
                                schedule.append(entry)
                                placed = True
                                break
                        if placed: break
                    if placed: break

                if not placed:
                    return {
                        "status": "failed",
                        "message": f"Could not place {subj.name} for class {cls.name}"
                    }

    conflicts = detect_conflicts(schedule)

    return {
        "status": "success",
        "timetable": schedule,
        "conflicts": conflicts
    }

def auto_fix_conflicts(schedule, data):
    teachers = data["teachers"]
    rooms = data["rooms"]
    days = data["days"]
    slots = data["slots"]

    new_schedule = schedule.copy()

    for i in range(len(new_schedule)):
        entry = new_schedule[i]
        temp_schedule = new_schedule[:i] + new_schedule[i+1:]

        for day in days:
            for slot in slots:
                for room in rooms:
                    for teacher in teachers:
                        new_entry = {
                            **entry,
                            "day_id": day.id,
                            "slot_id": slot.id,
                            "room_id": room.id,
                            "teacher_id": teacher.id,
                        }

                        if is_valid_assignment(new_entry, temp_schedule):
                            new_schedule[i] = new_entry
                            break
                    else:
                        continue
                    break
                else:
                    continue
                break
            else:
                continue
            break

    return new_schedule
