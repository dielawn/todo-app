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
        setNoteArray(array) {
            array.push (note)
         },
         removeNote(array, index) {
            array.splice(index, 1);
        },        
     }
 }

 let description = 'Teeth cleaning and x-ray'

 function createList(name, info) {
    const list = {
        name: name,
        info: info,
        listArray: [],
    }
    return {
        list,
        setCategory(name) {
            list.name = name
        },
        setInfo(info) {
            list.info = info
        },
        setListArray(listArray) {
            listArray.push (list)
        }, 
        removeList(listArray, index) {
            listArray.splice(index, 1)
        }
    }
 } 

 const defaultList = createList('General', 'Uncatogorized list')
 const defaultNotes = [
    createNote('Dentist', description, '11/24/23', '12:00', 'High' ), 
    createNote('Hair did', 'Pubes', '11/25/23', '1:00', 'Very High' )
]


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
function SuperElement(type, content, className, id) {
    this.el = document.createElement(type)
    this.el.innerText = content
    this.el.classList.add(className)
    this.el.id = id
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

const h2 = new SuperElement('h2', 'Check the console', 'header', 'header')

const eventElements = welcomeArray.map(item => {
    return new SuperElement('h4', item, 'defaultMsg', 'defaultMsg')
})


