import { Workouts } from "src/mockData/interface";

export const workoutsData: Record<string, Workouts> = {
  "workout-1": {
    id: "workout-1",
    name: "Chest Day - with Arm exercises",
    exercises: ["exercise-1", "exercise-2"],
  },
  "workout-2": {
    id: "workout-2",
    name: "Leg Day",
    exercises: ["exercise-3", "exercise-4"],
  },
  "workout-3": {
    id: "workout-3",
    name: "Back Day",
    exercises: ["exercise-5", "exercise-6"],
  },
  "workout-4": {
    id: "workout-4",
    name: "Shoulder Day",
    exercises: ["exercise-7", "exercise-8"],
  },
  "workout-5": {
    id: "workout-5",
    name: "Bicep Day",
    exercises: ["exercise-9", "exercise-10"],
  },
  "workout-6": {
    id: "workout-6",
    name: "Tricep Day",
    exercises: ["exercise-11", "exercise-12"],
  },
};
