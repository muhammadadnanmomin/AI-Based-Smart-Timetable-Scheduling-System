import random

def mutate(timetable, data, mutation_rate=0.1):
    for i in range(len(timetable)):
        if random.random() < mutation_rate:
            timetable[i]["day_id"] = random.choice(data["days"]).id
            timetable[i]["slot_id"] = random.choice(data["time_slots"]).id
            timetable[i]["room_id"] = random.choice(data["rooms"]).id
    return timetable
