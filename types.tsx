export interface GoodProps {
    GoodID: string;
    Title: string;
    Images: string[];
    Price: number;
    Description: string;
    User: UserProps;
    Tags: string[];
}

export interface GoodPropsSimplified {
  GoodID: string;
  Title: string;
  Images: string[];
  Price: number;
  Description: string;
  User: UserDisplayProps;
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