import { Days } from "src/mockData/interface";

export const daysData: Record<string, Days> = {
  tuesday: {
    id: "tuesday",
    isCreateNewWorkout: true,
    workouts: ["workout-1"],
  },
  wednesday: {
    id: "wednesday",
    isCreateNewWorkout: false,
    workouts: ["workout-2", "workout-3", "workout-4", "workout-1"],
  },
  thursday: {
    id: "thursday",
    isCreateNewWorkout: true,
    workouts: [],
  },
  friday: {
    id: "friday",
    isCreateNewWorkout: false,
    workouts: [],
  },
  saturday: {
    id: "saturday",
    isCreateNewWorkout: false,
    workouts: [],
  },
  sunday: {
    id: "sunday",
    isCreateNewWorkout: false,
    workouts: [],
  },
};
