import { Component, Input } from '@angular/core';
import { IMagicCollectionView } from '../types/types';

@Component({
  selector: 'app-choose-collection',
  templateUrl: './choose-collection.component.html',
  styleUrl: './choose-collection.component.scss'
})
export class ChooseCollectionComponent {
 @Input('magicCollectionView') magicCollectionView:IMagicCollectionView = {}
  backgroundUrl:string = ''
  collections:string[] = ['Ixalan', 'Zendikar' ,'Ravnica','Onslaught']
  ngOnInit(){
    if(!this.collections.includes(this.magicCollectionView.block ?? "")){
      this.magicCollectionView.block = "unknow-card";
    }

   this.backgroundUrl = "../../assets/backgrounds-sets/" + this.magicCollectionView.block?.toLowerCase() + '.png';
 }

}
