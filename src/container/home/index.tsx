"use client";

import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragUpdate,
} from "@hello-pangea/dnd";

import PlusIcon from "src/component/svg/PlusIcon";
import EllipsisHorizontal from "src/component/svg/EllipsisHorizontal";
import { weekDates, weekDays } from "src/utils/time";
import { exercisesData } from "src/mockData/exercises";
import { daysData } from "src/mockData/days";
import { workoutsData } from "src/mockData/workouts";
import LoadingSkeleton from "./Loading";

const initialData = {
  workouts: workoutsData,
  exercises: exercisesData,
  days: daysData,
};

const WorkoutCalendar = () => {
  const [calendarData, setCalendarData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [dragDestination, setDragDestination] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchFakeData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
      } finally {
        setLoading(false);
      }
    };

    fetchFakeData();
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type, draggableId } = result;
    setDragDestination(null);

    if (!destination) return;

    if (type === "workout") {
      // Handle workout dragging (existing code)
      const newData = { ...calendarData };
      const sourceDayWorkouts = [...newData.days[source.droppableId].workouts];
      const targetDayWorkouts = [
        ...(newData.days[destination.droppableId]?.workouts || []),
      ];

      if (source.droppableId === destination.droppableId) {
        const [movedWorkout] = sourceDayWorkouts.splice(source.index, 1);
        sourceDayWorkouts.splice(destination.index, 0, movedWorkout);
        newData.days[source.droppableId].workouts = sourceDayWorkouts;
      } else {
        const [movedWorkout] = sourceDayWorkouts.splice(source.index, 1);
        if (!newData.days[destination.droppableId]) {
          newData.days[destination.droppableId] = {
            id: destination.droppableId,
            workouts: [],
          };
        }
        targetDayWorkouts.splice(destination.index, 0, movedWorkout);
        newData.days[source.droppableId].workouts = sourceDayWorkouts;
        newData.days[destination.droppableId].workouts = targetDayWorkouts;
      }
      setCalendarData(newData);
    } else if (type === "exercise") {
      // Handle exercise dragging
      const newData = { ...calendarData };

      const [workoutId] = draggableId.split("-")[0].split("_");
      const workout = newData.workouts[workoutId];

      if (workout) {
        const exercises = [...workout.exercises];
        const [movedExercise] = exercises.splice(source.index, 1);
        exercises.splice(destination.index, 0, movedExercise);
        newData.workouts[workoutId] = {
          ...workout,
          exercises: exercises,
        };
        setCalendarData(newData);
      }
    }
  };

  const onDragStart = () => {
    setDragDestination(null);
  };

  const onDragUpdate = (update: DragUpdate) => {
    if (update.destination) {
      setDragDestination(update.destination.droppableId);
    } else {
      setDragDestination(null);
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          {weekDays.map((day, index) => {
            const date = weekDates[index];
            const isToday = date.toDateString() === new Date().toDateString();
            const dayKey = day.toLowerCase();
            const isDestination = dragDestination === dayKey;

            return (
              <Droppable
                key={day}
                droppableId={dayKey}
                type="workout"
                direction="vertical"
                isDropDisabled={false}
                ignoreContainerClipping={false}
                isCombineEnabled={false}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    {...provided.droppableProps}
                    className={styles.droppable}
                  >
                    <div className={styles.dayHeader}>
                      <div className={styles.dayName}>{day.slice(0, 3)}</div>
                    </div>

                    <div
                      className={`${
                        isDestination
                          ? styles.dragOverStyle
                          : styles.dayContainer
                      }`}
                    >
                      <div
                        className={`${
                          isToday ? styles.dayDateToday : styles.dayDate
                        } ${styles.dayDateHeader}`}
                      >
                        {String(date.getDate()).padStart(2, "0")}
                        {daysData[dayKey]?.isCreateNewWorkout && (
                          <PlusIcon className={styles.plusIcon} />
                        )}
                      </div>
                      {calendarData.days[dayKey]?.workouts.map(
                        (workoutId, index) => {
                          const workout = calendarData.workouts[workoutId];

                          if (!workout) return null;

                          return (
                            <Draggable
                              key={`${workoutId}-${index}`}
                              draggableId={`${workoutId}-${index}-${dayKey}`}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`${styles.workoutCard} ${styles.draggable}`}
                                >
                                  <div className={styles.workout}>
                                    <h3 className={styles.workoutTitle}>
                                      {workout.name}
                                    </h3>
                                    <EllipsisHorizontal
                                      className={styles.workoutIcon}
                                    />
                                  </div>
                                  <Droppable
                                    droppableId={`${workoutId}_exercises`}
                                    type="exercise"
                                  >
                                    {(providedExercises) => (
                                      <div
                                        ref={providedExercises.innerRef}
                                        {...providedExercises.droppableProps}
                                      >
                                        {workout.exercises.map(
                                          (exerciseId, exerciseIndex) => {
                                            const exercise =
                                              calendarData.exercises[
                                                exerciseId
                                              ];

                                            return (
                                              <Draggable
                                                key={`${workoutId}_${exerciseId}`}
                                                draggableId={`${workoutId}_${dayKey}_${exercise.id}_${exerciseIndex}`}
                                                index={exerciseIndex}
                                              >
                                                {(providedExercise) => (
                                                  <div
                                                    ref={
                                                      providedExercise.innerRef
                                                    }
                                                    {...providedExercise.draggableProps}
                                                    {...providedExercise.dragHandleProps}
                                                    className={
                                                      styles.exerciseCard
                                                    }
                                                  >
                                                    <div
                                                      className={
                                                        styles.exerciseReps
                                                      }
                                                    >
                                                      {exercise.sets.length}x
                                                    </div>
                                                    <div
                                                      className={
                                                        styles.exerciseInfo
                                                      }
                                                    >
                                                      <div
                                                        className={
                                                          styles.exerciseName
                                                        }
                                                      >
                                                        {exercise.name}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.exerciseDetails
                                                        }
                                                      >
                                                        {exercise.sets.map(
                                                          (set, idx) =>
                                                            `${
                                                              set.weight
                                                            } lb x ${set.reps}${
                                                              idx <
                                                              exercise.sets
                                                                .length -
                                                                1
                                                                ? ", "
                                                                : ""
                                                            }`
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                )}
                                              </Draggable>
                                            );
                                          }
                                        )}
                                        {providedExercises.placeholder}
                                      </div>
                                    )}
                                  </Droppable>
                                  <div className={styles.exercisePlusIcon}>
                                    <PlusIcon className={styles.plusIcon} />
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          );
                        }
                      )}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default WorkoutCalendar;
