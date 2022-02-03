import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.interface';
import { TrainingService } from '../training.service';
import { Firestore, collectionData, collection, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { doc, onSnapshot, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
@Component({
  selector: 'fit-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  public availableExercises$!: Observable<Exercise[]>;

  constructor(private readonly firestore: Firestore, private readonly trainingService: TrainingService) { }

  public onStartTraining(newTrainingForm: NgForm): void {
    this.trainingService.startExercise(newTrainingForm.value.exercise);
  }

  ngOnInit(): void {
    const cityConverter = {
      toFirestore: (exercise: Exercise) => {
        return {
          name: exercise.name,
          state: exercise.state,

        };
      },
      fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        const id = snapshot.id;
        return { id, ...data } as Exercise;
      }
    }

    const data = collection(this.firestore, 'availableExercises').withConverter(cityConverter);
    this.availableExercises$ = collectionData(data);
    this.availableExercises$.subscribe(console.log);


    // const querySnapshot = getDocs(data).then(result => {
    //   result.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //   });
    // });

    // const unsubscribe = onSnapshot(data, (snapshot) => {
    //   snapshot.docChanges().forEach((change) => {
    //     console.log(change.doc.id, change.doc.data());
    //   }
    //   )
    // });

    // const unsub = onSnapshot(collection(this.firestore, "availableExercises"), (doc) => {
    //   doc.forEach((doc) => {
    //     console.log(doc.id, " => ", doc.data());
    //   })
    // })

    // unsub();
  }

}
