import { useState } from 'react';
import useWebSocket from 'react-use-websocket';

export const ChatAssistant = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const { sendMessage, lastMessage } = useWebSocket('ws://localhost:8080/ws/chat', {
    onMessage: (msg) => {
      if (msg.data) setMessages((prev) => [...prev, `AI: ${msg.data}`]);
    },
  });

  const handleSend = () => {
    if (input) {
      setMessages((prev) => [...prev, `You: ${input}`]);
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div>
      <div style={{ maxHeight: 300, overflowY: 'auto', marginBottom: 16 }}>
        {messages.map((msg, idx) => <div key={idx}>{msg}</div>)}
      </div>
      <Input.Search
        placeholder="輸入訊息"
        enterButton="送出"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onSearch={handleSend}
      />
    </div>
  );
};