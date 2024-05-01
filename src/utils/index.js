const getDate =(inputDate)=> {
    const date = new Date(inputDate);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const getFirstLetter = (str) =>{
     // Get the first character of the string and convert it to uppercase
     const firstLetter = str?.charAt(0).toUpperCase();
     return firstLetter;
}


export {getDate, getFirstLetter}
