import { h } from 'preact'
import format from 'date-fns/fp/format'
import max from 'date-fns/max'
import min from 'date-fns/min'

import { getDateDisplay, getPercent } from './utils'

// `.timeline`'s top padding
const TOP_OFFSET = 44

const month = format('MMMM')
const year = format('yyyy')

// TODO: Declump events that are too close
const Timeline = ({ events }) => {
  const earliest = min(events.map((e) => e.date))
  const latest = max(events.map((e) => e.date))

  // Height as vh multiplier
  // if height is 2 here, the timeline will be 200vh
  const height = events.length < 4 ? 0.8 : Math.sqrt(events.length / 2)
  const heightInPixels = document.documentElement.clientHeight * height

  events = events.map((e) => ({
    ...e,
    top:
      getPercent(Number(earliest), Number(latest), Number(e.date)) *
      heightInPixels,
  }))

  return (
    <div class="timeline">
      <div class="middle-line" style={{ height: `${height * 100}vh` }} />

      {events.map((e) => {
        const showType = getDateDisplay(
          events.map((e) => e.date),
          e.date
        )

        const dateDisplay = {
          [getDateDisplay.MONTH]: <div class="month">{month(e.date)}</div>,
          [getDateDisplay.NONE]: null,
          [getDateDisplay.YEAR]: <div class="year">{year(e.date)}</div>,
        }[showType]

        return (
          <div class="tl-event" style={{ top: `${e.top + TOP_OFFSET}px` }}>
            <div class="bubble-container">
              <div class="bubble">{e.text}</div>
            </div>

            <div class="tl-line" />
            <div class="tl-dot" />

            {dateDisplay}
          </div>
        )
      })}
    </div>
  )
}

export default Timeline
