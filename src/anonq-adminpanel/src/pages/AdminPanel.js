import React, { useState, useEffect } from "react";
import "../styling/AdminPanel.css"
import Question from "../components/Question";
import axios from "axios"



function AdminPanel() {
    const [allquestions, setAllQuestions] = useState([]);
    useEffect(() => {
        getQuestions()
    }, []);

    const getQuestions = () => {
        axios.get('https://localhost:44348/api/question')
        .then(function (response) {
          setAllQuestions(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    
    return (
        <div className="rounded container">
            <h2>Questions</h2>
            {allquestions.map((question, idx) => (
                    <Question key={question.id} question={question} refreshQuestions={getQuestions}  />
                ))}
                
            </div>
    );
}
export default AdminPanel