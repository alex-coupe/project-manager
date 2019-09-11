const issuesFilterOptions = 
[
    {
        header: 'Severity',
        body: [
            '',
            'Low',
            'Medium',
            'High'
        ]
    },
    {
        header: 'Resolved',
        body: [
            '',
            'true',
            'false'
        ]
    }
]

const issuesTableOptions =  [
    {
        displayName: 'Project ID',
        dataName: 'projectId'
    },
    {
        displayName: 'Name',
        dataName: 'name'
    },
    {
        displayName: 'Logged By',
        dataName: 'loggedBy'
    },
    {
        displayName: 'Description',
        dataName: 'description'
    },
    {
        displayName: 'Serverity',
        dataName: 'severity'
    },
    {
        displayName: 'Resolved',
        dataName: 'resolved'
    },
    {
        displayName: 'Resolved By',
        dataName: 'resolvedBy'
    },
]

module.exports = {
    issuesFilterOptions:issuesFilterOptions,
    issuesTableOptions:issuesTableOptions
}