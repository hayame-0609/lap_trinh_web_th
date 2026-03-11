import React,{useState,useEffect} from 'react'
import {Button,InputNumber,Card} from 'antd'

const DeThi = ()=>{

const [questions,setQuestions] = useState<any[]>([])
const [easy,setEasy] = useState(0)
const [medium,setMedium] = useState(0)
const [hard,setHard] = useState(0)

const [exam,setExam] = useState<any[]>([])

useEffect(()=>{
 const saved = localStorage.getItem("questions")
 if(saved) setQuestions(JSON.parse(saved))
},[])

const random = (arr:any[],n:number)=>{
 return arr.sort(()=>0.5-Math.random()).slice(0,n)
}

const createExam = ()=>{

const easyQ = random(questions.filter(q=>q.difficulty==="Dễ"),easy)
const mediumQ = random(questions.filter(q=>q.difficulty==="Trung bình"),medium)
const hardQ = random(questions.filter(q=>q.difficulty==="Khó"),hard)

setExam([...easyQ,...mediumQ,...hardQ])

}

return(

<div>

<Card title="Tạo đề thi">

<div>Dễ</div>
<InputNumber onChange={(v:any)=>setEasy(v)}/>

<div>Trung bình</div>
<InputNumber onChange={(v:any)=>setMedium(v)}/>

<div>Khó</div>
<InputNumber onChange={(v:any)=>setHard(v)}/>

<br/><br/>

<Button type="primary" onClick={createExam}>
Tạo đề
</Button>

</Card>

<br/>

<Card title="Đề thi">

{exam.map((q,i)=>(
<div key={i}>
{i+1}. {q.content}
</div>
))}

</Card>

</div>

)
}

export default DeThi