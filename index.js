// Your code here

function createEmployeeRecord(employee) {
    let timeIn = []
    let timeOut = []
    let employeeRecord = {
        'firstName': employee[0],
        'familyName': employee[1],
        'title': employee[2],
        'payPerHour': employee[3],
        'timeInEvents': timeIn,
        'timeOutEvents': timeOut
    }
    return employeeRecord
}

function createEmployeeRecords(arrays) {
    let newArray = []
    for (const a of arrays) {
        let newRecord = createEmployeeRecord(a)
        newArray.push(newRecord)
    }
    return newArray
}

function createTimeInEvent(empRecord, dateStamp) {
    let [date,hour] = dateStamp.split(' ')
    empRecord.timeInEvents.push({
        'type': 'TimeIn',
        'hour': parseInt(hour,10),
        'date': date
    })
    return empRecord
}

function createTimeOutEvent(empRecord, dateStamp) {
    let [date,hour] = dateStamp.split(' ')
    empRecord.timeOutEvents.push({
        'type': 'TimeOut',
        'hour': parseInt(hour,10),
        'date': date
    })
    return empRecord
}

function hoursWorkedOnDate(empRecord, date) {
    let timeInKeys = empRecord.timeInEvents.find((e) => {
        return e.date === date
    })
    let timeOutKeys = empRecord.timeOutEvents.find((e) => {
        return e.date === date
    })
    return (timeOutKeys.hour - timeInKeys.hour) / 100
}

function wagesEarnedOnDate(empRecord, date) {
    let hoursWorked = hoursWorkedOnDate(empRecord, date) * empRecord.payPerHour
    return parseFloat(hoursWorked.toString())
    
}

function allWagesFor(empRecord) {
    console.log(empRecord)
    let workedDays = empRecord.timeInEvents.map((e) => {
        return e.date})
    console.log(workedDays)
    let wageForDay = workedDays.reduce((previousValue, currentValue) => {
        return previousValue + wagesEarnedOnDate(empRecord, currentValue)
    }, 0)
    return wageForDay
}

function calculatePayroll(empRecordsArray) {
    return empRecordsArray.reduce((previousValue, currentValue) => {
        return previousValue + allWagesFor(currentValue)
    }, 0)
}