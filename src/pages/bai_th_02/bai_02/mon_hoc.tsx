import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input } from 'antd';

const MonHoc = () => {

  const [data,setData] = useState<any[]>([]);
  const [open,setOpen] = useState(false);

  const [id,setId] = useState('');
  const [name,setName] = useState('');
  const [credits,setCredits] = useState('');

  useEffect(()=>{
    const saved = localStorage.getItem("subjects");
    if(saved) setData(JSON.parse(saved));
  },[]);

  const save = (newData:any)=>{
    setData(newData);
    localStorage.setItem("subjects",JSON.stringify(newData));
  }

  const add = ()=>{
    const newItem = {
      id,
      name,
      credits
    }

    save([...data,newItem]);

    setOpen(false);
    setId('');
    setName('');
    setCredits('');
  }

  const columns = [
    {title:"Mã môn",dataIndex:"id"},
    {title:"Tên môn",dataIndex:"name"},
    {title:"Tín chỉ",dataIndex:"credits"}
  ]

  return(
    <div>

      <Button type="primary" onClick={()=>setOpen(true)}>
        Thêm môn
      </Button>

      <Table columns={columns} dataSource={data} rowKey="id"/>

      <Modal visible={open} onOk={add} onCancel={()=>setOpen(false)}>

        <Input placeholder="Mã môn" value={id} onChange={(e)=>setId(e.target.value)}/>

        <Input placeholder="Tên môn" value={name} onChange={(e)=>setName(e.target.value)}/>

        <Input placeholder="Tín chỉ" value={credits} onChange={(e)=>setCredits(e.target.value)}/>

      </Modal>

    </div>
  )
}

export default MonHoc