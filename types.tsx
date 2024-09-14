export interface GoodProps {
    id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    user: UserDisplayProps;
}
  
  export interface ImageProps {
    uri: string;
  }
  
  export interface ColumnProps {
    data: GoodProps[];
  }
  
  export interface UserDisplayProps {
    name: string;
    avatar: string;
}
  