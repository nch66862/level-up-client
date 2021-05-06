import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { EventContext } from "./EventProvider.js"

export const EventList = (props) => {
    const { events, getEvents, joinEvent } = useContext(EventContext)
    const history = useHistory()
    useEffect(() => {
        getEvents()
    }, [])

    return (
        <article className="events">
            <header className="events__header">
                <h1>Level Up Game Events</h1>
            </header>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Create New Event</button>

            {
                events.map(event => {
                    // const attending = profile.events.some(evt => evt.id === event.id)
                    return <section key={event.id} className="registration">
                        <div className="registration__game">{event.game.title}</div>
                        <div>{event.name}</div>
                        <div>{
                                new Date(event.event_time).toLocaleDateString("en-US",
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    timeZone: "UTC"
                                })
                            } @ {
                                new Date(event.event_time).toLocaleTimeString("en-US", {timeZone: "UTC"})
                        }</div>
                        <button className="btn btn-2"
                                onClick={() => joinEvent(event.id)}
                        >Join</button>
                    </section>
                })
            }
        </article >
    )
}