def is_valid_assignment(entry, schedule):
    for e in schedule:
        # Same day & slot
        if e["day_id"] == entry["day_id"] and e["slot_id"] == entry["slot_id"]:
            # Teacher clash
            if e["teacher_id"] == entry["teacher_id"]:
                return False

            # Room clash
            if e["room_id"] == entry["room_id"]:
                return False

            # Class clash
            if e["class_id"] == entry["class_id"]:
                return False

    return True


def detect_conflicts(schedule):
    conflicts = []

    for i in range(len(schedule)):
        for j in range(i + 1, len(schedule)):
            a = schedule[i]
            b = schedule[j]

            if a["day_id"] == b["day_id"] and a["slot_id"] == b["slot_id"]:
                if a["teacher_id"] == b["teacher_id"]:
                    conflicts.append([a, b, "Teacher conflict"])

                if a["room_id"] == b["room_id"]:
                    conflicts.append([a, b, "Room conflict"])

                if a["class_id"] == b["class_id"]:
                    conflicts.append([a, b, "Class conflict"])

    return conflicts
