import { Input, Button } from 'antd';
import { useState } from 'react';

export const SearchPanel = ({ onSearch }: { onSearch: (customerId: string) => void }) => {
  const [input, setInput] = useState('');
  return (
    <div style={{ marginBottom: '16px' }}>
      <Input
        placeholder="輸入客戶編號"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: 200, marginRight: 8 }}
      />
      <Button type="primary" onClick={() => onSearch(input)}>查詢</Button>
    </div>
  );
};