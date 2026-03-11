import React, { useState } from 'react';
import { Card, Button, Space, Table, Typography } from 'antd';

const { Title } = Typography;

const choices = ['Búa', 'Kéo', 'Bao'];

interface HistoryItem {
  key: number;
  player: string;
  computer: string;
  result: string;
}

const MiniGame: React.FC = () => {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const getComputerChoice = () => {
    const random = Math.floor(Math.random() * 3);
    return choices[random];
  };

  const getResult = (player: string, computer: string) => {
    if (player === computer) return 'Hòa';

    if (
      (player === 'Búa' && computer === 'Kéo') ||
      (player === 'Kéo' && computer === 'Bao') ||
      (player === 'Bao' && computer === 'Búa')
    ) {
      return 'Thắng';
    }

    return 'Thua';
  };

  const playGame = (choice: string) => {
    const computer = getComputerChoice();
    const gameResult = getResult(choice, computer);

    setPlayerChoice(choice);
    setComputerChoice(computer);
    setResult(gameResult);

    const newHistory = {
      key: history.length + 1,
      player: choice,
      computer: computer,
      result: gameResult,
    };

    setHistory([newHistory, ...history]);
  };

  const columns = [
    { title: 'Ván', dataIndex: 'key' },
    { title: 'Bạn', dataIndex: 'player' },
    { title: 'Máy', dataIndex: 'computer' },
    { title: 'Kết quả', dataIndex: 'result' },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card title="🎮 Trò Chơi Oẳn Tù Tì">

        <Space style={{ marginBottom: 20 }}>
          <Button type="primary" onClick={() => playGame('Búa')}>
            Búa
          </Button>

          <Button type="primary" onClick={() => playGame('Kéo')}>
            Kéo
          </Button>

          <Button type="primary" onClick={() => playGame('Bao')}>
            Bao
          </Button>
        </Space>

        <Title level={5}>Bạn chọn: {playerChoice}</Title>
        <Title level={5}>Máy chọn: {computerChoice}</Title>
        <Title level={4}>Kết quả: {result}</Title>

        <Table
          style={{ marginTop: 20 }}
          columns={columns}
          dataSource={history}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default MiniGame;