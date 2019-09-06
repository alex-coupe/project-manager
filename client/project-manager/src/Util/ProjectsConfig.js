const projectFilterOptions = [
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
            'True',
            'False'
        ]
    }
]

const projectTableOptions = [
    {
        displayName: 'Name',
        dataName: 'name'
    },
    {
        displayName: 'Project Description',
        dataName: 'description'
    },
    {
        displayName: 'Project Owner',
        dataName: 'owner'
    },
    {
        displayName: 'Created Date',
        dataName: 'createdDate'
    },
    {
        displayName: 'Project Completed',
        dataName: 'Completed'
    },
    {
        displayName: 'Completion Date',
        dataName: 'completionDate'
    },
   
   
   
]

module.exports = {
    projectFilterOptions:projectFilterOptions,
    projectTableOptions:projectTableOptions
}