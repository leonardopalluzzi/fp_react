const formatDate = (date) =>{

    const isoDate = new Date(date)
    const formattedDate = new Intl.DateTimeFormat('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    return formattedDate.format(isoDate)
} 

export {formatDate}