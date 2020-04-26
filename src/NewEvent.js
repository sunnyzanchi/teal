import { h } from 'preact'
import { useRef, useState } from 'preact/hooks'
import classnames from 'classnames'

const colors = ['#ffc0c0', '#ffddc0 ', '#b0e9e9 ', '#b8f4b8 ']

const NewEvent = ({ onCancel, onSave }) => {
  const [color, setColor] = useState(null)
  const text = useRef()
  const date = useRef()

  const save = () =>
    onSave({
      color,
      date: new Date(date.current?.value),
      text: text.current?.value,
    })

  return (
    <div class="modal-overlay">
      <div class="modal">
        <h1>Add a new event</h1>

        <div class="input-group">
          <input placeholder="Description" ref={text} />
          <input placeholder="date" ref={date} type="date" />
          <div>
            <p>Color</p>
            {colors.map((c) => (
              <button
                class={classnames('color-button', { selected: c === color })}
                onClick={() => setColor(c)}
                style={{ background: c }}
              />
            ))}
          </div>
        </div>

        <div class="button-group">
          <button onClick={() => onCancel()}>Cancel</button>
          <button onClick={save}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default NewEvent
