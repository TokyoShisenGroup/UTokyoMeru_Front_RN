declare module 'react-native-waterfall-flow' {
    import * as React from 'react';
    import { FlatListProps } from 'react-native';
  
    export interface WaterfallFlowProps<ItemT> extends FlatListProps<ItemT> {
      data: ItemT[];
      renderItem: (info: { item: ItemT; index: number; columnIndex: number }) => React.ReactElement | null;
      numColumns?: number;
      onEndReached?: () => void;
      keyExtractor?: (item: ItemT, index: number) => string;
      // 其他您需要的属性
    }
  
    export default class WaterfallFlow<ItemT> extends React.Component<WaterfallFlowProps<ItemT>> {
      // 将实例方法定义在组件类中，而不是属性中
      scrollToEnd(params?: { animated?: boolean }): void;
      scrollToIndex(params: { animated?: boolean; index: number; viewOffset?: number; viewPosition?: number }): void;
      scrollToItem(params: { animated?: boolean; item: ItemT; viewOffset?: number; viewPosition?: number }): void;
      scrollToOffset(params: { animated?: boolean; offset: number }): void;
      // 其他实例方法
    }
  }