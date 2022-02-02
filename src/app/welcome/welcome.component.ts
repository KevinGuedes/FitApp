import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Exercise } from '../training/exercise.interface';

@Component({
  selector: 'fit-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public item$!: Observable<Exercise[]>;

  constructor(private readonly firestore: Firestore) { }

  ngOnInit(): void {
    const data = collection(this.firestore, 'availableExercises');
    this.item$ = collectionData(data).pipe(
      map(items => items as Exercise[])
    );

    this.item$.subscribe(console.log);
  }

}
