import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICardCollection, IMagicCollection, ISearchMagicCollection } from './types/types';
import { Observable, Subscription, catchError, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private _base_url: string = "https://api.magicthegathering.io"

  constructor(private http: HttpClient) {

  }

  getMagicCollections(collection: ISearchMagicCollection): Observable<IMagicCollection> {

    let concatenatedParams = ''

    if(collection.name !== ''){
      concatenatedParams = collection.name + "|" +collection.selectedBlock
    }else{
      concatenatedParams = collection.selectedBlock
    }

    let concatenedParams:string = collection.name + "|" + collection.selectedBlock
    return this.http.get<IMagicCollection>(`${this._base_url}/v1/sets?name=${concatenatedParams}`);
  }
  getMagicBoosters(code:string|undefined):Observable<ICardCollection>{
    return this.http.get<ICardCollection>(`${this._base_url}/v1/sets/${code}/booster`);
  }

}