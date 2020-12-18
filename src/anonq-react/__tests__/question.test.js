import { queryByTestId, render, screen, waitFor, fireEvent, getByText, toContainObject, act, getByTestId } from '@testing-library/react';
import * as axios from "axios";
import { MemoryRouter } from 'react-router-dom';
import React from "react"
import Question from "../src/components/Question"
import "regenerator-runtime/runtime.js";



import PollService from "../src/Services/PollService";

import Poll from '../src/components/Poll';
import commenapi from "../src/common-api"



jest.mock("../src/Services/PollService");
jest.mock("../src/common-api");
jest.mock("axios");



const mockQuestion = { title: 'Title', description: 'Description', tag: 'Relationship', commentsenabled: 'false' }
const mockPolls = [{ id: 27, questionId: 24, poll: 'Answer 1', votes: 0 }, { id: 28, questionId: 24, poll: 'Answer 2', votes: 2 }]
const mockPollsPercentages = [{ id: 27, questionId: 24, poll: 'Answer 1', votes: 0, percentage: "0" }, { id: 28, questionId: 24, poll: 'Answer 2', votes: 2, percentage: "100" }]


describe("Question rendering test", () => {
    it.only('Test Question component renders', () => {

        const { getByTestId } = render(<MemoryRouter initialEntries={["/"]}><Question question={mockQuestion} polls={mockPolls} /></MemoryRouter>);
        const labelTitle = getByTestId("question-label-title");
        expect(labelTitle.textContent).toBe(mockQuestion.title);
        const labelDescription = getByTestId("question-label-description");
        expect(labelDescription.textContent).toBe(mockQuestion.description);
        const labelFirstPoll = getByTestId("0");
        const labelSecondPoll = getByTestId("1");
        expect(labelFirstPoll.textContent).toBe(mockPolls[0].poll)
        expect(labelSecondPoll.textContent).toBe(mockPolls[1].poll)

    })

    it.only('Test Question component renders + % renders (When clicked)', async () => {
        const { getByTestId } = render(<MemoryRouter initialEntries={["/"]}><Question question={mockQuestion} polls={mockPolls} /></MemoryRouter>);
        act(() => {
            PollService.GetPollPercentages.mockImplementation(() => Promise.resolve({
                response: { status: 200 },
                data:
                    [
                        {
                            id: 27,
                            questionId: 24,
                            poll: 1,
                            votes: 0,
                            percentage: 0
                        },
                        {
                            id: 28,
                            questionId: 24,
                            poll: 1,
                            votes: 2,
                            percentage: 100
                        }
                    ]
            }))
        })
        act(() => {
            PollService.PutPollsVotes.mockImplementation(() => Promise.resolve({
                response: { status: 200 },
                data:
                {
                    poll: "changed"
                }
            }));
        })
    
        const labelTitle = getByTestId("question-label-title");
        expect(labelTitle.textContent).toBe(mockQuestion.title);
        const labelDescription = getByTestId("question-label-description");
        expect(labelDescription.textContent).toBe(mockQuestion.description);
        const labelFirstPoll = getByTestId("0");
        const labelSecondPoll = getByTestId("1");
        expect(labelFirstPoll.textContent).toBe(mockPolls[0].poll)
        expect(labelSecondPoll.textContent).toBe(mockPolls[1].poll)

        const voteButton = getByTestId("poll-button-vote0")

        await act(async () => {
         fireEvent.click(voteButton)
        });

       
         const labelPercentage = getByTestId("poll-label-percentage0");
         expect(labelPercentage.textContent).toBe("0%")
         const labelPercentage2 = getByTestId("poll-label-percentage1");
         expect(labelPercentage2.textContent).toBe("100%")
    })
    
    it.only('Polls percentages render when clicked', () => {
        const { getByTestId } = render(<MemoryRouter initialEntries={["/"]}><Poll polls={mockPollsPercentages[0]} toggle={true} index={0} /></MemoryRouter>);
        act(() => {
            PollService.PutPollsVotes.mockImplementation(() => Promise.resolve({
                response: { status: 200 },
                data:
                {
                    poll: "changed"
                }
            }));
        })
    
         const labelPercentage = getByTestId("poll-label-percentage0");
         expect(labelPercentage.textContent).toBe("0%")
         render(<MemoryRouter initialEntries={["/"]}><Poll polls={mockPollsPercentages[1]} toggle={true} index={1} /></MemoryRouter>);
         const labelPercentage2 = getByTestId("poll-label-percentage1");
         expect(labelPercentage2.textContent).toBe("100%")
    })
    
});