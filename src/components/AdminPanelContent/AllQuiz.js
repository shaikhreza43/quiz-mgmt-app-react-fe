import React, { useEffect, useState } from 'react';
import { Api } from '../../utils/Api';

export default function AllQuiz(props) {

    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetchAllQuiz();
    }, []);

    const fetchAllQuiz = async () => {
        await Api.get("/quiz/list-all-quiz")
            .then(res => {
                setQuizzes(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            Hello from All Quiz
        </div>
    )
}
