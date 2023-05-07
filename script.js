let totalIncidents = JSON.parse(localStorage.getItem('incidents')) || { incidents: 0 }
let totalIncElement = document.querySelector('.incident-Element')


renderHTML();
//incrementor Hander
document.querySelector('.js-increment').addEventListener('click', () => {
    incrementIncident()
    renderHTML();
})
document.addEventListener('keydown', (event) => {
    if (event.key === '+') {
        incrementIncident();
        renderHTML();
    }
});
function incrementIncident() {
    totalIncidents.incidents += 1;
    localStorage.setItem('incidents', JSON.stringify(totalIncidents))
}

//Decrementor Hander
document.querySelector('.js-decrement').addEventListener('click', () => {
    decrementIncident()
    renderHTML()
})
document.addEventListener('keydown', (event) => {
    if (event.key === '-') {
        decrementIncident();
        renderHTML();
    }
});
function decrementIncident() {
    if (totalIncidents.incidents === 0) {
        return
    }
    totalIncidents.incidents -= 1;
    localStorage.setItem('incidents', JSON.stringify(totalIncidents))
}

//Reset Hander
document.querySelector('.js-reset').addEventListener('click', () => {
    localStorage.removeItem('incidents')
    totalIncidents.incidents = 0
    renderHTML()
})


//HTML Renderer
function renderHTML() { totalIncElement.innerHTML = `Total Incidents: ${totalIncidents.incidents}` }

//Records 

const dayInputElement = document.querySelector('.js-day-input')
const countInputElement = document.querySelector('.js-count-input')
const addRecordButton = document.querySelector('.js-add-record-btn')
const recordsElement = document.querySelector('.js-records-grid')
const deleteRecordButton = document.querySelector('.js-add-record-btn')
const weeklyAvergeElement = document.querySelector('.weekly-avg')

addRecordButton.addEventListener('click', () => {
    addRecord();
})

countInputElement.addEventListener('keydown', (event) => {
    keypressed = event.key
    if (keypressed === 'Enter') {
        addRecord();
    }
})

const records = JSON.parse(localStorage.getItem('records')) || []
console.log(records)
const weeklyrecords = JSON.parse(localStorage.getItem('weeklyrecords')) || {
    saturday: 0,
    sunday: 0,
    monday: 0
}

renderRecords()
function addRecord() {
    const record = {
        day: '',
        incidentCount: 0,
    }
    record.day = dayInputElement.value;
    record.incidentCount = countInputElement.value;
    if (!record.day && !record.incidentCount) {
        alert('Cannot add empty record')
    } else if (!record.day) {
        alert('Day is required')
    } else if (!record.incidentCount) {
        alert('incident count is required')
    } else if (record.incidentCount < 0) {
        alert('incident count must be >= 0')
    } else {
        records.push(record)
    }
    dayInputElement.value = ''
    countInputElement.value = ''
    renderRecords()
    console.log(records)

    //Weekly Records Storage
    if (record.day === 'Saturday') {
        weeklyrecords.saturday = record.incidentCount;
    } else if (record.day === 'Sunday') {
        weeklyrecords.sunday = record.incidentCount;
    } else if (record.day === 'Monday') {
        weeklyrecords.monday = record.incidentCount;
    }
    console.log(weeklyrecords)
    let weeklyAverge = (parseInt(weeklyrecords.saturday) + parseInt(weeklyrecords.sunday) + parseInt(weeklyrecords.monday)) / 3
    console.log(weeklyAverge.toFixed(1))
    weeklyAvergeElement.innerHTML = `Weekly Average: ${weeklyAverge.toFixed(1)}`

    localStorage.setItem('weeklyrecords', JSON.stringify(weeklyrecords))
    localStorage.setItem('records', JSON.stringify(records))
}

function renderRecords() {
    let recordsGridHTML = []
    for (let index = 0; index < records.length; index++) {
        const record = records[index];

        const html = `
            <p>${record.day}</p>
            <p>${record.incidentCount}</p>
            <button class="button js-editRecord" data-index="${index}">Edit</button>
            <button class="button js-deleteRecord">Delete</button>
        `
        recordsGridHTML += html
    }
    recordsElement.innerHTML = recordsGridHTML;

    document.querySelectorAll('.js-deleteRecord')
        .forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                records.splice(index, 1);
                renderRecords()
                localStorage.setItem('records', JSON.stringify(records))

            })
        });

    document.querySelectorAll('.js-editRecord')
        .forEach((editButton) => {
            editButton.addEventListener('click', () => {
                const index = editButton.dataset.index;
                // open a dialog box or a form to edit the record
                editRecord(index)
            })
        });

    // update local storage after records are rendered
    localStorage.setItem('records', JSON.stringify(records))
}


function editRecord(index) {
    // create a dialog box or form
    const dialogBox = document.createElement('div')
    dialogBox.classList.add('dialog-box')

    const record = records[index]

    // create input fields for day and incident count
    const dayInput = document.createElement('input')
    dayInput.type = 'text'
    dayInput.value = record.day

    const countInput = document.createElement('input')
    countInput.type = 'number'
    countInput.value = record.incidentCount

    // create a submit button
    const submitButton = document.createElement('button')
    submitButton.textContent = 'Save'
    submitButton.addEventListener('click', () => {
        // update the record with the new values
        record.day = dayInput.value
        record.incidentCount = countInput.value

        // save the updated records to localStorage
        localStorage.setItem('records', JSON.stringify(records))

        // re-render the records
        renderRecords()

        // close the dialog box or form
        dialogBox.remove()
    })

    // create a cancel button
    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'Cancel'
    cancelButton.addEventListener('click', () => {
        // close the dialog box or form
        dialogBox.remove()
    })

    // add the input fields and buttons to the dialog box or form
    dialogBox.appendChild(dayInput)
    dialogBox.appendChild(countInput)
    dialogBox.appendChild(submitButton)
    dialogBox.appendChild(cancelButton)

    // add the dialog box or form to the page
    document.querySelector('.records-container').appendChild(dialogBox)
}
