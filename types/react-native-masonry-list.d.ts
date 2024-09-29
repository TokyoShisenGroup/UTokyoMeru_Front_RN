declare module 'react-native-masonry-list' {
  import { ComponentType } from 'react';
  import { ViewStyle } from 'react-native';

  interface MasonryListProps {
    data: any[];
    renderItem: ({ item: any, index: number }) => React.ReactElement;
    keyExtractor: (item: any, index: number) => string;
    numColumns?: number;
    columnWidth?: number;
    spacing?: number;
    style?: ViewStyle;
    contentContainerStyle?: ViewStyle;
    onEndReached?: () => void;
    onEndReachedThreshold?: number;
    ListFooterComponent?: ComponentType<any> | React.ReactElement;
    [key: string]: any;
  }

  const MasonryList: React.FC<MasonryListProps>;

  export default MasonryList;
}
