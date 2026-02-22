import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X, CheckCircle2 } from 'lucide-react'
import axios from 'axios'

const BACKEND_URL = 'http://localhost:8000'

export default function Calendar({ userId, isOpen, onClose }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedDay, setSelectedDay] = useState(null)

  useEffect(() => {
    if (isOpen && userId) {
      fetchCalendarEvents()
    }
  }, [isOpen, userId, currentDate])

  const fetchCalendarEvents = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/roadmap/calendar/${userId}?month=${currentDate.getMonth() + 1}&year=${currentDate.getFullYear()}`
      )
      setEvents(response.data.events)
    } catch (error) {
      console.error('Error fetching calendar events:', error)
    } finally {
      setLoading(false)
    }
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek }
  }

  const getEventsForDay = (day) => {
    return events.filter(event => {
      if (event.type === 'task') {
        return event.day === day
      }
      return false
    })
  }

  const hasProjectOnDay = (day) => {
    return events.some(event => {
      if (event.type === 'project' && event.day_range) {
        const range = event.day_range.toLowerCase()
        const dayNum = parseInt(range.match(/\d+/)?.[0])
        return dayNum === day
      }
      return false
    })
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate)
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2d3139]">
          <div>
            <h2 className="text-2xl font-bold text-white">Learning Calendar</h2>
            <p className="text-slate-400 text-sm">Track your multi-techstack learning journey</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between p-6 border-b border-[#2d3139]">
          <button
            onClick={previousMonth}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h3 className="text-xl font-bold text-white">{monthName}</h3>
          <button
            onClick={nextMonth}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#195de6]"></div>
            </div>
          ) : (
            <>
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-bold text-slate-400 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const dayEvents = getEventsForDay(day)
                  const hasProject = hasProjectOnDay(day)
                  const isToday = new Date().getDate() === day && 
                                  new Date().getMonth() === currentDate.getMonth() &&
                                  new Date().getFullYear() === currentDate.getFullYear()

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                      className={`aspect-square p-2 rounded-lg border transition-all ${
                        isToday
                          ? 'border-[#195de6] bg-[#195de6]/10'
                          : 'border-[#2d3139] bg-[#0f1115] hover:border-[#195de6]/40'
                      } ${hasProject ? 'ring-2 ring-yellow-500/50' : ''}`}
                    >
                      <div className="text-sm font-bold text-white mb-1">{day}</div>
                      
                      {/* Event indicators - Multi-techstack blocks */}
                      {dayEvents.length > 0 && (
                        <div className="space-y-1">
                          {dayEvents.slice(0, 3).map((event, idx) => (
                            <div
                              key={idx}
                              className={`h-1 rounded-full ${
                                event.completed
                                  ? 'bg-emerald-500'
                                  : 'bg-[#195de6]'
                              }`}
                              title={`${event.tech_stack}: ${event.title}`}
                            />
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-[10px] text-slate-400">+{dayEvents.length - 3}</div>
                          )}
                        </div>
                      )}

                      {hasProject && (
                        <div className="mt-1 text-[10px] text-yellow-500 font-bold">
                          🚀 Project
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Selected Day Details */}
              {selectedDay && (
                <div className="mt-6 p-4 bg-[#0f1115] border border-[#2d3139] rounded-lg">
                  <h4 className="text-lg font-bold text-white mb-3">
                    Day {selectedDay} - {monthName}
                  </h4>
                  
                  {getEventsForDay(selectedDay).length > 0 ? (
                    <div className="space-y-2">
                      {getEventsForDay(selectedDay).map((event, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 bg-[#1c1f26] rounded-lg"
                        >
                          {event.completed ? (
                            <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={20} />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-[#195de6] flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 bg-[#195de6]/20 text-[#195de6] text-xs rounded">
                                {event.tech_stack}
                              </span>
                              <span className="text-xs text-slate-500">
                                {event.estimated_hours}h
                              </span>
                            </div>
                            <p className="text-sm text-white font-medium">{event.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 text-sm">No tasks scheduled for this day</p>
                  )}

                  {hasProjectOnDay(selectedDay) && (
                    <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-yellow-500 font-medium text-sm">
                        🚀 Project milestone on this day
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Legend */}
              <div className="mt-6 p-4 bg-[#0f1115] border border-[#2d3139] rounded-lg">
                <p className="text-sm font-bold text-white mb-2">Legend:</p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#195de6]" />
                    <span>Pending Task</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span>Completed Task</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full ring-2 ring-yellow-500" />
                    <span>Project Day</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2 border-[#195de6]" />
                    <span>Today</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
