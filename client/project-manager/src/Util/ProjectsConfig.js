const projectFilterOptions = [
    {
        header: 'Owner',
        body: [
            '',
            'Alex Coupe',
            'Chili'
        ]
    }
]

const projectTableOptions = [
    {
        displayName: 'Created Date',
        dataName: 'createdDate'
    },
    {
        displayName: 'Completion Date',
        dataName: 'completionDate'
    },
    {
        displayName: 'Name',
        dataName: 'name'
    },
    {
        displayName: 'Project Owner',
        dataName: 'owner'
    },
    {
        displayName: 'Project Description',
        dataName: 'description'
    },
]

module.exports = {
    projectFilterOptions:projectFilterOptions,
    projectTableOptions:projectTableOptions
}