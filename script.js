
  const lists = []
  const createNewList = (name) => {
      lists.push(name)
  }


let personalList = createNewList('personal')
let professionalList = createNewList('professional')
let viewAllList = createNewList('all')
let completeList = createNewList('complete')
let newList = createNewList('new')
const priorityLevel = ['Low', 'Medium', 'High', 'Urgent']  
const notes = []

// //factory functions
function createNote(title, description, dueDate, time, priority, list) {
    const note = {
        title: title,
        description: description,
        dueDate: dueDate,
        time: time,
        priority: priority,
        list: list,
        array: [title, description, dueDate, time, priority],
        setTitle(title) {
            this.title = title;
        },
        setDescription(description) {
            this.description = description;
        },
        setDueDate(dueDate) {
            this.dueDate = dueDate;
        },
        setTime(time) {
            this.time = time;
        },
        setPriority(priority) {
            this.priority = priority;
        },
        setList(list) {
            this.list = list;
        }
    };

    notes.push(note);
    return note;
}



   
  
 //test variables 
 let description = 'Teeth cleaning and x-ray'
const dentistApt = createNote('Dentist', description, '11/24/23', '12:00', 'High', lists[1])
const hairApt = createNote('Hair did', 'Pubes', '11/25/23', '1:00', 'Very High', lists[0] )
const welcomeArray = ['Welcome', 'The bestest todo list app', 'firstEvent.setArray(work.array)', 'renderNotes(work.array)']


//DOM stuff
const containerDiv = document.getElementById('container')
const listDiv = document.getElementById('listDiv')
const inputDiv = document.getElementById('inputDiv')

class SuperElement {
    constructor(parent, elementType, innerHTML = '', className = '', id = '') {
      const element = document.createElement(elementType);
      element.innerHTML = innerHTML;
      element.className = className;
      element.id = id;
      if (parent) {
        parent.appendChild(element);
      } else {
        throw new Error('Parent element does not exist.');
      }
    }
  }
  
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  };

 let displayedList
 const renderList = (array) => {

    array.map(item => {
      if (item !== 'new' && item !== 'all')  {
            // let capitalName = capitalizeFirstLetter(item)
      const listHeaderId = item + 'Header'
      let listHeader = document.getElementById(listHeaderId)
  
      if (!listHeader) {
        new SuperElement(listDiv, 'div', item, 'listHeader', listHeaderId)
        new SuperElement(listDiv, 'div', '', 'list', item)
        listHeader = document.getElementById(listHeaderId)
      }
  
      listHeader.addEventListener('click', () => {
        displayedList = item // Assign the ID of the clicked list header
      
        hideListNotesExcept(displayedList)
      })
        }
      
    })
  
    return displayedList
  }
  


  const renderNotes = (notes, parent, callback) => {
    const noteId = `note-${Date.now()}`;
  
    new SuperElement(parent, 'div', '', 'noteDiv', noteId);
    const noteDiv = document.getElementById(noteId);
  
    for (let i = 0; i < notes.length; i++) {
      new SuperElement(noteDiv, 'p', notes[i], 'note', '');
    }
  
    const removeBtnId = `removeBtn-${Date.now()}`;
    new SuperElement(parent, 'button', 'X', 'removeBtn', removeBtnId);
    const removeBtn = document.getElementById(removeBtnId);
  
    removeBtn.addEventListener('click', () => {
      console.log('remove');
      const noteToRemove = document.getElementById(noteId);
      console.log(notes)
      if (noteToRemove) {
        noteToRemove.remove();
      }
      removeBtn.remove();
    });
  
    if (typeof callback === 'function') {
      callback(); // Execute the callback function if provided
    }
  };
  const changeList = (note, newList) => {
    note.setList(newList); // Call the setList method on the note object
    return 'yo'
  }
  
//   notes[0].list
//   'professional'
//   changeList(notes[0], lists[3]);  
//   undefined
//   notes[0].list
//   'complete'

const getNoteLists = () => {
    console.log(notes)
    notes.forEach(note => {
        console.log(note.list)  
        let noteId = note.list
        console.log(noteId)
        let noteParent = document.getElementById(noteId)
        console.log(noteParent)
    })
}
getNoteLists()
const noteContainer = document.getElementById(notes[0].list)
const noteToBeMoved = document.getElementById(notes[0])
console.log(notes[0].list)
// renderNotes(noteToBeMoved, noteContainer, )
console.log(notes[0])

const renderNoteInputs = () => {
    const inputDiv = document.getElementById('inputDiv')
    inputDiv.classList.add('flexColumn')
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
        new SuperElement(inputDiv, 'div', '', 'prioritySelectDiv', 'prioritySelectDiv')
        const prioritySelectDiv = document.getElementById('prioritySelectDiv')
        new SuperElement(prioritySelectDiv, 'label', 'Priority', 'prioritySelectLabel', 'prioritySelectLabel')
        const prioritySelectLabel = document.getElementById('prioritySelectLabel')
        prioritySelectLabel.for = 'prioritySelect'
        new SuperElement(prioritySelectDiv, 'select', '', 'prioritySelect', 'prioritySelect')
        const prioritySelect = document.getElementById('prioritySelect')   
        prioritySelect.name = 'prioritySelectLabel'    
        // Create option elements and set their values
        const options = priorityLevel.map(item => {
            const option = document.createElement('option')
            option.value = item
            option.text = item
            return option
        })
        options.forEach(option => {
            prioritySelect.add(option)
        })
        
        
        renderListSelector()

        new SuperElement(inputDiv, 'button', 'Add Note', 'addNoteBtn', 'addNoteBtn')
        const addNoteBtn = document.getElementById('addNoteBtn')
        addNoteBtn.addEventListener('click', () => {
            console.log(listSelect.value)
            const newNote = createNote(titleInput.value, descInput.value, dateInput.value, timeInput.value, prioritySelect.value, listSelect.value)
            
            
            const parentElement = document.getElementById(newNote.list);
renderNotes(newNote.array, parentElement, () => {
  console.log('rendered');
});
 
        })
}
const renderListSelector = () => {
    // list selector
    new SuperElement(inputDiv, 'div', '', 'listSelectDiv', 'listSelectDiv')
    const listSelectDiv = document.getElementById('listSelectDiv')
    listSelectDiv.innerHTML = ''
    new SuperElement(listSelectDiv, 'select', '', 'listSelect', 'listSelect')
    const listSelect = document.getElementById('listSelect')   
    listSelect.name = 'listSelectLabel'    
   // Create option elements and set their values
    const options = lists.map(item => {
    const option = document.createElement('option')
    option.value = item
    option.text = item
    return option
});
    // Add options to the listSelect element
    options.forEach(option => {
    listSelect.add(option);
});
}
const renderNewListInput = () => {
    //Title input
    new SuperElement(inputDiv, 'input', '', 'newListInput', 'newListInput')
    const newListInput = document.getElementById('newListInput')
    newListInput.placeholder = 'New List'
    //Add list button
    new SuperElement(inputDiv, 'button', 'Add List', 'addListBtn', 'addListBtn')
        const addListBtn = document.getElementById('addListBtn')
        addListBtn.addEventListener('click', () => {
            const newList = createNewList(newListInput.value)            
            console.log(newList)
            renderList(lists)
            renderListSelector()
        })
}

const hideListNotesExcept = (displayedListId) => {
    const listOfLists = document.querySelectorAll('.list')   
    for (let i = 0; i < listOfLists.length; i++) {
      const currentList = listOfLists[i]      
      if (currentList.id === displayedListId) {
        currentList.classList.remove('hide')
      } else if (displayedListId === 'all') {
        listOfLists[i].classList.remove('hide')
      } else {
        currentList.classList.add('hide')
      } 
    }
  };
  

  renderNoteInputs()
  renderNewListInput()
  document.addEventListener('DOMContentLoaded', function() {
    renderList(lists);
    hideListNotesExcept(lists[2]);
    let currentId = listSelect.value
    console.log(currentId)
 let parentElement = document.getElementById(lists[0])    
 let currentList = document.getElementById(lists[1])
 setTimeout(() => {
    renderNotes(hairApt.array, parentElement, () => {
      
      setTimeout(() => {
        renderNotes(dentistApt.array, currentList, () => {
          
        });
      }, 1); 
    });
  }, 1); 

      
   
  });
  
  const getParent = () => {
    console.log(notes)       
    for (let i = 0; i < lists.length; i++) {
      console.log(`list: ${lists[i]}`)
      let currentList = lists[i]
      for (let j = 0; j < notes.length; j++) {
        console.log(`note list: ${notes[j].list}`)
        let noteList = notes[j].list
        if (currentList === noteList) {
          console.log('match')
          let parent = document.getElementById(notes[j].list)
          return parent
        }
      }
    }
  }

   console.log(getParent())
  


