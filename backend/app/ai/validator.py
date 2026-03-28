from app.ai_engine.rules import no_teacher_clash, no_room_clash, no_class_clash

def is_valid_timetable(timetable):
    return (
        no_teacher_clash(timetable)
        and no_room_clash(timetable)
        and no_class_clash(timetable)
    )
