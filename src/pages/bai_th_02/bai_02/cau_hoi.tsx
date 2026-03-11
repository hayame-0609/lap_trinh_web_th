import React, {useState,useEffect} from 'react'
import {Table,Button,Modal,Input,Select} from 'antd'

const {Option} = Select

const CauHoi = ()=>{

const [data,setData] = useState<any[]>([])
const [open,setOpen] = useState(false)

const [content,setContent] = useState('')
const [difficulty,setDifficulty] = useState('')
const [subject,setSubject] = useState('')
const [category,setCategory] = useState('')

useEffect(()=>{
 const saved = localStorage.getItem("questions")
 if(saved) setData(JSON.parse(saved))
},[])

const save = (newData:any)=>{
 setData(newData)
 localStorage.setItem("questions",JSON.stringify(newData))
}

const add = ()=>{
 const newItem={
  id:Date.now(),
  subject,
  content,
  difficulty,
  category
 }

 save([...data,newItem])
 setOpen(false)
}

const columns=[
 {title:"Môn",dataIndex:"subject"},
 {title:"Câu hỏi",dataIndex:"content"},
 {title:"Độ khó",dataIndex:"difficulty"},
 {title:"Khối",dataIndex:"category"}
]

return(
<div>

<Button type="primary" onClick={()=>setOpen(true)}>
Thêm câu hỏi
</Button>

<Table columns={columns} dataSource={data} rowKey="id"/>

<Modal visible={open} onOk={add} onCancel={()=>setOpen(false)}>

<Input
placeholder="Nội dung câu hỏi"
value={content}
onChange={(e)=>setContent(e.target.value)}
/>

<Select style={{width:"100%"}} onChange={setDifficulty} placeholder="Độ khó">

<Option value="Dễ">Dễ</Option>
<Option value="Trung bình">Trung bình</Option>
<Option value="Khó">Khó</Option>
<Option value="Rất khó">Rất khó</Option>

</Select>

<Input
placeholder="Môn học"
value={subject}
onChange={(e)=>setSubject(e.target.value)}
/>

<Input
placeholder="Khối kiến thức"
value={category}
onChange={(e)=>setCategory(e.target.value)}
/>

</Modal>

</div>
)
}

export default CauHoi