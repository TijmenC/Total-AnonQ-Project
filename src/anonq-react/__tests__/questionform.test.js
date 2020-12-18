import { queryByTestId, render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from "axios";
import { MemoryRouter } from 'react-router-dom';
import React from "react"
import QuestionForm from "../src/components/QuestionForm"
import "regenerator-runtime/runtime.js";


import QuestionService from "../src/Services/QuestionService";

jest.mock("../src/Services/QuestionService");


describe("QuestionForm input test", () => {
  it('Test QuestionForm input renders', () => {

    const mockFn = QuestionService.PostQuestion.mockImplementation(() => Promise.resolve({
      response: { status: 200 },
      data:
      {
        id: 11,
        title: "Title 2",
        description: "Dit is een test beschrijving",
        image: null,
        tag: "Relationship",
        commentsEnabled: true,
        deletionTime: "2020-12-03T12:58:53.6421923"
      }
    }));


    const { queryByTestId } = render(<MemoryRouter initialEntries={["/"]}><QuestionForm /></MemoryRouter>);


    const inputTitle = queryByTestId("questionform-input-title");
    fireEvent.change(inputTitle, { target: { value: 'Title' } });
    expect(inputTitle.value).toBe("Title");

    const inputDescription = screen.getByTestId("questionform-input-description");
    fireEvent.change(inputDescription, { target: { value: 'Dit is een test beschrijving' } });
    expect(inputDescription.value).toBe("Dit is een test beschrijving");

    const inputTag = screen.getByTestId("questionform-input-tag");
    fireEvent.change(inputTag, { target: { value: 'Relationship' } });
    expect(inputTag.value).toBe("Relationship");

    const inputDeletetime = screen.getByTestId("questionform-input-deletetime");
    fireEvent.change(inputDeletetime, { target: { value: '12' } });
    expect(inputDeletetime.value).toBe("12");

    const inputComments = screen.getByTestId("questionform-input-comments");
    fireEvent.change(inputComments, { target: { value: 'false' } });
    expect(inputComments.value).toBe("false");



    const inputSubmit = screen.getByTestId("questionform-input-submit")
    fireEvent.click(inputSubmit);



    expect(mockFn).toHaveBeenCalledWith({
      question: { title: 'Title', description: 'Dit is een test beschrijving', tag: 'Relationship', commentsenabled: false },
      poll: [],
      expiretime: 12
    });
  })





  it('Test QuestionForm input renders + polls', () => {


    const mockFn = QuestionService.PostQuestion.mockImplementation(() => Promise.resolve({
      response: { status: 200 },
      data:
      {
        id: 11,
        title: "Title 2",
        description: "Dit is een test beschrijving",
        image: null,
        tag: "Relationship",
        commentsEnabled: true,
        deletionTime: "2020-12-03T12:58:53.6421923"
      }
    }));
   

    const { queryByTestId, getByText } = render(<MemoryRouter initialEntries={["/"]}><QuestionForm /></MemoryRouter>);


    const inputTitle = queryByTestId("questionform-input-title");
    fireEvent.change(inputTitle, { target: { value: 'Title 2' } });
    expect(inputTitle.value).toBe("Title 2");

    const inputDescription = screen.getByTestId("questionform-input-description");
    fireEvent.change(inputDescription, { target: { value: 'Dit is een test beschrijving' } });
    expect(inputDescription.value).toBe("Dit is een test beschrijving");

    const inputTag = screen.getByTestId("questionform-input-tag");
    fireEvent.change(inputTag, { target: { value: 'Relationship' } });
    expect(inputTag.value).toBe("Relationship");

    const inputDeletetime = screen.getByTestId("questionform-input-deletetime");
    fireEvent.change(inputDeletetime, { target: { value: '12' } });
    expect(inputDeletetime.value).toBe("12");

    const inputComments = screen.getByTestId("questionform-input-comments");
    fireEvent.change(inputComments, { target: { value: 'false' } });
    expect(inputComments.value).toBe("false");
    //questionform-input-poll
    const addpoll = getByText("Create new poll");

    fireEvent.click(addpoll)

    const inputPoll = screen.getByTestId("0");
    fireEvent.change(inputPoll, { target: { value: 'Yes' } });
    expect(inputPoll.value).toBe("Yes");

    fireEvent.click(addpoll)

    const inputPoll2 = screen.getByTestId("1");
    fireEvent.change(inputPoll2, { target: { value: 'No' } });
    expect(inputPoll2.value).toBe("No");


    const inputSubmit = screen.getByTestId("questionform-input-submit")
    fireEvent.click(inputSubmit);



    expect(mockFn).toHaveBeenCalledWith({
      question: { title: 'Title 2', description: 'Dit is een test beschrijving', tag: 'Relationship', commentsenabled: false },
      poll: [{ poll: "Yes" }, { poll: "No" }],
      expiretime: 12
    });
  })
});