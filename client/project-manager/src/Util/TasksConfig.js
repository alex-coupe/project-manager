const tasksFilterOptions = 
[
    
    {
        header: 'Type',
        body: [
            '',
            'Claim',
            'Specification'
        ]
    },
    {
        header: 'Assigned',
        body: [
            '',
            'Alex Coupe',
            'Donald Duck',
            'Peter Parker'
        ]
    },

    {
        header: 'Priority',
        body: [
            '',
            'Normal',
            'Urgent'
        ]
    },
   
]

const tasksTableOptions = [
    'Name', 'Reference', 'Type', 'Assigned', 'Priority', 'Due'
]

module.exports = {
    tasksFilterOptions:tasksFilterOptions,
    tasksTableOptions:tasksTableOptions
}