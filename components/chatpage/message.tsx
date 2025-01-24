import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

export interface MessageProps {
    id: number;
    content: string;
    isSender: boolean;
    timestamp: Date;
  }


const Message = (message: MessageProps) => {
    return (         
        <View
            key={message.id}
            style={[
            styles.messageRow,
            message.isSender ? styles.senderRow : styles.receiverRow,
        ]}
        >
        <View
            style={[
                styles.messageBubble,
                message.isSender ? styles.senderBubble : styles.receiverBubble,
            ]}
            >
            <Text style={message.isSender ? styles.senderText : styles.receiverText}>
            {message.content}
          </Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    messageRow: {
    flexDirection: 'row',
    marginVertical: 5,
    },
    senderRow: {
    justifyContent: 'flex-end',
    },
    receiverRow: {
    justifyContent: 'flex-start',
    },
    messageBubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 16,
    },
    senderBubble: {
    backgroundColor: '#007AFF',
    },
    receiverBubble: {
    backgroundColor: '#E8E8E8',
    },
    senderText: {
    color: '#FFFFFF',
    },
    receiverText: {
    color: '#000000',
    },
})

export default Message;