import React, { useState } from 'react';
import { Card, InputNumber, Button, Typography, Space, message } from 'antd';

const { Text } = Typography;

const MiniGame: React.FC = () => {
  const maxAttempts = 7;
  const [secretNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const handleGuess = () => {
    if (guess === null) {
      message.warning('Vui lòng nhập một số');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (guess === secretNumber) {
      setResult(` Chúc mừng! Bạn đoán đúng số ${secretNumber} trong ${newAttempts} lượt!`);
      setGameOver(true);
    } else if (newAttempts >= maxAttempts) {
      setResult(` Hết lượt! Số đúng là ${secretNumber}`);
      setGameOver(true);
    } else if (guess < secretNumber) {
      setResult('Số bạn đoán nhỏ hơn, hãy thử lại!');
    } else {
      setResult(' Số bạn đoán lớn hơn, hãy thử lại!');
    }
    setGuess(null);
  };

  const resetGame = () => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setGuess(null);
    setAttempts(0);
    setResult('');
    setGameOver(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <Card title="Mini Game - Đoán Số (1-100)">
        <Space direction="vertical" size="middle">
          <Text>Bạn có {maxAttempts - attempts} lượt còn lại</Text>

          <InputNumber
            min={1}
            max={100}
            value={guess}
            onChange={(value) => setGuess(value)}
            disabled={gameOver}
          />

          <Button type="primary" onClick={handleGuess} disabled={gameOver}>
            Đoán
          </Button>

          <Text strong>{result}</Text>

          {gameOver && (
            <Button onClick={resetGame}>
              Chơi lại
            </Button>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default MiniGame;