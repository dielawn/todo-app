
const notes = []
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
        setNoteArray(noteArray) {
            noteArray.push(note);
        }            
     }
 }
 const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


 //test variables 
 let description = 'Teeth cleaning and x-ray'

   const dentistApt = createNote('Dentist', description, '11/24/23', '12:00', 'High' )

    const hairApt = createNote('Hair did', 'Pubes', '11/25/23', '1:00', 'Very High' )

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

      const renderListObject = (object) => {
        const listId = `list-${Date.now()}`; // Generate a unique ID for the note        
        const listDiv = new SuperElement(containerDiv, 'div', '', 'listDiv', listId);        
       for(let i = 0; i < object.length; i++){
        console.log(notes[i].title)
        new SuperElement(listDiv.el, 'p', notes[i].title, 'listDiv', '');
        new SuperElement(listDiv.el, 'p', notes[i].description, 'listDiv', '');
        new SuperElement(listDiv.el, 'p', notes[i].dueDate, 'listDiv', '');
        new SuperElement(listDiv.el, 'p', notes[i].time, 'listDiv', '');
        new SuperElement(listDiv.el, 'p', notes[i].priority, 'listDiv', '');
       }
        const removeBtn = new SuperElement(listDiv.el, 'button', 'X', 'removeBtn', listId);
        removeBtn.el.addEventListener('click', () => {
            console.log('removeList');
            const listToRemove = document.getElementById(listId);
            if (listToRemove) {
                listToRemove.remove(); // Remove the note element from the DOM
            }
            removeBtn.el.remove(); // Remove the remove button element from the DOM
        });
    };
    renderListObject(dentistApt, containerDiv)

        const defaultList = createList('general')
        const work = createList('professional')
        const edu = createList('school')
        const appt = createList('appointment')
   

        const renderNotes = (notes, parent) => {
            const noteId = `note-${Date.now()}`; // Generate a unique ID for the note        
            const noteDiv = new SuperElement(parent, 'div', '', 'noteDiv', noteId);        
           for(let i = 0; i < notes.length; i++){
            new SuperElement(noteDiv.el, 'p', notes[i], 'listDiv', '');
           }
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
               
const renderInputs = () => {
    SuperElement(containerDiv, 'div', '', 'inputDiv', 'inputDiv')
    const inputDiv = document.getElementById('inputDiv')

        SuperElement(inputDiv, 'input', '', 'titleInput', 'titleInput')
        const titleInput = document.getElementById('titleInput')
        titleInput.placeholder = 'Title'

        SuperElement(inputDiv, 'input', '', 'descInput', 'descInput')
        const descInput = document.getElementById('descInput')
        descInput.placeholder = 'Description'
    
        SuperElement(inputDiv, 'input', '', 'dateInput', 'dateInput')
        const dateInput = document.getElementById('dateInput')
        dateInput.placeholder = 'Date'
    
        SuperElement(inputDiv, 'input', '', 'timeInput', 'timeInput')
        const timeInput = document.getElementById('timeInput')
        timeInput.placeholder = 'Time'
    
        SuperElement(inputDiv, 'label', 'Priority', 'prioritySelectLabel', 'prioritySelectLabel')
        const prioritySelectLabel = document.getElementById('prioritySelectLabel')
        prioritySelectLabel.for = 'prioritySelect'
        SuperElement(inputDiv, 'select', '', 'prioritySelect', 'prioritySelect')
        const prioritySelect = document.getElementById('prioritySelect')   
        prioritySelect.name = 'prioritySelectLabel'    
        // Create option elements and set their values
        const lowOption = document.createElement('option');
            lowOption.value = 'Low';
            lowOption.text = 'Low';

        const mediumOption = document.createElement('option');
            mediumOption.value = 'Medium';
            mediumOption.text = 'Medium';

        const highOption = document.createElement('option');
            highOption.value = 'High';
            highOption.text = 'High';

        const urgentOption = document.createElement('option');
            urgentOption.value = 'Urgent';
            urgentOption.text = 'Urgent';
        // Append the option elements to the select element
        prioritySelect.add(lowOption);
        prioritySelect.add(mediumOption);
        prioritySelect.add(highOption);
        prioritySelect.add(urgentOption);

        SuperElement(inputDiv, 'button', 'Add Note', 'addNoteBtn', 'addNoteBtn')
        const addNoteBtn = document.getElementById('addNoteBtn')
        addNoteBtn.addEventListener('click', () => {
            const newNote = createNote(titleInput.value, descInput.value, dateInput.value, timeInput.value, prioritySelect.value, )
            newNote.setNoteArray(notes)
            console.log(notes)
            for(let i = 0; i < notes.length; i++){
                console.log(notes[i].title)
                renderNotes(notes[i], general)
            }
            
        })
}


renderInputs()
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





