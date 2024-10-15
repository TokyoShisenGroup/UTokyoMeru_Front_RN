// 这部分是工具性类型定义

// 这部分是工具性类型定义


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






// response 系列
export interface ResponseForGetGoodsHomePage {
  description: string;
  good_id: number;
  images: string[];
  price: number;
  title: string;
  user: User;
}

export interface User {
  Avatar: string;
  Name: string;
}


export interface ResponseForGetSpecificGood {
  description: string;
  id: number;
  images: string[];
  price: number;
  title: string;
  user: User;
}

// TODO: 具体上到底是大写还是小写？？？？
  // 具体上到底是大写还是小写？？？？
export interface User {
  avatar: string;
  name: string;
  [property: string]: any;
}