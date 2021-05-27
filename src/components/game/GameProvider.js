import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])
    const [ gameTypes, setTypes ] = useState([])

    const getGames = () => {
        return fetch("https://nac-level-up-api.herokuapp.com/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const getGameById = (gameId) => {
        return fetch(`https://nac-level-up-api.herokuapp.com/games/${gameId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
    }

    const createGame = (game) => {
        return fetch("https://nac-level-up-api.herokuapp.com/games", {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
            .then(getGames)
    }

    const modifyGame = (game) => {
        return fetch(`https://nac-level-up-api.herokuapp.com/games/${game.id}`, {
            method: "PUT",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
            .then(getGames)
    }

    const getGameTypes = () => {
        return fetch("https://nac-level-up-api.herokuapp.com/gametypes", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setTypes)
    }

    return (
        <GameContext.Provider value={{ games, getGames, createGame, getGameTypes, gameTypes, getGameById, modifyGame }} >
            { props.children }
        </GameContext.Provider>
    )
}