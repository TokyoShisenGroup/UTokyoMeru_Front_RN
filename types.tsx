export interface GoodProps {
    id: string;
    title: string;
    image: string;
    images: string[];
    price: number;
    description: string;
    user: UserProps;
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

export interface UserProps {
    id: string;
    name: string;
    avatar: string;
    rating: number;
}

export interface TagProps {
  text: string;
  color?: string;
  backgroundColor?: string;
  onPress?: () => void;
}