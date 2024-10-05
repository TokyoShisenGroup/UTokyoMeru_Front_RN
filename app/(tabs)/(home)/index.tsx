import React from 'react';
import GoodsList from '@/components/homepage/GoodsList';
import ISearchBar from '@/components/homepage/ISearchBar';
import {GoodPropsSimplified} from '@/types';
import { SafeAreaView, View } from 'react-native';
import { useState, useEffect } from 'react';

function HomeScreen() {
  return (
    <SafeAreaView>
      <ISearchBar onSearch={()=>{console.log("Hello")}}/>
      <GoodsList />
    </SafeAreaView>
  );
}

export default HomeScreen;
