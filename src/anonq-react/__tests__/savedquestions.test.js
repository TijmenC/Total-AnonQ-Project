import { queryByTestId, render, screen, waitFor, fireEvent, getByText, toContainObject} from '@testing-library/react';
import axios from "axios";
import { MemoryRouter } from 'react-router-dom';
import React from "react"
import "regenerator-runtime/runtime.js";


import SavedQuestions from '../src/components/SavedQuestions';


describe("Saved Question Rendering Test", () => {
  it('Test if saved question renders in dropdown', () => { 
    Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: 'QuestionID="23',
    });
       
    const { getByTestId, getByText } = render(<MemoryRouter initialEntries={["/"]}><SavedQuestions/></MemoryRouter>);
    const dropdown = getByText("Questions");
    fireEvent.click(dropdown)
    const labelSavedQuestions = getByTestId("savedquestions-label-question");
    expect(labelSavedQuestions.textContent).toContain("Your Question");

  })
  it('Test if saved question renders in dropdown (no cookie value found)', () => { 
    Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: '',
    });
       
    const { getByTestId, getByText } = render(<MemoryRouter initialEntries={["/"]}><SavedQuestions/></MemoryRouter>);
    const dropdown = getByText("Questions");
    fireEvent.click(dropdown)
    const labelSavedQuestions = getByTestId("savedquestions-label-question");
    expect(labelSavedQuestions.textContent).toContain("No Questions found");

  })
});