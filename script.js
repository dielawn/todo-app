

// Todo list = new Todo();
// Todo school = new HighSchool();


function personFactory (name) {
   return {
        name,
        talk()  {
            return `Hello I am ${name}`
        }
    }
}



function createElement(type, text, color){
    const el = document.createElement(type)
    el.innerText = text
    el.style.color = color
    document.body.append(el)
    return{
        el,
        setText(text) {
            el.innerText = text
        },
        setColor(color) {
            el.style.color = color
        }
    }
}

const h1 = createElement('h1', 'Hey guys', 'red')

function createToDo(title, description, dueDate, priority) {
    const toDo = {
        title: title,
        description: description,
        dueDate: dueDate,
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
        setPriority(priority) {
            toDo.priority = priority
        }
    }
}
let description = 'Teeth cleaning and x-ray'
const firstEvent = createToDo('Dentist', description, '11/24/23', 'High' )
// const me = {
//     name: 'dielawn',
//     talk() {
//         return `Hello I am ${this.name}`
//     }
// }

// const alpal = {
//     name: 'Alpal',
//     talk() {
//         return `Hello I am ${this.name}`
//     }
// }

// Todo list = ListFactory.Construct(); // new ElementarySchool() inside

