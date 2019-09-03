function sortAscending(inputObjectArray, sortProperty) {
    inputObjectArray.sort((a,b) => {
        const aUpper = a[sortProperty].toUpperCase();
        const bUpper = b[sortProperty].toUpperCase();
       
        let comparison = 0;
        if (aUpper < bUpper) {
            comparison = 1;
            } else if (aUpper > bUpper) {
            comparison = -1;
            }
            
        return comparison;
    });
}

function sortDescending(inputObjectArray, sortProperty) { 
    inputObjectArray.sort((a,b) => {
        const aUpper = a[sortProperty].toUpperCase();
        const bUpper = b[sortProperty].toUpperCase();
        
        let comparison = 0;
        if (aUpper > bUpper) {
            comparison = 1;
            } else if (aUpper < bUpper) {
            comparison = -1;
            }
        return comparison;
    });
}

module.exports = {
    sortAscending:sortAscending,
    sortDescending:sortDescending
}