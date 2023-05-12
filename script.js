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
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0
}





renderRecords()
// function addRecord() {
//     const record = {
//         day: '',
//         incidentCount: 0,
//     }

//     record.day = dayInputElement.value;
//     record.incidentCount = parseInt(countInputElement.value);

//     if (!record.day && !record.incidentCount) {
//         alert('Cannot add empty record')
//     } else if (!record.day) {
//         alert('Day is required')
//     } else if (!record.incidentCount) {
//         alert('incident count is required')
//     } else if (record.incidentCount < 0) {
//         alert('incident count must be >= 0')
//     } else {
//         records.push(record)
//     }

//     dayInputElement.value = ''
//     countInputElement.value = ''
//     renderRecords()
//     console.log(records)

//     //Weekly Records Storage
//     if (record.day === 'Monday') {
//         weeklyrecords.monday = record.incidentCount;
//     } else if (record.day === 'Tuesday') {
//         weeklyrecords.tuesday = record.incidentCount;
//     } else if (record.day === 'Wednesday') {
//         weeklyrecords.wednesday = record.incidentCount;
//     } else if (record.day === 'Thursday') {
//         weeklyrecords.thursday = record.incidentCount;
//     } else if (record.day === 'Friday') {
//         weeklyrecords.friday = record.incidentCount;
//     } else if (record.day === 'Saturday') {
//         weeklyrecords.saturday = record.incidentCount;
//     } else if (record.day === 'Sunday') {
//         weeklyrecords.sunday = record.incidentCount;
//     }

//     console.log(weeklyrecords)


//     let sum = 0;
//     for (let prop in weeklyrecords) {
//         if (weeklyrecords.hasOwnProperty(prop)) {
//             sum += weeklyrecords[prop];
//         }
//     }

//     console.log("Total Incidents", sum)

//     let recordsCount = 0;
//     for (const key in weeklyrecords) {
//         if (weeklyrecords[key] !== 0) {
//             recordsCount++;
//         }
//     }

//     console.log("Number of days", recordsCount);

//     weeklyAverge = sum / recordsCount;
//     weeklyAvergeElement.innerHTML = `Weekly Average: ${weeklyAverge.toFixed(1)}`

//     localStorage.setItem('weeklyrecords', JSON.stringify(weeklyrecords))
//     localStorage.setItem('records', JSON.stringify(records))

// }

function addRecord() {
    const record = {
        day: '',
        incidentCount: 0,
    }

    record.day = dayInputElement.value;
    record.incidentCount = parseInt(countInputElement.value);
    if (!record.day && !record.incidentCount) {
        alert('Cannot add empty record')
    } else if (!record.day) {
        alert('Day is required')
    } else if (!record.incidentCount) {
        alert('incident count is required')
    } else if (record.incidentCount < 0) {
        alert('incident count must be >= 0')
    } else {
        // Check if record with same day already exists
        const existingRecordIndex = records.findIndex(r => r.day === record.day);
        if (existingRecordIndex >= 0) {
            records[existingRecordIndex] = record; // Update existing record
        } else {
            records.push(record); // Add new record
        }
    }

    dayInputElement.value = '';
    countInputElement.value = '';
    renderRecords();
    console.log(records);

    // Update weekly records with new or updated record's incident count
    const day = record.day.toLowerCase();
    weeklyrecords[day] = record.incidentCount;
    localStorage.setItem('weeklyrecords', JSON.stringify(weeklyrecords));

    let sum = 0;
    let recordsCount = 0;
    for (const key in weeklyrecords) {
        if (weeklyrecords.hasOwnProperty(key)) {
            sum += weeklyrecords[key];
            if (weeklyrecords[key] !== 0) {
                recordsCount++;
            }
        }
    }

    console.log('Total Incidents', sum);
    console.log('Number of days', recordsCount);

    weeklyAverge = sum / recordsCount;
    weeklyAvergeElement.innerHTML = `Weekly Average: ${weeklyAverge.toFixed(1)}`;

    localStorage.setItem('records', JSON.stringify(records));
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

    const deleteButtons = document.querySelectorAll('.js-deleteRecord');
    for (let index = 0; index < deleteButtons.length; index++) {
        const deleteButton = deleteButtons[index];
        deleteButton.addEventListener('click', () => {
            const deletedRecord = records.splice(index, 1)[0];

            renderRecords();
            localStorage.setItem('records', JSON.stringify(records));

            // Update weekly records with deleted record's incident count
            const day = deletedRecord.day.toLowerCase();
            weeklyrecords[day] = 0;
            localStorage.setItem('weeklyrecords', JSON.stringify(weeklyrecords));

        });
    }

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
    const day = record.day.toLowerCase()
    const incidentCount = record.incidentCount;



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

        const newDay = dayInput.value.toLowerCase();
        const newIncidentCount = parseInt(countInput.value);

        if (newDay && newIncidentCount) {
            // Update the record object
            record.day = newDay;
            record.incidentCount = newIncidentCount;

            // Update the weeklyrecords object
            weeklyrecords[day] -= incidentCount;
            weeklyrecords[newDay] += newIncidentCount;

            // Render the updated records
            renderRecords();

            // Save the updated records to local storage
            localStorage.setItem('records', JSON.stringify(records));
            localStorage.setItem('weeklyrecords', JSON.stringify(weeklyrecords));
            console.log('Records updated:', weeklyrecords);
        }
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


const today = new Date().getDay();
// Define an array of color themes, with one for each day of the week
const colorThemes = [
    {
        primary: '#0f1c25',
        secondary: '#3c7692',
        accent: '#b7e0f1'
    },
    {
        primary: '#2c0f0f',
        secondary: '#862323',
        accent: '#d1d1d1'
    },
    {
        primary: '#0f250c',
        secondary: '#5c8e51',
        accent: '#d6f8d8'
    },
    {
        primary: '#270f2b',
        secondary: '#8c4d8f',
        accent: '#f1d8f8'
    },
    {
        primary: '#492e07',
        secondary: '#d08c2a',
        accent: '#fff5d7'
    },
    {
        primary: '#013131',
        secondary: '#189d9d',
        accent: '#c4eeee'
    },
    {
        primary: '#222222',
        secondary: '#666',
        accent: '#e6e6e6'
    }
];

// Set the color theme based on the current day of the week
document.documentElement.style.setProperty('--primary-color', colorThemes[today].primary);
document.documentElement.style.setProperty('--secondary-color', colorThemes[today].secondary);
document.documentElement.style.setProperty('--accent-color', colorThemes[today].accent);
console.log(today)