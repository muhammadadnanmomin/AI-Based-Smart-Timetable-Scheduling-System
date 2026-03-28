import random

def create_random_schedule(data):
    return []

def crossover(parent1, parent2):
    return parent1

def mutate(schedule):
    return schedule

def run_genetic_algorithm(data, preferences, generations=50):
    population = [create_random_schedule(data) for _ in range(10)]

    for _ in range(generations):
        population = sorted(population, key=lambda s: 0, reverse=True)
        next_gen = population[:2]

        while len(next_gen) < len(population):
            p1, p2 = random.sample(population, 2)
            child = crossover(p1, p2)
            child = mutate(child)
            next_gen.append(child)

        population = next_gen

    return population[0]
