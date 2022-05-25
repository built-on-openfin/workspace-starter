// Create a notification with two buttons
notifications.create({
    title: 'Reminder',
    body: 'Event "Weekly Meeting" is starting soon...',
    category: 'Upcoming Events',

    // Use the 'customData' field to store metadata about the event
    customData: {
        eventId: '12345'
    },

    // register an 'onSelect' event to capture the user click event
    onSelect: {
        task: 'view-calendar-event',
        target: 'popup'
    },

    buttons: [
        // Button schedules another reminder for 5 minutes later 
        {
            title: 'Snooze for 5 minutes',
            iconUrl: 'https://www.example.com/timer.png',
            onClick: {
                task: 'schedule-reminder',
                intervalMs: 5 * 60 * 1000
            }
        },

        // Button closes notification and doesn't reprompt the user
        {
            title: 'Dismiss',
            iconUrl: 'https://www.example.com/cancel.png'
        }
    ]
});
