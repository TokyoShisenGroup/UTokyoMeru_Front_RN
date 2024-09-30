import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // 假设使用MaterialIcons
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


interface ButtonProps {
  label: string;
  icon: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, icon, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Icon name={icon} size={24} color="#333" style={styles.icon} />
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const ButtonSheets: React.FC = () => {
  const buttons = [
    { label: '收藏', icon: 'home', onPress: () => console.log('选项1被点击') },
    { label: '评论', icon: 'search', onPress: () => console.log('选项2被点击') },
    { label: '查相关', icon: 'favorite', onPress: () => console.log('选项3被点击') },
    { label: '选项4', icon: 'favorite', onPress: () => console.log('选项4被点击') },
    { label: '选项5', icon: 'favorite', onPress: () => console.log('选项5被点击') },
    { label: '选项6', icon: 'favorite', onPress: () => console.log('选项6被点击') },
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
