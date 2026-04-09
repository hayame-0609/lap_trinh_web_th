import { Progress, Alert } from 'antd';

export default function NganSach() {
  const percent = 75;

  return (
    <div>
      <h1>Ngân sách</h1>

      <Progress percent={percent} />

      {percent > 70 && (
        <Alert message="Vượt ngân sách!" type="warning" />
      )}
    </div>
  );
}