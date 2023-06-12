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
 const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


 //test variables 
 let description = 'Teeth cleaning and x-ray'
 const defaultNotes = [
    createNote('Dentist', description, '11/24/23', '12:00', 'High' ), 
    createNote('Hair did', 'Pubes', '11/25/23', '1:00', 'Very High' )
]
const welcomeArray = ['Welcome', 'The bestest todo list app', 'firstEvent.setArray(work.array)', 'renderNotes(work.array)']


//DOM stuff
function SuperElement(parent, type, content, className, id) {
    this.el = document.createElement(type)
    this.el.innerText = content
    this.el.classList.add(className)
    this.el.id = id
    parent.appendChild(this.el)
    // this.el.addEventListener('click', () => {
    //     console.log(this.el)
    // })
} 

    const bodyElement = document.querySelector('body');

    const newContainer = new SuperElement(bodyElement, 'div', '', 'container', 'container');
    const containerDiv = document.getElementById('container')

    function createList(name) {
        SuperElement(containerDiv, 'div', '', name, name)
        const newList = document.getElementById(name)       
         let capitalName = capitalizeFirstLetter(name)
        SuperElement(newList, 'p', capitalName, `list${name}`, `list${name}`)
        const listNameTxt = document.getElementById(`list${name}`)
        listNameTxt.style.fontWeight = 900;
      } 
        const defaultList = createList('general')
        const work = createList('professional')
        const edu = createList('school')
        const appt = createList('appointment')
   

        const renderNotes = (array, parent) => {
            const noteId = `note-${Date.now()}`; // Generate a unique ID for the note        
            const noteDiv = new SuperElement(parent, 'div', '', 'noteDiv', noteId);        
            array.map(item => {
                new SuperElement(noteDiv.el, 'p', item, 'listDiv', '');
            });        
            const removeBtn = new SuperElement(parent, 'button', 'X', 'removeBtn', noteId);
            removeBtn.el.addEventListener('click', () => {
                console.log('remove');
                const noteToRemove = document.getElementById(noteId);
                if (noteToRemove) {
                    noteToRemove.remove(); // Remove the note element from the DOM
                }
                removeBtn.el.remove(); // Remove the remove button element from the DOM
            });
        };
               
// renderNotes(welcomeArray, pro)
// renderNotes(welcomeArray, school)
// renderNotes(welcomeArray, general)
// renderNotes(welcomeArray, appointment)

setTimeout(() => {
    renderNotes(welcomeArray, school)
    setTimeout(() => {
        renderNotes(welcomeArray, general)
        setTimeout(() => {
            renderNotes(welcomeArray, professional)
            setTimeout(() => {
                renderNotes(welcomeArray, appointment)
              }, 1);
          }, 1);
      }, 1);
  }, 1);





