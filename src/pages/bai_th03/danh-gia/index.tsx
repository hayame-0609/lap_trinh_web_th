import { Rate, Input, Button, message } from 'antd';
import { useState } from 'react';

export default function DanhGia() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const submit = () => {
    message.success('Đã gửi đánh giá');
    setRating(0);
    setComment('');
  };

  return (
    <>
      <Rate value={rating} onChange={setRating} />
      <Input.TextArea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Nhận xét..."
      />
      <Button onClick={submit}>Gửi</Button>
    </>
  );
}