// //factory functions
function createToDo(title, description, dueDate, time, priority) {
    const toDo = {
        title: title,
        description: description,
        dueDate: dueDate,
        time: time,
        priority: priority
    }
    return{
        toDo,
        setTitle(title) {
            toDo.title = title
        },
        setDescription(description) {
            toDo.description = description
        },
        setDueDate(dueDate) {
            toDo.dueDate = dueDate
        },
        setTime(time) {
            toDo.time = time
        },
        setPriority(priority) {
            toDo.priority = priority
        },
        setArray(array) {
            array.push (toDo.title, toDo.description, toDo.dueDate, toDo.time, toDo.priority)
         },
        editTodo(objectArg) {
            toDo.addEventListener('click', () => {
                console.log(this)
            })
        } 
     }
 }

 let description = 'Teeth cleaning and x-ray'
 let firstEvent = createToDo('Dentist', description, '11/24/23', '12:00', 'High' )
 let secondEvent = createToDo('Hair did', 'Pubes', '11/25/23', '1:00', 'Very High' )
 
//Constructor function
function Category(category, description, ) {
    this.category = category,
    this.description = description,
    this.array = []
}

const welcomeArray = ['Welcome', 'The bestest todo list app', 'Select a category then add a new todo', 'General tasks is the default category']
const generalTasks = new Category ('General', 'tasks')
const work = new Category('Work', 'Professional', )
const edu = new Category('School', 'College')
const appt = new Category('Appointment', 'dr, dentist, plumber, etc')


//DOM stuff
function SuperElement(type, content) {
    this.el = document.createElement(type)
    this.el.innerText = content
    document.body.append(this.el)
    this.el.addEventListener('click', () => {
        console.log(this.el)
    })
} 
const renderToDos = (array) => {
    array.map(item => {
        return new SuperElement('p', item)
    })
}

const h2 = new SuperElement('h2', 'Check the console')

const eventElements = welcomeArray.map(item => {
    return new SuperElement('p', item)
})


