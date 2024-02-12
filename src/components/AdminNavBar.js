import React from "react";

function AdminNavBar({ askForNewQuestion, goToQuestionList }) {
  return (
    <nav>
      <button onClick={askForNewQuestion}>New Question</button>
      <button onClick={goToQuestionList}>View Questions</button>
    </nav>
  );
}

export default AdminNavBar;
