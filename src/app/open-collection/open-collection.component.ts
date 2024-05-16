import { Component, Input } from '@angular/core';
import { ICardView } from '../types/types';

@Component({
  selector: 'app-open-collection',
  templateUrl: './open-collection.component.html',
  styleUrl: './open-collection.component.scss'
})
export class OpenCollectionComponent {

  private _card: ICardView = {
    name: '',
    manaCost: '',
    colorIdentity: [],
    text: '',
    imageUrl: ''
  };

  @Input('card')
  set card(value: ICardView) {
    if (value) {
      // Aqui você pode adicionar lógica de validação, se necessário
      this._card = value;
    }
  }

  get card(): ICardView {
    return this._card;
  }

set manaCost(manaCost: string) {
  this._card.manaCost = manaCost
}

get manaCost(): string | undefined {
  return this._card.manaCost.match(/\d+/)?.[0]
}

flipped = false;

  flipCard() {
    this.flipped = !this.flipped
  }
  
}
