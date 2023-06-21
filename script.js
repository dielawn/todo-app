
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
function createNote(title, description, dueDate, time, priority, list, id) {
    const note = {
        title: title,
        description: description,
        dueDate: dueDate,
        time: time,
        priority: priority,
        list: list,
        array: [title, description, dueDate, time, priority],
        id: id,
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
        },
        setId(id) {
            this.id = id;
        }
    };

    notes.push(note);
    return note;
}

 //test variables 
 let description = 'Teeth cleaning and x-ray'
const dentistApt = createNote('Dentist', description, '11/24/23', '12:00', 'High', lists[1], 'dp')
const hairApt = createNote('Hair did', 'Pubes', '11/25/23', '1:00', 'Very High', lists[0], 'hp')
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
 const renderList = () => {

    lists.map(item => {
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
  
  const renderNotes = () => {
    clearNoteEl()
  for (let i = 0; i < notes.length; i++) {
    let noteId = notes[i].id
    let noteList = notes[i].list

    let listElement = document.getElementById(noteList)
    new SuperElement(listElement, 'div', '', 'noteDiv', noteId)
    const noteDiv = document.getElementById(noteId)
    notes[i].array.map(item => {
    new SuperElement(noteDiv, 'p', item, 'note', '')
  })
  //remove Btn
  const removeBtnId = `removeBtn-${noteId}`
    new SuperElement(listElement, 'button', 'X', 'removeBtn', removeBtnId)
    const removeBtn = document.getElementById(removeBtnId)
  
    removeBtn.addEventListener('click', () => {
      console.log('remove')
      const noteToRemove = document.getElementById(noteId);
      console.log(noteToRemove)
      if (noteToRemove) {
        noteToRemove.remove()
      }
      removeBtn.remove()
    })
}
}

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
            const noteId = `note-${Date.now()}`
            const newNote = createNote(titleInput.value, descInput.value, dateInput.value, timeInput.value, prioritySelect.value, listSelect.value, noteId)
            renderNotes()
 
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

  const clearNoteEl = () => {
    lists.map(item => {
      let listDiv = document.getElementById(item)
      //clears the note elements
      if (listDiv) {
        while (listDiv.firstChild) {
            listDiv.firstChild.remove()
        }
    }
    })
  }
  const changeList = (note, newList) => {
   clearNoteEl()
    note.setList(newList); // Call the setList method on the note object
    renderNotes()
    return 'list changed'
  }
  const changeTitle = (note, newTitle) => {
    clearNoteEl()
    note.setTitle(newTitle)
    renderNotes()
    return 'title changed'
  }
  const changeDescription = (note, newDescription) => {
    clearNoteEl()
    note.setDescrition(newDescription)
    renderNotes()
    return 'description changed'
  }
  const changeDueDate = (note, newDate) => {
    clearNoteEl()
    note.setDueDate(newDate)
    renderNotes()
    return 'date changed'
  }
  const changeTime = (note, newTime) => {
    clearNoteEl()
    note.setTime(newTime)
    renderNotes()
    return 'time changed'
  }
  const changePriority = (note, newPriority) => {
    clearNoteEl()
    note.setPriority(newPriority)
    renderNotes()
    return 'priority changed'
  }



  renderNoteInputs()
  renderNewListInput()
  document.addEventListener('DOMContentLoaded', function() {
    renderList();
    hideListNotesExcept(lists[2]);
    renderNotes()
  // changeList(notes[0], lists[0])
  });
  

  
  
  


