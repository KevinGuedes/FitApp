import { QueryDocumentSnapshot, SnapshotOptions } from '@angular/fire/firestore';
import { Exercise } from './exercise.interface';

const availableExercisesConverter = {
    toFirestore: (exercise: Exercise) => {
        return {
            name: exercise.name,
            duration: exercise.duration,
            calories: exercise.calories
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);

        return {
            id: snapshot.id,
            name: data['name'],
            duration: data['duration'],
            calories: data['calories'],
        } as Exercise;
    }
}

const finishedExercisesConverter = {
    toFirestore: (exercise: Exercise) => {
        return {
            name: exercise.name,
            duration: exercise.duration,
            calories: exercise.calories,
            date: exercise.date?.toUTCString(),
            state: exercise.state,
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);

        return {
            id: snapshot.id,
            name: data['name'],
            duration: data['duration'],
            calories: data['calories'],
            date: new Date(data['date']),
            state: data['state'],
        } as Exercise;
    }
}

export { availableExercisesConverter, finishedExercisesConverter };
