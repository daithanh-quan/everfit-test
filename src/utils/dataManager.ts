import { Workouts, Exercises, Days } from "src/interface/mockData";
import { generateId } from "./generateId";
import { weekDays } from "src/utils/time";

export class WorkoutManager {
  static createWorkout(name: string): Workouts {
    return {
      id: generateId.generate("WORKOUT"),
      name,
      exercises: [],
    };
  }

  static createExercise(
    name: string,
    sets: { weight: number; reps: number }[]
  ): Exercises {
    return {
      id: generateId.generate("EXERCISE"),
      name,
      sets,
    };
  }

  static createDay(id: string, isCreateNewWorkout: boolean = false): Days {
    return {
      id,
      isCreateNewWorkout,
      workouts: [],
    };
  }

  static addWorkoutToDay(
    days: Record<string, Days>,
    workouts: Record<string, Workouts>,
    dayId: string,
    workoutName: string
  ): {
    days: Record<string, Days>;
    workouts: Record<string, Workouts>;
  } {
    const newWorkout = this.createWorkout(workoutName);
    const updatedDays = { ...days };
    const updatedWorkouts = { ...workouts };

    if (!updatedDays[dayId]) {
      updatedDays[dayId] = this.createDay(dayId);
    }

    updatedDays[dayId].workouts.push(newWorkout.id);
    updatedWorkouts[newWorkout.id] = newWorkout;

    return {
      days: updatedDays,
      workouts: updatedWorkouts,
    };
  }

  static addExerciseToWorkout(
    workouts: Record<string, Workouts>,
    exercises: Record<string, Exercises>,
    workoutId: string,
    exerciseName: string,
    sets: { weight: number; reps: number }[]
  ): {
    workouts: Record<string, Workouts>;
    exercises: Record<string, Exercises>;
  } {
    const newExercise = this.createExercise(exerciseName, sets);
    const updatedWorkouts = { ...workouts };
    const updatedExercises = { ...exercises };

    if (updatedWorkouts[workoutId]) {
      updatedWorkouts[workoutId].exercises.push(newExercise.id);
      updatedExercises[newExercise.id] = newExercise;
    }

    return {
      workouts: updatedWorkouts,
      exercises: updatedExercises,
    };
  }
}

// Tạo dữ liệu mẫu
export const createInitialData = () => {
  const days: Record<string, Days> = {};
  const workouts: Record<string, Workouts> = {};
  const exercises: Record<string, Exercises> = {};

  weekDays.forEach((day) => {
    days[day] = WorkoutManager.createDay(day, day === "monday");
  });

  const { days: updatedDays, workouts: updatedWorkouts } =
    WorkoutManager.addWorkoutToDay(days, workouts, "monday", "Upper Body");

  const firstWorkoutId = Object.keys(updatedWorkouts)[0];
  const { workouts: finalWorkouts, exercises: updatedExercises } =
    WorkoutManager.addExerciseToWorkout(
      updatedWorkouts,
      exercises,
      firstWorkoutId,
      "Bench Press",
      [
        { weight: 135, reps: 10 },
        { weight: 155, reps: 8 },
      ]
    );

  return {
    days: updatedDays,
    workouts: finalWorkouts,
    exercises: updatedExercises,
  };
};
