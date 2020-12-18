import { getByTestId, render, screen, waitFor, fireEvent, queryByTestId } from '@testing-library/react';
import React from "react";
import { MemoryRouter } from 'react-router-dom';
import Comment from "../src/components/Comment"


const questioninput = { text:"comment" }

describe("Comment rendering test", () => {
  it.only('Test Comment component renders', () => { 


       const { queryByTestId } = render(<Comment sentcomments={questioninput} />);

        const commentLabel = queryByTestId("question-label-comment");
        expect(commentLabel.textContent).toBe("comment");
        const headLabel = queryByTestId("question-label-title");
        expect(headLabel.innerHTML).toBe("Anonymous");
  })
});