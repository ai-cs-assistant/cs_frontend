import React, { useEffect, useRef, useState } from 'react';
import { Button, Card } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './Chat.css';


const demo_messages = [
    {
      role: "agent",
      message: "我能推薦什麼商品給這位買了咖啡機的客戶？"
    },
    {
      role: "assistant",
      message: "這位客戶購買了「濃縮咖啡機」，根據常見搭配，推薦以下加購商品：\n\n- 不銹鋼奶泡杯（95 元）\n- 義式濾網組（199 元）\n- 咖啡豆 1kg（會員價 299 元）\n\n是否要我幫您生成一段推銷訊息？"
    },
    {
      role: "agent",
      message: "好，幫我寫一段自然一點的話。"
    },
    {
      role: "assistant",
      message: "您可以回覆客戶：\n\n「為了讓您的咖啡體驗更完整，我們推薦幾項加購好物：奶泡杯、濾網組，還有優惠的咖啡豆組合，歡迎參考哦 ☕」\n\n要幫您一鍵送出嗎？"
    }
  ];


const ChatPanel = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<{ role: string; message: string }[]>(demo_messages);
  const [input, setInput] = useState('');
  const wsRef = useRef<WebSocket | null>(null);
  const mountedRef = useRef(true);
  const reconnectTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    mountedRef.current = true;

    const connectWebSocket = () => {
      if (!mountedRef.current) return;

      // 如果已經有連接，先關閉
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }

      console.log('ChatPanel useEffect... 準備連線 websocket');
      const socket = new WebSocket('ws://localhost:8080/ws/chat');
      wsRef.current = socket;

      socket.onopen = () => {
        console.log('WebSocket connected');
        // 連接成功後清除重連計時器
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = undefined;
        }
      };

      socket.onmessage = (event) => {
        if (!mountedRef.current) return;
        const message = event.data;
        setMessages((prev) => [...prev, { role: 'assistant', message }]);
      };

      socket.onerror = (e) => {
        if (!mountedRef.current) return;
        console.error('WebSocket error:', e);
      };

      socket.onclose = () => {
        if (!mountedRef.current) return;
        console.log('WebSocket closed');
        
        // 如果組件仍然掛載，嘗試重連
        if (mountedRef.current && !reconnectTimeoutRef.current) {
          reconnectTimeoutRef.current = window.setTimeout(() => {
            console.log('Attempting to reconnect...');
            connectWebSocket();
          }, 3000); // 3秒後重試
        }
      };
    };

    connectWebSocket();

    return () => {
      mountedRef.current = false;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        console.log('ChatPanel useEffect... 準備 close websocket');
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(input);
      setMessages((prev) => [...prev, { role: 'agent', message: input }]);
      setInput('');
    }
  };

  return (
    <div style={{ margin: '24px 16px 24px 0', width: '500px', flexShrink: 0 }}>
      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>AI 聊天室</span>
            <CloseOutlined style={{ cursor: 'pointer' }} onClick={onClose} />
          </div>
        }
        style={{
          height: '100%',
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'column',
        }}
        bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0 }}
      >
        {/* 訊息區 */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-message ${msg.role === 'assistant' ? 'left' : 'right'}`}
            >
              <div className={`bubble ${msg.role === 'assistant' ? 'ai' : 'user'}`}>
                {msg.role === 'assistant' ? 'AI：' : ''}
                {msg.message.split('\n').map((line, j) => <div key={j}>{line}</div>)}
              </div>
            </div>
          ))}
        </div>

        {/* 輸入區 */}
        <div className="chat-input-container">
          <textarea
            placeholder="請輸入訊息..."
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            className="chat-textarea"
          />
          <div className="chat-button-container">
            <Button 
              type="default"
              onClick={sendMessage}
              className="chat-send-button"
            >
              送出訊息
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatPanel;