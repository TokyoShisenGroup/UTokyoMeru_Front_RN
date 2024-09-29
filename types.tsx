export interface GoodProps {
    id: string;
    title: string;
    image: string;
    images: string[];
    price: number;
    description: string;
    user: UserDisplayProps;
    tags: string[];
}

export interface GoodPropsSimplified {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  user: UserDisplayProps;
}
  
export interface ImageProps {
    uri: string;
  }
  
export interface ColumnProps {
    data: GoodPropsSimplified[];
  }
  
export interface UserDisplayProps {
    name: string;
    avatar: string;
}
