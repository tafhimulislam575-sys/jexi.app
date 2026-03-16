import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Platform,
} from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const BACKEND_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:3000";

export default function ChatScreen() {
  const colors = useColors();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Oh great, another human who needs my help. What do you want?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setLoading(true);

    try {
      const formattedMessages = messages
        .concat(userMessage)
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: formattedMessages }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Ugh, something went wrong. Try again, will you?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.role === "user";
    return (
      <View
        className={`flex-row mb-3 ${isUser ? "justify-end" : "justify-start"} px-4`}
      >
        <View
          className={`max-w-xs rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-primary"
              : "bg-surface border border-border"
          }`}
        >
          <Text
            className={`text-base leading-relaxed ${
              isUser ? "text-background" : "text-foreground"
            }`}
          >
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  const renderTypingIndicator = () => {
    if (!loading) return null;
    return (
      <View className="flex-row items-center mb-3 px-4">
        <View className="bg-surface border border-border rounded-2xl px-4 py-3 flex-row gap-1">
          <View className="w-2 h-2 rounded-full bg-muted" />
          <View className="w-2 h-2 rounded-full bg-muted" />
          <View className="w-2 h-2 rounded-full bg-muted" />
        </View>
      </View>
    );
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-surface border-b border-border px-4 py-3">
        <Text className="text-2xl font-bold text-foreground">JEXI</Text>
        <Text className="text-sm text-muted">Your sarcastic AI assistant</Text>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 12 }}
        scrollEnabled={true}
        onContentSizeChange={scrollToBottom}
      />

      {/* Typing Indicator */}
      {renderTypingIndicator()}

      {/* Input Area */}
      <View className="border-t border-border bg-background px-4 py-3">
        <View className="flex-row items-center gap-2">
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Say something to Jexi..."
            placeholderTextColor={colors.muted}
            multiline
            maxLength={500}
            editable={!loading}
            className="flex-1 bg-surface border border-border rounded-full px-4 py-3 text-foreground"
            style={{
              color: colors.foreground,
              maxHeight: 100,
            }}
          />
          <TouchableOpacity
            onPress={sendMessage}
            disabled={loading || !inputText.trim()}
            style={{
              opacity: loading || !inputText.trim() ? 0.5 : 1,
            }}
            className="bg-primary rounded-full p-3"
          >
            {loading ? (
              <ActivityIndicator color={colors.background} size="small" />
            ) : (
              <Text className="text-background font-bold text-lg">→</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
}
