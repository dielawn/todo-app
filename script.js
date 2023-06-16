
const notes = []
// //factory functions
function createNote(title, description, dueDate, time, priority) {
    const note = {
        title: title,
        description: description,
        dueDate: dueDate,
        time: time,
        priority: priority,
        array: [title, description, dueDate, time, priority]
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
     }
 }
 const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const lists = []
  const createNewList = (name) => {
      lists.push(name);
  }
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

 const stuffList = createNewList('stuff') 
 const moreStuffList = createNewList('moreStuff')
 const defaultList = createNewList('general')
 const work = createNewList('professional')
 const edu = createNewList('school')
 const appt = createNewList('appointment')

 const renderList = (array) => {
    array.map(item => {
        console.log(item)
        let capitalName = capitalizeFirstLetter(item)
        new SuperElement(containerDiv, 'div', capitalName, 'listHeader', item + 'Header')
        new SuperElement(containerDiv, 'div', '', 'list', item)
        
                
    })       
 }

renderList(lists)
   

const renderNotes = (notes, parent, callback) => {
    const noteId = `note-${Date.now()}`;
    const noteDiv = new SuperElement(parent, 'div', '', 'noteDiv', noteId);
         
    for (let i = 0; i < notes.length; i++) {
      new SuperElement(noteDiv.el, 'p', notes[i], 'note', '');
    }    
    const removeBtn = new SuperElement(parent, 'button', 'X', 'removeBtn', noteId);
    removeBtn.el.addEventListener('click', () => {
      console.log('remove');
      const noteToRemove = document.getElementById(noteId);
      if (noteToRemove) {
        noteToRemove.remove();
      }
      removeBtn.el.remove();
    });
    
    if (typeof callback === 'function') {
      callback(); // Execute the callback function if provided
    }
  };
               
const renderInputs = () => {
    new SuperElement(containerDiv, 'div', '', 'inputDiv', 'inputDiv')
    const inputDiv = document.getElementById('inputDiv')
        //Title input
        new SuperElement(inputDiv, 'input', '', 'titleInput', 'titleInput')
        const titleInput = document.getElementById('titleInput')
        titleInput.placeholder = 'Title'
        // Description input
        new SuperElement(inputDiv, 'input', '', 'descInput', 'descInput')
        const descInput = document.getElementById('descInput')
        descInput.placeholder = 'Description'
        //Date input
        new SuperElement(inputDiv, 'input', '', 'dateInput', 'dateInput')
        const dateInput = document.getElementById('dateInput')
        dateInput.placeholder = 'Date'
        //Time input
        new SuperElement(inputDiv, 'input', '', 'timeInput', 'timeInput')
        const timeInput = document.getElementById('timeInput')
        timeInput.placeholder = 'Time'
        //Priority Select
        new SuperElement(inputDiv, 'label', 'Priority', 'prioritySelectLabel', 'prioritySelectLabel')
        const prioritySelectLabel = document.getElementById('prioritySelectLabel')
        prioritySelectLabel.for = 'prioritySelect'
        new SuperElement(inputDiv, 'select', '', 'prioritySelect', 'prioritySelect')
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

        new SuperElement(inputDiv, 'button', 'Add Note', 'addNoteBtn', 'addNoteBtn')
        const addNoteBtn = document.getElementById('addNoteBtn')
        addNoteBtn.addEventListener('click', () => {
            const newNote = createNote(titleInput.value, descInput.value, dateInput.value, timeInput.value, prioritySelect.value, )
            renderNotes(newNote.note.array, school)       
        })
}




const hideListNotesExcept = (displayedList) => {
    const listOfLists = document.querySelectorAll('.list');
    console.log(listOfLists.length)
    for (let i = 0; i < listOfLists.length; i++) {
        let currentList = listOfLists[i];
        currentList.classList.add('hide');   
      if(currentList.id === displayedList.id) {
        currentList.classList.remove('hide');
      }      
    }
  };
  
  
renderInputs()
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        renderNotes(welcomeArray, school, () => {
        //   hideListNotesExcept(school); // Call hideListNotesExcept after rendering notes
        });
        setTimeout(() => {
            renderNotes(hairApt.note.array, general, () => {
                // hideListNotesExcept(school); // Call hideListNotesExcept after rendering notes
              });
            setTimeout(() => {
                renderNotes(welcomeArray, professional, () => {
                    // hideListNotesExcept(school); // Call hideListNotesExcept after rendering notes
                  });
                setTimeout(() => {
                    renderNotes(dentistApt.note.array, appointment, () => {
                        // hideListNotesExcept(school); // Call hideListNotesExcept after rendering notes
                      });
                    setTimeout(() => {
                        renderNotes(dentistApt.note.array, stuff, () => {
                            // hideListNotesExcept(school); // Call hideListNotesExcept after rendering notes
                          });
                        setTimeout(() => {
                            renderNotes(dentistApt.note.array, moreStuff, () => {
                                hideListNotesExcept(appointment); // Call hideListNotesExcept after rendering notes
                              });
                          }, 1);
                      }, 1);
                  }, 1);
                  
              }, 1);
          }, 1);
      }, 1);

  });
     
  
      



