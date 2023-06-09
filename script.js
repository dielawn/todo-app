// //factory functions
function createNote(title, description, dueDate, time, priority) {
    const note = {
        title: title,
        description: description,
        dueDate: dueDate,
        time: time,
        priority: priority
    }
    return{
        note,
        setTitle(title) {
            note.title = title
        },
        setDescription(description) {
            note.description = description
        },
        setDueDate(dueDate) {
            note.dueDate = dueDate
        },
        setTime(time) {
            note.time = time
        },
        setPriority(priority) {
            note.priority = priority
        },
        setArray(array) {
            array.push (note.title, note.description, note.dueDate, note.time, note.priority)
         },
        
     }
 }

 let description = 'Teeth cleaning and x-ray'
 let firstEvent = createNote('Dentist', description, '11/24/23', '12:00', 'High' )
 let secondEvent = createNote('Hair did', 'Pubes', '11/25/23', '1:00', 'Very High' )
 
//Constructor function
function List(category, description, ) {
    this.category = category,
    this.description = description,
    this.array = []
}

const welcomeArray = ['Welcome', 'The bestest todo list app', 'firstEvent.setArray(work.array)', 'renderNotes(work.array)']
const generalTasks = new List ('General', 'tasks')
const work = new List('Work', 'Professional', )
const edu = new List('School', 'College')
const appt = new List('Appointment', 'dr, dentist, plumber, etc')


//DOM stuff
function SuperElement(type, content) {
    this.el = document.createElement(type)
    this.el.innerText = content
    document.body.append(this.el)
    this.el.addEventListener('click', () => {
        console.log(this.el)
    })
} 
const renderNotes = (array) => {
    array.map(item => {
        return new SuperElement('p', item)
    })
}

const h2 = new SuperElement('h2', 'Check the console')

const eventElements = welcomeArray.map(item => {
    return new SuperElement('h4', item)
})


