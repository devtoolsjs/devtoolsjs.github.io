import css from './index.module.less'
import { useMemo, useState } from 'react'

type DateObject = {
  index: number
  year: number
  month: number
  day: number
  weekDay: number
  time: number
}

type WeekObject = {
  index: number
  days: DateObject[]
  month: number
  start?: boolean
}

export default function Calendar() {
  const [year, setYear] = useState(() => new Date().getFullYear())

  const computed = useMemo(() => {
    const tmp = new Date(year, 0, 1, 0, 0, 0, 0)
    const weekDay = (tmp.getDay() || 7) - 1
    const DAY = 1000 * 60 * 60 * 24
    const nextYear = year + 1

    let index = 0

    tmp.setTime(tmp.getTime() - weekDay * DAY)

    const dates: DateObject[] = []
    const weeks: WeekObject[] = [
      {
        month: 0,
        index: 0,
        days: []
      }
    ]

    let week: WeekObject = weeks[0]

    while (tmp.getFullYear() !== nextYear) {
      if (week.days.length === 7) {
        week = {
          month: 0,
          index: weeks.length,
          days: []
        }
        weeks.push(week)
      }

      const date: DateObject = {
        index,
        year: tmp.getFullYear(),
        month: tmp.getMonth() + 1,
        day: tmp.getDate(),
        weekDay: tmp.getDay() || 7,
        time: tmp.getTime()
      }

      if (week.month === 0) {
        week.month = date.month
      }

      if (date.day === 1) {
        week.month = date.month
        week.start = true
      }

      dates.push(date)
      week.days.push(date)
      index += 1
      tmp.setTime(tmp.getTime() + DAY)
    }

    return { dates, weeks }
  }, [year])

  const [active, setActive] = useState<Record<string, boolean>>({})

  return (
    <div className={css.calendar}>
      <div className={css.nav}>
        <div className={css.current}>{year}</div>
        <div className={css.prev} onClick={() => setYear((y) => y - 1)}>
          Previous
        </div>
        <div className={css.next} onClick={() => setYear((y) => y + 1)}>
          Next
        </div>
      </div>
      <div className={css.weekHeaders}>
        <div className={css.weekHeader}>Mon</div>
        <div className={css.weekHeader}>Tue</div>
        <div className={css.weekHeader}>Wed</div>
        <div className={css.weekHeader}>Thu</div>
        <div className={css.weekHeader}>Fri</div>
        <div className={css.weekHeader}>Sat</div>
        <div className={css.weekHeader}>Sun</div>
      </div>
      {computed.weeks.map((week) => (
        <Week
          key={week.index}
          week={week}
          active={active}
          setActive={setActive}
        />
      ))}
    </div>
  )
}

function Week({
  week,
  active,
  setActive
}: {
  week: WeekObject
  active: Record<string, boolean>
  setActive: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}) {
  return (
    <div className={css.row}>
      {week.start ? (
        <div className={css.month} data-even-month={week.month % 2 === 0}>
          {week.month}
        </div>
      ) : null}

      <div className={css.week}>
        {week.days.map((day) => (
          <div
            key={day.index}
            className={css.day}
            data-even-month={day.month % 2 === 0}
            data-active={!!active[`${day.year}.${day.index}`]}
            onClick={() => {
              setActive((prev) => {
                const key = `${day.year}.${day.index}`
                const next = { ...prev }

                next[key] = !prev[key]
                return next
              })
            }}
          >
            {day.day}
          </div>
        ))}
      </div>
    </div>
  )
}
