export interface ISearchMagicCollection {
    name: string | null,
    selectedBlock: string,
}

export interface IMagicCollection{
    sets: IMagicCollectionView[]
}

export interface IMagicCollectionView {
    name?: string,
    code?:string,
    block?: string,
    releaseDate?: string,
    booster?:string[],
}
export interface ICardView {
    name: string;
    manaCost: string;
    colorIdentity: string[];
    text: string;
    imageUrl:string
    types?:string[]
  }
  
  export interface ICardCollection {
    cards: ICardView[];
  }