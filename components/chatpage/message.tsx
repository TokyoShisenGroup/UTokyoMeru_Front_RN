import { View, Text, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { useUser, DEFAULT_AVATAR } from '@/lib/dataRequest';


export interface MessageProps {
    id: number;
    senderID: number;
    receiverID: number;
    content: string;
    isSender: boolean;
    timestamp: Date;
    status: string;
}

const Message = (message: MessageProps) => {
    const {data: sender, error: senderError, isLoading: senderLoading} = useUser(message.senderID.toString());
    const {data: receiver, error: receiverError, isLoading: receiverLoading} = useUser(message.receiverID.toString());
    
    if (message.isSender){
        return (         
            <View
                key={message.id}
                style={[
                styles.messageRow,
                styles.senderRow,
            ]}
            >
            <View
                style={[
                    styles.messageBubble,
                    message.isSender ? styles.senderBubble : styles.receiverBubble,
                ]}
                >
                <Text style={styles.senderText}>
                    {message.content}
                </Text>
            </View>
            <Image source={{ uri: sender?.avatar || DEFAULT_AVATAR }} style={styles.avatar} />
          </View>
        );
    }else{
        return (         
            <View
                key={message.id}
                style={[
                styles.messageRow,
                styles.receiverRow,
            ]}
            >
            <Image source={{ uri: receiver?.avatar || DEFAULT_AVATAR }} style={styles.avatar} />
            <View
                style={[
                    styles.messageBubble,
                    message.isSender ? styles.senderBubble : styles.receiverBubble,
                ]}
                >
                <Text style={styles.receiverText}>
                    {message.content}
                </Text>
            </View>
          </View>
        );
    }
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
    flexDirection: 'row',
    maxWidth: '70%',
    padding: 12,
    borderRadius: 16,
    marginHorizontal: 10,
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
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    }
})

export default Message;