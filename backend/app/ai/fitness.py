def calculate_fitness(schedule, preferences):
    score = 0

    # Reward preference satisfaction
    for pref in preferences:
        # Example logic
        score += pref.priority

    return score
