import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


interface ButtonProps {
  label: string;
  icon: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, icon, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <MaterialIcons name={icon as any} size={24} color="#333" style={styles.icon} />
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);


// 待完成...
const ButtonSheets: React.FC = () => {
  const buttons = [
    { label: '收藏', icon: 'favorite', onPress: () => console.log('收藏被点击') },
    { label: '评论', icon: 'comment', onPress: () => console.log('评论被点击') },
    { label: '查相关', icon: 'search', onPress: () => console.log('查相关被点击') },
    { label: '分享', icon: 'share', onPress: () => console.log('分享被点击') },
    // 添加更多按钮...
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {buttons.map((button, index) => (
          <Button key={index} {...button} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  scrollViewContent: {
    paddingHorizontal: 0,
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: hp(1),
    paddingVertical: hp(0.5),
    borderRadius: 6,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});

export default ButtonSheets;
