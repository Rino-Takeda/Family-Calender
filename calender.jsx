import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

const CalendarApp = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]); // [{ date: 'YYYY-MM-DD', title: 'Event' }]
    const [selectedDate, setSelectedDate] = useState(null);
    const [newEvent, setNewEvent] = useState('');

    useEffect(() => {
        // Initialize events or fetch from backend (dummy for now)
        setEvents([
            { date: '2025-02-05', title: 'Family Dinner' },
        ]);
    }, []);

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate),
    });

    const handleEventSubmit = () => {
        if (newEvent.trim() && selectedDate) {
            setEvents([...events, { date: selectedDate, title: newEvent }]);
            setNewEvent('');
            setSelectedDate(null);
        }
    };

    const handleDeleteEvent = (date) => {
        setEvents(events.filter((event) => event.date !== date));
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Family Calendar</h1>

            {/* Calendar */}
            <div className="grid grid-cols-7 gap-2">
                {daysInMonth.map((day) => {
                    const formattedDate = format(day, 'yyyy-MM-dd');
                    const dayEvents = events.filter((event) => isSameDay(new Date(event.date), day));
                    return (
                        <Card key={formattedDate} className="p-2 bg-white border">
                        <CardContent>
                            <p className="text-sm font-semibold">{format(day, 'd MMM')}</p>
                            {dayEvents.map((event, index) => (
                                <div key={index} className="mt-1">
                                    <p className="text-xs text-blue-600">{event.title}</p>
                                    <Button size="xs" onClick={() => handleDeleteEvent(event.date)} className="mt-1">
                                        Delete
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Event Input */}
            <div className="mt-4">
                <label className="block text-sm font-medium">Select Date:</label>
                <input
                    type="date"
                    value={selectedDate || ''}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border mt-1 p-1 w-full"
                />

                <label className="block text-sm font-medium mt-2">Event Title:</label>
                <input
                    type="text"
                    value={newEvent}
                    onChange={(e) => setNewEvent(e.target.value)}
                    className="border mt-1 p-1 w-full"
                />

                <Button className="mt-2 w-full" onClick={handleEventSubmit}>Add Event</Button>
            </div>
        </div>
    );
};

export default CalendarApp;
