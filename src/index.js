import './fonts.css'
import 'reset-css'
import './index.css'
import { h, render } from 'preact'
import { useState } from 'preact/hooks'
import compareAsc from 'date-fns/compareAsc'

import useLocalStorage from './useLocalStorage'
import NewEvent from './NewEvent'
import Timeline from './Timeline'

const FULL_WIDTH_PLUS = '\uff0b'

// Dates are converted to ISO strings when put in localStorage
// this deserializes them back into Date objects
const deserialize = (event) => ({ ...event, date: new Date(event.date) })

const App = () => {
  const [showModal, setShowModal] = useState(false)
  const [events, setEvents] = useLocalStorage('events', [])

  const deleteEvent = (i) =>
    setEvents((e) => {
      const updated = [...e]
      updated.splice(i, 1)
      return updated
    })
  const toggleModal = () => setShowModal((a) => !a)
  const save = (newEvent) => {
    toggleModal()
    setEvents((e) =>
      e
        .map(deserialize)
        .concat(newEvent)
        .sort((a, b) => compareAsc(a.date, b.date))
    )
  }

  return (
    <div class="page">
      <div class="header">
        <h1>Teal</h1>
        <button class="add" onClick={toggleModal}>
          {FULL_WIDTH_PLUS}
        </button>
      </div>
      <Timeline events={events.map(deserialize)} onDelete={deleteEvent} />
      {showModal && <NewEvent onCancel={toggleModal} onSave={save} />}
    </div>
  )
}

render(<App />, document.querySelector('#app'))
