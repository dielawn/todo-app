//factory functions

function createPerson(name) {
    return {
        name,
        talk() {
return `I am ${this.name}`
        }
    }
}
const me = createPerson('Sina')
const you = createPerson('Bob')

const myCoolProto = {
    talk() {
        return `Hello, I am ${this.name}! This is my cool proto.`
    }
}

function createHuman(name) {
    return Object.create(myCoolProto, {
        name: {
            value: name
        }
    })
}

const someone = createHuman('Sally')

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


//Constructor function
function ToDoItem(title, description, dueDate, priority) {
    this.title = title,
    this.description = description,
    this.dueDate = dueDate,
    this.priority = priority,
    this.log = () => {
        return  `${this.title}, ${this.description}, ${dueDate}, ${priority}`
    }
}

const drAppt = new ToDoItem('Dr. Appt', 'Minor procedure', '5/15/23', 'High')

function Person(name, age, height) {
    this.name = name,
    this.age = age,
    this.height = height
    this.talk = () => {
        return `Hello I am ${this.name}`
    }
}

Person.prototype.talk = function() {
    return `Ciao, io sono ${this.name}`
}

const dielawn = new Person('Dielawn', '39', '5ft, 10in')
const alpal = new Person('Alpal', '33', '5ft, 10in')
const hildy = new Person('Brumhilda', '3.5', '2ft')


function SuperElement(type, content) {
    this.el = document.createElement(type)
    this.el.innerText = content
    document.body.append(this.el)
    this.el.addEventListener('click', () => {
        console.log(this.el)
    })
} 

const h2 = new SuperElement('h2', 'helloo!')

const array = ['a', 'b', 'c']
const myElements = array.map(item => {
    return new SuperElement('p', item)
})

