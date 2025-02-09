import React from "react";
import styles from "./home.module.css";
import { weekDays } from "src/utils/time";

const LoadingSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.skeletonGrid}>
        {weekDays.map((day) => (
          <div key={day} className={styles.skeletonColumn}>
            <div className={styles.skeletonDayHeader}>
              <div className={styles.skeletonDayName} />
            </div>
            <div className={styles.dayContainer}>
              {[1, 2].map((n) => (
                <div key={n} className={styles.skeletonWorkoutCard}>
                  <div className={styles.skeletonWorkoutTitle} />
                  {[1, 2, 3].map((e) => (
                    <div key={e} className={styles.skeletonExercise}>
                      <div className={styles.skeletonExerciseReps} />
                      <div className={styles.skeletonExerciseContent}>
                        <div className={styles.skeletonExerciseName} />
                        <div className={styles.skeletonExerciseDetails} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
