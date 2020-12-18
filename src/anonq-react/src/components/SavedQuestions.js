import React, { useState } from "react";
import '../styling/Navigationbar.css';
import { Dropdown } from 'react-bootstrap';
import {
  Link
} from "react-router-dom";
import Cookies from 'js-cookie'
function SavedQuestions() {
  const [togglecookies, setToggleCookies] = useState(false)
  const [questioncookies, setQuestioncookies] = useState(Cookies.get)
  const getCookies = () => {
    setQuestioncookies(Cookies.get())
    if (questioncookies.QuestionID != null) {
      setToggleCookies(true)
    }
  }
  const ShowSavedQuestion = () => {
    return (
      <div>
        {(() => {
          if (questioncookies.QuestionID != null) {
            return (
              <div > <Link to={"/" + questioncookies.QuestionID}>
                {togglecookies ? <Dropdown.Item href="#/action-1">Your Question</Dropdown.Item> : null}
              </Link></div>
            )
          } else {
            return (
              <div ><Dropdown.Item>No Questions found</Dropdown.Item></div>
            )
          }
        })()}
      </div>
    )
  }

  return (
    <Dropdown onClick={getCookies}>
      <Dropdown.Toggle size="sm" id="dropdown-basic">
        Questions
</Dropdown.Toggle>
      <Dropdown.Menu data-testid="savedquestions-label-question">
        <ShowSavedQuestion />
      </Dropdown.Menu>
    </Dropdown>
  )
}
export default SavedQuestions