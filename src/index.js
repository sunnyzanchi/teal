import 'reset-css'
import { h, render } from 'preact'

import Timeline from './Timeline'

const events = [
  { date: new Date(2009, 9, 14), text: "Met Scott in Mr. Lanham's class" },
  {
    date: new Date(2009, 10, 10),
    text: "Went to Brian's house for the first time",
  },
  { date: new Date(2009, 11, 1), text: "Alex's birthday party" },
  { date: new Date(2009, 11, 20), text: "Alex's birthday party" },
  { date: new Date(2010, 9, 14), text: 'Another event' },
  { date: new Date(2010, 6, 14), text: 'An event with a really long name' },
  {
    date: new Date(2011, 9, 14),
    text: 'An event with a really long name and enough space for two lines',
  },
]

const App = () => {
  return (
    <div class="page">
      <div class="header">Teal</div>
      <Timeline events={events} />
    </div>
  )
}

render(<App />, document.querySelector('#app'))
