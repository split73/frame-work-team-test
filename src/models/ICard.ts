export interface ICardData {
    authorId: number;
    created: string;
    id: number;
    imageUrl: string;
    locationId: number;
    name: string;
}

export interface ICard {
  data: ICardData[];
  paginationLastPageLink: string | null | undefined;
}
