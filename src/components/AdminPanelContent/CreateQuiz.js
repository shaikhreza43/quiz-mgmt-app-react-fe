import { Button, Link, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Api } from '../../utils/Api';

export default function CreateQuiz(props) {

    const [quizObject, setQuizObject] = useState({
        quizName: '',
        quizDifficulty: '',
        totalMarks: 100,
        passedMarks: 0
    });

    const [showAddQuestionPage, setShowAddQuestionPage] = useState(false);
    const [showFormFlag, setShowFormFlag] = useState(false);

    const handleCreateQuiz = (e) => {
        e.preventDefault();
        const { passedMarks, totalMarks, quizDifficulty, quizName } = quizObject;
        if (!quizName || !quizDifficulty || !totalMarks || !passedMarks) {
            alert("Fields wi    th Star Marks are Mandatory");
            return;
        }
        else {
            Api.post("/quiz/create-quiz", quizObject)
                .then(res => {
                    console.log(res.data);
                    setQuizObject({ quizName: '', quizDifficulty: '', passedMarks: 0, totalMarks: 0 });
                    alert("Quiz Creation Successful");
                    setShowAddQuestionPage(true);
                })
                .catch(err => {
                    alert("Failed to Create Quiz. Internal Server Error");
                });
        }
    }

    const addQuizQuestionForm = (e) => {
        return (
            <>
                <form className="mt-4 form create-quiz-form">
                    <Link href="javascript:void(0)"
                        style={{ float: 'right' }}
                        onClick={() => setShowFormFlag(false)}
                    >Hide Question Form
                    </Link>
                    <div className="form-group">
                        <label className="required" htmlFor="questionText">Question Text</label>
                        <input
                            type="text"
                            placeholder="Enter Question Text..."
                            className="form-control"
                            name="questionText"
                        ></input>
                    </div>
                    <div className="form-group">
                        <label className="required" htmlFor="quizQuestionType">Question Type</label>
                        <select className="form-control">
                            <option value="">Choose Question Type</option>
                            <option value="1">Objectives</option>
                            <option value="2">ObjectivesWithMultiCorrect</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="required" htmlFor="options">Add Options</label>
                        {["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"].map((op, idx) => (
                            <div className="question-option">
                                <span>{op}</span>
                                <span>
                                    <input type="text" name="option1"></input>
                                </span>
                                <span>
                                    <input type="checkbox"></input>&nbsp;Correct
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="form-group mt-3">
                        <button type="submit" className="btn btn-primary">Add Question</button>
                    </div>
                </form>
            </>
        )
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    {!showAddQuestionPage && <Col lg={5}>
                        <form className="form create-quiz-form" onSubmit={handleCreateQuiz}>
                            <Typography align="center" variant="h6" color="steelblue">Create Quiz</Typography>
                            <div className="form-group">
                                <label htmlFor="quizName" className="required">Quiz Name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter Quiz Name..."
                                    value={quizObject.quizName}
                                    name="quizName"
                                    onChange={(e) => setQuizObject({ ...quizObject, [e.target.name]: e.target.value })}
                                ></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="totalMarks" className="required">Total Marks</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    placeholder="Enter Total Marks..."
                                    value={quizObject.totalMarks}
                                    name="totalMarks"
                                    onChange={(e) => setQuizObject({ ...quizObject, [e.target.name]: e.target.value })}
                                ></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="passedMarks" className="required">Passed Marks</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    placeholder="Enter Pass Marks..."
                                    value={quizObject.passedMarks}
                                    name="passedMarks"
                                    onChange={(e) => setQuizObject({ ...quizObject, [e.target.name]: e.target.value })}
                                ></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="quizDifficulty" className="required">Choose Quiz Difficulty Level</label>
                                <select
                                    className="form-control"
                                    name="quizDifficulty"
                                    onChange={(e) => setQuizObject({ ...quizObject, [e.target.name]: e.target.value })}
                                >
                                    <option value=''>Select Quiz Difficulty</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Create</button>
                            </div>
                        </form>
                    </Col>
                    }
                    {!showAddQuestionPage &&
                        <Col lg={1}>
                        </Col>
                    }
                    {!showAddQuestionPage && <Col lg={6} md={6} className="mt-sm-3 mt-xs-4">
                        <div className="quiz-status">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <Typography variant="h6" color="cadetblue">
                                    Total No. Of Quizzes Available: {100}
                                </Typography>
                                <Typography variant="h6" color="cadetblue">
                                    Total No. Of Quizzes Assigned: {100}
                                </Typography>
                                <Typography variant="h6" color="cadetblue">
                                    Total Candidates Attended: {100}
                                </Typography>
                            </div>
                        </div>
                    </Col>}
                </Row>
                <Row>
                    {
                        showAddQuestionPage &&
                        (<Col lg={12}>
                            <Typography variant="h6" color="steelblue">
                                Quiz Creation Successful
                            </Typography>
                            <Button type="button"
                                variant="contained"
                                color="info"
                                className="mt-3 mx-4"
                                onClick={() => setShowFormFlag(true)}
                            >
                                Add Quiz Questions
                            </Button>
                            {showFormFlag && addQuizQuestionForm()}
                        </Col>
                        )
                    }
                </Row>
            </Container>
        </div >
    )
}
