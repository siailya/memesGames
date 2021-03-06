import TextCard from "../GameBoard/TextCard";
import {useDispatch, useSelector} from "react-redux";
import {SELECT_BEST_ANSWER} from "../../redux/types";
import {useEffect, useRef, useState} from "react";

const PlayersAnswersTextToPicture = () => {
    const showAnswers = useSelector(state => state.app.showAnswers)
    const answers = useSelector(state => state.game.answers)
    const currentUserIsLead = useSelector(state => (state.currentUser.isLead))
    const bestAnswerId = useSelector(state => state.game.bestAnswerId)
    const answersRef = useRef()
    const [answersHeight, setAnswersHeight] = useState(0)

    const dispatch = useDispatch()

    return (
        <div
            className="transition-all"
            style={{
                display: showAnswers ? "block" : "none"
            }}
            ref={answersRef}
        >
            <h2 className="text-center text-gray-500 mb-3">Отеты</h2>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {
                    answers.map((answer, index) => {
                        return (
                            <TextCard
                                canHover={currentUserIsLead && !bestAnswerId}
                                key={answer._id || answer.answerId}
                                isSelected={answer._id === bestAnswerId}
                                onClick={
                                    currentUserIsLead && !bestAnswerId ? () => {
                                        dispatch({type: SELECT_BEST_ANSWER, payload: answer._id})
                                    } : () => {
                                    }
                                }
                                text={answer.payload}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PlayersAnswersTextToPicture;
