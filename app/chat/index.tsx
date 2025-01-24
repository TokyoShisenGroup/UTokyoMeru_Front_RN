import React, { useState, useRef } from 'react';
import { 
  View, 
  SafeAreaView,
  Text, 
  TextInput, 
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
import { router } from 'expo-router';

import { MessageProps} from '@/components/chatpage/message';
import Message from '@/components/chatpage/message';

export default function ChatScreen() {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const theme = useTheme();

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: MessageProps = {
        id: Date.now(),
        content: inputText.trim(),
        isSender: true,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        {/* Header */}
        <SafeAreaView style={styles.header}>
          <IconButton
            icon={props => <Icon name="arrow-left" {...props} />}
            onPress={() => router.back()}
          />
          <Text style={styles.headerTitle}>用户名</Text>
        </SafeAreaView>

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
            blurOnSubmit={true}
            
          />
          <IconButton
            icon={props => <Icon name="plus" {...props} />}
            onPress={() => {console.log("plus")}}
          />
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
});
