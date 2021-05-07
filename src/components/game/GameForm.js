import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes, getGameById, modifyGame } = useContext(GameContext)
    const { gameId } = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
        if (gameId) {
            getGameById(gameId)
                .then(setCurrentGame)
        }
    }, [])

    const changeGameTitleState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.title = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGameMakerState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.maker = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGamePlayersState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.numberOfPlayers = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGameSkillLevelState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.skillLevel = parseInt(event.target.value)
        setCurrentGame(newGameState)
    }

    const changeGameTypeState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.gameTypeId = parseInt(event.target.value)
        setCurrentGame(newGameState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameTitleState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Manufacturer: </label>
                    <input type="text" name="title" required className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameMakerState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Number of Players: </label>
                    <input type="text" name="title" required className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGamePlayersState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Skill Level: </label>
                    <select type="text" name="title" required className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameSkillLevelState}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Game Type: </label>
                    <select type="text" name="title" required className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={changeGameTypeState}
                    >
                        <option value={0}>Select an option...</option>
                        {gameTypes.map(gameType => {
                            return <option key={gameType.id} value={gameType.id}>{gameType.type}</option>
                        })}
                    </select>
                </div>
            </fieldset>

            {gameId ? <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }
                    // Send POST request to your API
                    modifyGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Submit Edit</button>
                :
                <button type="submit"
                    onClick={evt => {
                        // Prevent form from being submitted
                        evt.preventDefault()
                        const game = {
                            maker: currentGame.maker,
                            title: currentGame.title,
                            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                            skillLevel: parseInt(currentGame.skillLevel),
                            gameTypeId: parseInt(currentGame.gameTypeId)
                        }
                        // Send POST request to your API
                        createGame(game)
                            .then(() => history.push("/games"))
                    }}
                    className="btn btn-primary">Create</button>}
        </form>
    )
}