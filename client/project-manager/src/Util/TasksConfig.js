const tasksFilterOptions = 
[
    {
        header: 'Owner',
        body: [
            '',
            'Alex Coupe',
            'Chili'
        ]
    },
    {
        header: 'Completed',
        body: [
            '',
            'true',
            'false'
        ]
    }
]

const tasksTableOptions =  [
    {
        displayName: 'Project ID',
        dataName: 'projectId'
    },
    {
        displayName: 'Name',
        dataName: 'name'
    },
    {
        displayName: 'Task Description',
        dataName: 'description'
    },
    {
        displayName: 'Assigned To',
        dataName: 'assignedTo'
    },
    {
        displayName: 'Date Assigned',
        dataName: 'dateAssigned'
    },
    {
        displayName: 'Task Completed',
        dataName: 'completed'
    },
    {
        displayName: 'Completion Date',
        dataName: 'completedDate'
    },
]

module.exports = {
    tasksFilterOptions:tasksFilterOptions,
    tasksTableOptions:tasksTableOptions
}