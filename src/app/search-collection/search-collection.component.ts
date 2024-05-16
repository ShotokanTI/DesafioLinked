import { Component, EventEmitter, Output } from '@angular/core';
import { ISearchMagicCollection } from '../types/types';

@Component({
  selector: 'app-search-collection',
  templateUrl: './search-collection.component.html',
  styleUrl: './search-collection.component.scss',
})
export class SearchCollectionComponent {
  searchCollection: ISearchMagicCollection ={
    name:'',
    selectedBlock:''
  }
  blocks = [
    { value: 'Amonkhet', viewValue: 'Amonkhet' },
    { value: 'Ixalan', viewValue: 'Ixalan' },
    { value: 'Zendikar', viewValue: 'Zendikar' },
    { value: 'Ravnica', viewValue: 'Ravnica' },
    { value: 'Onslaught', viewValue: 'Onslaught' },
  ];
  @Output('emitSearchByUserToParent') emitSearchByUserToParent = new EventEmitter<ISearchMagicCollection>();
  emitSearchByUser(){
    this.emitSearchByUserToParent.emit(this.searchCollection);
  }
}
