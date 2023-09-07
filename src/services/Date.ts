export const StringToDate = (dateString: string, sum = false) => {
    if (!dateString) {
        return null;
    }

    let day, modifiedDate, integralDate, date: any;

    integralDate = dateString.split(' ')
    date = integralDate[0]
    modifiedDate = date.split('/')

    if (modifiedDate.length < 3) {
        modifiedDate = date.split('-')
    }

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

export const DateToString = (date: Date, hour = false, pt = false) => {
    if (!date) {
        return null;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    let formatDate = `${year}-${month}-${day}`

    if (pt) {
        formatDate = `${day}-${month}-${year}`
    }

    if (hour) {
        const hour = String(date.getHours()).padStart(2, '0')
        const minute = String(date.getMinutes()).padStart(2, '0')
        const second = String(date.getSeconds()).padStart(2, '0')

        formatDate += ` ${hour}:${minute}:${second}`
    }

    return formatDate
}

export const FormatDate = (dateString: string | null) => {

    let day, modifiedDate, integralDate, date: any;

    if (dateString) {
        integralDate = dateString.split(' ')
        date = integralDate[0]
        modifiedDate = date.split('-')

        if (modifiedDate.length < 3) {
            modifiedDate = date.split('-')
        }

        if (modifiedDate[0].length === 4) {
            day = parseInt(modifiedDate[2])
            if (day < 10) {
                day = '0' + day
            }
            modifiedDate = `${day}/${modifiedDate[1]}/${modifiedDate[0]}`
        } else {
            day = parseInt(modifiedDate[0])
            if (day < 10) {
                day = '0' + day
            }
            modifiedDate = `${day}/${modifiedDate[1]}/${modifiedDate[2]}`
        }
        if (integralDate.length === 2) {
            modifiedDate = modifiedDate + ' ' + integralDate[1]
        }
    }

    return modifiedDate

}