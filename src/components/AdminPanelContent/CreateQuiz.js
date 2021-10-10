import { Typography } from '@mui/material';
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

    const handleCreateQuiz = (e) => {
        e.preventDefault();
        const { passedMarks, totalMarks, quizDifficulty, quizName } = quizObject;
        if (!quizName || !quizDifficulty || !totalMarks || !passedMarks) {
            alert("Fields with Star Marks are Mandatory");
            return;
        }
        else {
            Api.post("/quiz/create-quiz", quizObject)
                .then(res => {
                    console.log(res.data);
                    setQuizObject({ quizName: '', quizDifficulty: '', passedMarks: 0, totalMarks: 0 });
                    alert("Quiz Creation Successful");
                })
                .catch(err => {
                    alert("Failed to Create Quiz. Internal Server Error");
                });
        }
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col lg={5}>
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
                    <Col lg={1}>
                    </Col>
                    <Col lg={6}>
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
                    </Col>
                </Row>
            </Container>
        </div >
    )
}
