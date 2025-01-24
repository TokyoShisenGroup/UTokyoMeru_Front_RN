import React, { useState, useRef } from 'react';
import { 
  View, 
  SafeAreaView,
  Text, 
  TextInput, 
  Image,
  ScrollView, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  Keyboard
} from 'react-native';
import { 
  IconButton,
  useTheme 
} from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from 'expo-router';

import { MessageProps} from '@/components/chatpage/message';
import Message from '@/components/chatpage/message';
import { useUser, DEFAULT_AVATAR } from '@/lib/dataRequest';

export default function ChatScreen() {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const theme = useTheme();
  const {id} = useLocalSearchParams();
  const {data: user, error: userError, isLoading: userLoading} = useUser(id as string);

  console.log('Chat Screen ID:', id);

  const handleSend = () => {
    if (inputText.trim() && user) {
      const newMessage: MessageProps = {
        id: Date.now(),
        content: inputText.trim(),
        isSender: true,
        timestamp: new Date(),
        status: 'pending',
        senderID: 1,
        receiverID: user.id,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {userLoading ? (
        <View style={styles.centerContainer}>
          <Text>加载中...</Text>
        </View>
      ) : userError ? (
        <View style={styles.centerContainer}>
          <Text>加载失败: {userError.message}</Text>
        </View>
      ) : !user ? (
        <View style={styles.centerContainer}>
          <Text>用户不存在</Text>
        </View>
      ) : (
        <>
          {/* Header */}
          <SafeAreaView style={styles.header}>
            <IconButton
              icon={props => <Icon name="arrow-left" {...props} />}
              onPress={() => router.back()}
            />
            <Image source={{ uri: user.avatar || DEFAULT_AVATAR }} style={styles.avatar} />
            <Text style={styles.headerTitle}>{user.user_name}</Text>
          </SafeAreaView>
          
          <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            {/* 聊天记录区域 */}
            <ScrollView
              ref={scrollViewRef}
              style={styles.messageContainer}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
              keyboardShouldPersistTaps="handled"
              onTouchStart={() => Keyboard.dismiss()}
            >
              {messages.map((message) => (
                <Message
                  key={message.id}
                  {...message}
                />
              ))}
            </ScrollView>

            {/* 底部输入区域 */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={handleSend}
                placeholder="输入消息..."
                returnKeyType="send"
              />
              {/*
              这部分是输入框的扩展功能，需要等到支持发送非文本类型时再添加
              <IconButton
                icon={props => <Icon name="plus" {...props} />}
                onPress={() => {console.log("plus")}}
              />
              */}
            </View>
          </KeyboardAvoidingView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '500',
  },
  messageContainer: {
    flex: 1,
    padding: 10,
    },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
