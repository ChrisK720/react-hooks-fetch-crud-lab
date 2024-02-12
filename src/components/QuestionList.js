import React from "react";

function QuestionList({FetchedQuizData, deleteQuestionServer, changedCorrectAns}) {
  return (
    <section>
      <h1>Quiz Questions</h1>

      

      {FetchedQuizData.map((question) => (
        <div key={question.id}>
          <li>{question.prompt}</li>
          <button onClick={() => deleteQuestionServer(question.id)}>Delete</button>
          <select onChange={changedCorrectAns} id={question.id}>
           <option value='0'>{question.answers[0]}</option>
           <option value='1'>{question.answers[1]}</option>
           <option value='2'>{question.answers[2]}</option>
           <option value='3'>{question.answers[3]}</option>



          </select>
        </div>
      ))}


      <ul>{/* display QuestionItem components here after fetching */}</ul>
    </section>
  );
}

export default QuestionList;
