export type Exercises = {
  id: string;
  name: string;
  sets: {
    weight: number;
    reps: number;
  }[];
};

export type Days = {
  id: string;
  isCreateNewWorkout?: boolean;
  workouts: string[];
};

export type Workouts = {
  id: string;
  name: string;
  exercises: string[];
};
