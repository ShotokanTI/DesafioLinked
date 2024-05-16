import { Component } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, filter, map, switchMap, take, toArray } from 'rxjs';
import { ICardCollection, ICardView, IMagicCollection, ISearchMagicCollection } from '../types/types';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss',
})
export class StepsComponent {
  stepComponentsVisibility = [true, false, false];
  magicCollections: IMagicCollection = { sets: [] };
  isRequested = false;
  magicBoosters: ICardCollection = { cards: []};
  totalCreatureCards = 0;
  canReset = false;

  constructor(
    private http: HttpClientService,
    private _snackBar: MatSnackBar) { }

  getMagicCollections(magicCollection: ISearchMagicCollection) {
    if (!magicCollection.selectedBlock) {
      const errorMessage = 'O parâmetro "block" é obrigatório.';
      this.isRequested = false;
      this._snackBar.open(errorMessage, 'Fechar');
      return;
    }
    this.isRequested = true;
    this.stepComponentsVisibility[0] = false;

    this.http.getMagicCollections(magicCollection).pipe(
      catchError(error => {
        console.log('Erro na solicitação:', error);
        this._snackBar.open('Ocorreu um erro ao recuperar os conjuntos.', 'Fechar');
        this.isRequested = false;
        this.stepComponentsVisibility[1] = true;
        throw error; // Lançar o erro para ser capturado pelo componente, se necessário
      })
    ).subscribe((data) => {
      this.isRequested = false;
      this.stepComponentsVisibility[0] = false;
      this.stepComponentsVisibility[1] = true;
      this.magicCollections = { sets: data.sets.filter(x => x.booster) }
    });
  }

  getMagicBoosters(code: string | undefined): void {
    let creatureCards:ICardView[] = [];

    this.isRequested = true;
    this.stepComponentsVisibility[1] = false;
    this.http.getMagicBoosters(code)
      .pipe(catchError((error) => {
        this._snackBar.open('Ocorreu um erro ao recuperar os conjuntos.', 'Fechar');
        this.isRequested = false;
        throw error;
      }))
      .pipe(switchMap(response => response.cards))
      .pipe(filter(card => card.types?.includes('Creature') === true))
      .pipe(take(30 - this.totalCreatureCards))
      .pipe(toArray())
      .pipe(map((cards) => {
        this.totalCreatureCards += cards.length; // Atualiza o total de cartas de criatura
        this.magicBoosters.cards.push(...cards); // Adiciona as cartas ao array de cartas de criatura
        if (this.totalCreatureCards < 30) {
          // Se ainda não tivermos 30 cartas de criatura, fazemos outra chamada recursiva
           return this.getMagicBoosters(code);
          } else {
          this.canReset = true;
          this.totalCreatureCards = 0
          return creatureCards; // Se já tivermos 30 cartas de criatura, retornamos o array
        }
      }))
      .subscribe(() => {
        this.isRequested = false;
        this.stepComponentsVisibility[1] = false;
        this.stepComponentsVisibility[2] = true;
        });
        
  }

  reset(){
    this.stepComponentsVisibility[0] = true;
    this.stepComponentsVisibility[1] = false;
    this.stepComponentsVisibility[2] = false;
    this.magicCollections = { sets: [] };
    this.magicBoosters = { cards: [] };
    this.canReset = false;
  }
}
