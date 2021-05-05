import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "../game/GameProvider.js"
import { EventContext } from "./EventProvider.js"


export const EventForm = () => {
    const history = useHistory()
    const { getGames, games } = useContext(GameContext)
    const { createEvent } = useContext(EventContext)

    const [currentEvent, setEvent] = useState({
        gameId: 0,
        eventTime: "",
        location: "",
        name: "",
        hostId: 0
    })

    useEffect(() => {
        getGames()
    }, [])

    const changeEventState = (domEvent) => {
        let newEvent = {...currentEvent}
        if (domEvent.target.name.includes("Id")) {
            newEvent[domEvent.target.name] = parseInt(domEvent.target.value)
        }
        else {
            newEvent[domEvent.target.name] = domEvent.target.value
        }
        setEvent(newEvent)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Event Title: </label>
                    <select name="name" className="form-control"
                        value={ currentEvent.name }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option></option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Time: </label>
                    <select name="eventTime" className="form-control"
                        value={ currentEvent.eventTime }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option></option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Location: </label>
                    <select name="location" className="form-control"
                        value={ currentEvent.location }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option></option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option></option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            {/* Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    createEvent(currentEvent)
                    .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}