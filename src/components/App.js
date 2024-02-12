import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App () {

const [page,setPage] = useState("quiz list")
const [onList, setOnList] = useState(true)
const [data,setData] = useState([])
const [count, setCount] = useState(0)

useEffect( async () => {
  try {
    const response = await fetch("http://localhost:4000/questions")
    if(response.ok){
      const fetchData = await response.json()
    setData(fetchData)
    } else {
      console.error('reached the server but something went worng')
    }
  }catch(error) {
     console.error("something went wrong with inital fetch")
  }
}, [])



async function askForNewQuestion() {
  setOnList((prevOnList) => {
    changePage(!prevOnList)
    return(!prevOnList)
   })
  
}

function changePage(newOnList) {
  setPage(newOnList ? "quiz list" : "Form")
}

function addNewQuestionToData (formData) {
     formData.id = data.length + 1
      setData((prevData) => [...prevData, formData])
}

function goToQuestionList() {
    setOnList((prevOnList) => !prevOnList)
}
useEffect(() => {
  setPage(onList ? "quiz list" : "Form")
})

const deleteQuestionServer = async (questionId) => {
  try {
    const response = await fetch(`http://localhost:4000/questions/${questionId}`,{
    method: "DELETE", 
    headers : {
        'Content-Type':'application/json'

    }
  })
  if(!response.ok){
    throw new Error('There was an issue with the Delete request')
  }else{
    renderLessQuestions(questionId)
  }
  }catch(error){
     console.error(error.message)
  }
}

function renderLessQuestions(questionId) {
  setData((prevData) => {
    return prevData.filter((question) => question.id !== questionId)
  })
}

function changedCorrectAns(e) {
  const  correctIndex = e.target.value
  const questionId = e.target.id
  performPatch(correctIndex,questionId)
}

const performPatch = async (correctIndex,questionId) => {
  try{
  const response = fetch(`http://localhost:4000/questions/${questionId}`,{
    method:'PATCH',
    headers: {
      'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
      
    },
    body: JSON.stringify({'correctIndex': correctIndex})
  })
  if(response.ok){
    console.log('Correct answer has been changed')
    setCount((prevCount) => prevCount + 1)
  }else{
    throw new Error('There was a problem with the patch request data was not changed on data base')
  }
 }catch(error){
    console.error(error.message)
 }

}










  

  return (
    <main>
      <AdminNavBar  askForNewQuestion={askForNewQuestion} goToQuestionList={goToQuestionList}/>
      {page === "Form" ? <QuestionForm addNewQuestionToData={addNewQuestionToData} /> : <QuestionList FetchedQuizData={data}  deleteQuestionServer={deleteQuestionServer} changedCorrectAns={changedCorrectAns} />}
    </main>
  );
}

export default App;
