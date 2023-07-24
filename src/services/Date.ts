export const StringToDate = (dateString: string | undefined, sum = false) => {
    if (!dateString) {
        return null;
    }

    let day, modifiedDate, integralDate: any;

    integralDate = dateString.split(' ')
    modifiedDate = integralDate[0];
    modifiedDate = modifiedDate.split('/');

    // Verificando se a primeira parte da data é o ano
    if (modifiedDate[0].length === 4) {
        day = parseInt(modifiedDate[2])
        if (day < 10) {
            day = '0' + day
        }
        modifiedDate = `${modifiedDate[0]}-${modifiedDate[1]}-${day}`
    } else {
        day = parseInt(modifiedDate[0])
        if (day < 10) {
            day = '0' + day
        }
        modifiedDate = `${modifiedDate[2]}-${modifiedDate[1]}-${day}`
    }
    if (integralDate.length === 2) {
        modifiedDate = modifiedDate + ' ' + integralDate[1]
    }

    let finalDate: any = new Date(modifiedDate)
    if (sum) {
        finalDate = finalDate.setDate(finalDate.getDate() + 1);
    }

    return new Date(finalDate)
}

export const DateToString = (date: Date | undefined, hour = false, pt = false) => {
    if (!date) {
        return null;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    let formatDate = `${year}-${month}-${day}`;

    if (pt) {
        formatDate = `${day}-${month}-${year}`;
    }

    if (hour) {
        const hour = String(date.getHours()).padStart(2, '0');
        const minuto = String(date.getMinutes()).padStart(2, '0');
        const segundo = String(date.getSeconds()).padStart(2, '0');

        formatDate += ` ${hour}:${minuto}:${segundo}`
    }

    return formatDate
}