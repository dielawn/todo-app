// //factory functions

// function createPerson(name) {
//     return {
//         name,
//         talk() {
// return `I am ${this.name}`
//         }
//     }
// }
// const me = createPerson('Sina')
// const you = createPerson('Bob')

// const myCoolProto = {
//     talk() {
//         return `Hello, I am ${this.name}! This is my cool proto.`
//     }
// }

// function createHuman(name) {
//     return Object.create(myCoolProto, {
//         name: {
//             value: name
//         }
//     })
// }

// const someone = createHuman('Sally')

// function createElement(type, text, color){
//     const el = document.createElement(type)
//     el.innerText = text
//     el.style.color = color
//     document.body.append(el)
//     return{
//         el,
//         setText(text) {
//             el.innerText = text
//         },
//         setColor(color) {
//             el.style.color = color
//         }
//     }
// }

// const h1 = createElement('h1', 'Hey guys', 'red')

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
         }
     }
 }
 let description = 'Teeth cleaning and x-ray'
 let firstEvent = createToDo('Dentist', description, '11/24/23', '12:00', 'High' )
 let secondEvent = createToDo('Hair did', 'Pubes', '11/25/23', '1:00', 'Very High' )
 
 let testArray = []
// const domArray = [toDo.title, toDo.description, toDo.dueDate, toDo.time, toDo.priority]


//Constructor function
function Category(category, description, ) {
    this.category = category,
    this.description = description,
    // this.log = () => {
    //     return  `${this.category}, ${this.description}`
    // }
    this.array = []
}

const work = new Category('Work', 'Professional', )
const edu = new Category('School', 'College')
const appt = new Category('Appointment', 'dr, dentist, plumber, etc')

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
const renderToDos = (array) => {
    array.map(item => {
        return new SuperElement('p', item)
    })
}


const h2 = new SuperElement('h2', 'Check the console')

const eventElements = testArray.map(item => {
    return new SuperElement('p', item)
})

