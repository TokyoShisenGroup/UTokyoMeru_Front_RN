export interface GoodProps {
    good_id: string;
    title: string;
    images: string[];
    price: number;
    description: string;
    user: UserProps;
    tags: string[];
}

export interface GoodPropsSimplified {
  good_id: string;
  title: string;
  images: string[];
  price: number;
  description: string;
  user: UserDisplayProps;
}
  
export interface ImageProps {
    Uri: string;
  }
  
export interface ColumnProps {
    Data: GoodPropsSimplified[];
  }
  
export interface UserDisplayProps {
    Name: string;
    Avatar: string;
}

export interface UserProps {
    UserID: string;
    Name: string;
    Avatar: string;
    Rating: number;
}

export interface TagProps {
  text: string;
  color?: string;
  backgroundColor?: string;
  onPress?: () => void;
}