import React, { useState } from "react";

function QuestionForm({addNewQuestionToData}) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: [
      "",
     "",
     "",
     "",
    ],
    correctIndex: 0

  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleChangeAnswer(e) {
    setFormData((prevFormData) => {
      const inputId = parseInt(e.target.id)
      if(!isNaN(inputId)) {
        const updatedFormData = {...prevFormData}
      updatedFormData.answers[inputId] = e.target.value
      return updatedFormData
      }else{
        return prevFormData
      }
     
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    performPost(formData)


    
  }

  const performPost = async (formData) => {
    try{
      const response = await fetch("http://localhost:4000/questions",{
        method: "POST",
         headers:{
          'Content-Type' : "application/json",
         },
         body: JSON.stringify(formData)
      })
      if(!response.ok) {
          const error = new Error("error performing post")
          error.status = response.status
          error.statusText = response.statusText
          throw error;
      }else{
        console.log(formData)
        addNewQuestionToData(formData)
      }
    }catch(error){
      console.error(error.message,"error status text is: ", error.statusText )
    }
  }
  

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answers[0]}
            id={0}
            onChange={handleChangeAnswer}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answers[1]}
            id={1}
            onChange={handleChangeAnswer}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={formData.answers[2]}
            id={2}
            onChange={handleChangeAnswer}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={formData.answer4}
            id={3}
            onChange={handleChangeAnswer}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">{formData.answers[0]}</option>
            <option value="1">{formData.answers[1]}</option>
            <option value="2">{formData.answers[2]}</option>
            <option value="3">{formData.answers[3]}</option>
          </select>
        </label>
        <button type="submit" onSubmit={handleSubmit}>Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
