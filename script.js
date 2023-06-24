
  const lists = []
  const createNewList = (name) => {
      lists.push(name)
  }


let personalList = createNewList('personal')
let professionalList = createNewList('professional')
let viewAllList = createNewList('all')
let completeList = createNewList('complete')

const priorityLevel = ['Low', 'Medium', 'High', 'Urgent']  
const notes = []

// //factory functions
function createNote(title, description, dueDate, time, priority, list, id, checkList) {
    const note = {
        title: title,
        description: description,
        dueDate: dueDate,
        time: time,
        priority: priority,
        list: list,
        array: [title, description, dueDate, time, priority],
        id: id,
        checkList: checkList,
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
        },
        setCheckList(checkList) {
            this.checkList = checkList
        }
    };

    notes.push(note);
    return note;
}

 //test variables 
 let description = 'Teeth cleaning and x-ray'
// const dentistApt = createNote('Dentist', description, '11/24/23', '12:00', priorityLevel[1], lists[1], 'dp', false)
// const hairApt = createNote('Hair did', 'Pubes', '11/25/23', '1:00', priorityLevel[0], lists[0], 'hp', true)
// const welcomeArray = ['Welcome', 'The bestest todo list app', 'firstEvent.setArray(work.array)', 'renderNotes(work.array)']
// const emptyNote = createNote('New note', 'description', 'date', 'time', priorityLevel[3], lists[0], 'newNote', false)

//DOM stuff
const containerDiv = document.getElementById('container')
const listDiv = document.getElementById('listDiv')
const inputDiv = document.getElementById('inputDiv')
const menuDiv = document.getElementById('menuDiv')


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
  listDiv.innerHTML = ''
  loadSavedLists()
    lists.map(item => {
      // if (item !== 'new' && item !== 'all')  {            
      const listHeaderId = item + 'Header'
      let listHeader = document.getElementById(listHeaderId)  
      if (!listHeader) {
        let capitalName = capitalizeFirstLetter(item)
        new SuperElement(listDiv, 'div', capitalName, 'listHeader', listHeaderId)
        new SuperElement(listDiv, 'div', '', 'list', item)
        listHeader = document.getElementById(listHeaderId)
      }
  
      listHeader.addEventListener('click', () => {
        displayedList = item // Assign the ID of the clicked list header      
        hideListNotesExcept(displayedList)
      })
    // }
  })
}
   
   
    

  
const editNote = (parent, i) => {
  
  //title
     new SuperElement(parent, 'input', '', 'editTitleInput', 'editTitleInput')
     const titleInput = document.getElementById('editTitleInput')
     titleInput.value = notes[i].title
     //description
     new SuperElement(parent, 'input', '', 'editDescriptInput', 'editDescriptInput')
     const editDescriptInput = document.getElementById('editDescriptInput')
     editDescriptInput.value = notes[i].description
  //date
  new SuperElement(parent, 'input', '', 'editDateInput', 'editDateInput')
     const editDateInput = document.getElementById('editDateInput')
     editDateInput.value = notes[i].dueDate
  //time
  new SuperElement(parent, 'input', '', 'editTimeInput', 'editTimeInput')
     const editTimeInput = document.getElementById('editTimeInput')
     editTimeInput.value = notes[i].time
  //priority
     new SuperElement(parent, 'div', '', 'prioritySelectDiv', 'editPriority')
          const editPriorityDiv = document.getElementById('editPriority')
          new SuperElement(editPriorityDiv, 'label', 'Priority', 'editPriorityLabel', 'editPriorityLabel')
          const editPriorityLabel = document.getElementById('editPriorityLabel')
          editPriorityLabel.for = 'editPriority'
          new SuperElement(editPriorityDiv, 'select', '', 'prioritySelect', 'editPrioritySeect')
          const prioritySelect = document.getElementById('editPrioritySeect')   
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
        renderListSelector(parent)
     //save btn
     new SuperElement(parent, 'button', 'Save', 'saveBtn', 'saveTitleBtn')
     const saveTitleBtn = document.getElementById('saveTitleBtn')
     saveTitleBtn.addEventListener('click', () => {
      changeTitle(notes[i], titleInput.value)
      changeDescription(notes[i], editDescriptInput.value)
      changeDueDate(notes[i], editDateInput.value)
      changeTime(notes[i], editTimeInput.value)
      changePriority(notes[i], prioritySelect.value)
      saveToLocalStorage()
     })   
  
  }

  const renderNotes = () => {
    clearNoteEl()
  for (let i = 0; i < notes.length; i++) {
    let noteId = notes[i].id
    let noteList = notes[i].list

    let listElement = document.getElementById(noteList)
    new SuperElement(listElement, 'div', '', 'noteDiv', noteId)
    const noteDiv = document.getElementById(noteId)
    //create edit div
    new SuperElement(listElement, 'div', '', 'editDiv', 'editDiv')
    const editDiv = document.getElementById('editDiv')
    editDiv.classList.add('hide')
    //note title
  new SuperElement(noteDiv, 'p', notes[i].title, 'note', `${notes[i].id}-noteTitle`)
  let displayedTitle = document.getElementById(`${notes[i].id}-noteTitle`)
  noteDiv.addEventListener('click', () => {
    //hide p element show titleInput save and cancel btns
    noteDiv.classList.add('hide')
    editDiv.classList.remove('hide')
    editNote(editDiv, i)
    
  })
  new SuperElement(noteDiv, 'p', notes[i].description, 'note', `${notes[i].id}-noteDesc`)
  const displayedDesc = document.getElementById(`${notes[i].id}-noteDesc`)
  new SuperElement(noteDiv, 'p', notes[i].dueDate, 'note', `${notes[i].id}-noteDueDate`)
  const displayedDate = document.getElementById(`${notes[i].id}-noteDueDate`)
  new SuperElement(noteDiv, 'p', notes[i].time, 'note', `${notes[i].id}-noteTime`)
  const displayedTime = document.getElementById(`${notes[i].id}-noteTime`)
  new SuperElement(noteDiv, 'p', notes[i].priority, 'note', `${notes[i].id}-notePriority`)
  const displayedPriority = document.getElementById(`${notes[i].id}-notePriority`)
  

  
  //remove Btn
   const removeBtnId = `removeBtn-${noteId}`
    new SuperElement(listElement, 'button', 'Complete', 'removeBtn', removeBtnId)
    const removeBtn = document.getElementById(removeBtnId)

    removeBtn.addEventListener('click', () => {
      console.log('remove')
     
      const noteToRemove = document.getElementById(noteId);
      // console.log(notes[i].list)
      if (notes[i].list != 'complete') {
        changeList(notes[i], 'complete')
        
      } else {
        noteToRemove.remove()
        console.log(notes[i])
        notes.splice(i, 1);
        renderNotes()
        console.log(notes[i])
      }
      saveToLocalStorage()
      removeBtn.remove()
    })
}
}


const renderNoteInputs = () => {
  
    const inputDiv = document.getElementById('inputDiv')
    
    inputDiv.classList.add('hide')
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
        
        
        renderListSelector(inputDiv)

        new SuperElement(inputDiv, 'button', 'Add Note', 'addNoteBtn', 'addNoteBtn')
        const addNoteBtn = document.getElementById('addNoteBtn')
        addNoteBtn.addEventListener('click', () => {
            console.log(listSelect.value)
            const noteId = `note-${Date.now()}`
            createNote(titleInput.value, descInput.value, dateInput.value, timeInput.value, prioritySelect.value, listSelect.value, noteId, false)
            inputDiv.classList.remove('flexColumn')
            inputDiv.classList.add('hide')
            renderNotes()
            saveToLocalStorage()
        })
}

const renderListSelector = (parent) => {

    // list selector
    new SuperElement(parent, 'div', '', 'listSelectDiv', 'listSelectDiv')
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

            createNewList(newListInput.value)        
            saveToLocalStorage()    
            console.log(lists)
            renderList(lists)
            renderListSelector(inputDiv)
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
    note.setList(newList)
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
    note.setDescription(newDescription)
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

  const renderNewNoteBtn = () => {
    new SuperElement(containerDiv, 'button', '+', 'newNoteBtn', 'newNoteBtn')
    const newNoteBtn = document.getElementById('newNoteBtn')
    newNoteBtn.addEventListener('click', () => {
      console.log(inputDiv)
      inputDiv.classList.remove('hide')
      inputDiv.classList.add('flexColumn')
      console.log(inputDiv)
    })
  }



//localStorage stuff
  const saveToLocalStorage = () => {
    const savedNotes = localStorage.getItem('savedNotes');
    const savedLists = localStorage.getItem('savedLists');
  
    if (JSON.stringify(notes) !== savedNotes) {
      localStorage.setItem('savedNotes', JSON.stringify(notes));
      console.log('firstOne')
    }
  console.log(lists)
    if (JSON.stringify(lists) !== savedLists) {
      localStorage.setItem('savedLists', JSON.stringify(lists));
      console.log('secondOne')
    }
  
    console.log('Saved to local storage');
  };
  
  
 const removeItemLocalStorage = (key) => {

  localStorage.removeItem(key)
}

const loadSavedLists = () => {  
  const savedLists = JSON.parse(localStorage.getItem('savedLists'));

  if (savedLists) {
    lists.length = 0; // Clear the lists array

    savedLists.forEach(item => {
      lists.push(item);
      console.log(lists, item)
    });
  }
};

console.log(lists)
const loadSavedNotes = () => {

  const savedNotes = JSON.parse(localStorage.getItem('savedNotes'))
  if (savedNotes) {
    // console.log(savedNotes);
  savedNotes.forEach(savedNote => {
    createNote(
      savedNote.title,
      savedNote.description,
      savedNote.dueDate,
      savedNote.time,
      savedNote.priority,
      savedNote.list,
      savedNote.array,
      savedNote.id,
      savedNote.checkList
    )
  })
  }  
}

const clearLocalStorage = () => {
  localStorage.clear()
}
const handleDefault = () => {
  new SuperElement(menuDiv, 'button', 'Default Settings', 'defaultBtn', 'defaultBtn')
  const defaultBtn = document.getElementById('defaultBtn')
  defaultBtn.addEventListener('click', () => {
    clearLocalStorage()
   // Reload the current page
    location.reload();

  })
}



const removeList = () => {
  lists.forEach((list, index) => {
    
    if (list !== 'complete' && list !== 'all') {

      const capitalList = capitalizeFirstLetter(list)
      new SuperElement(menuDiv, 'button', `Remove ${capitalList} List`, 'removeBtn', `removeListBtn${index}`)
      const removeListBtn = document.getElementById(`removeListBtn${index}`)
      handleRemoveBtn(removeListBtn)
      removeListBtn.addEventListener('click', () => {
        const listIndex = lists.findIndex(item => item === list)
        if (listIndex !== -1) {
          console.log(lists)
          lists.splice(listIndex, 1)
          console.log(lists)
          console.log(localStorage)
          saveToLocalStorage()
          console.log(localStorage)
          renderList()
          renderListSelector(inputDiv)
          removeListBtn.remove();
        }
      })
    }
  })
}

const handleRemoveBtn = (btn) => {

  let listRemoved = false
  if (lists.length < 4) {
    listRemoved = true
  }
  if (listRemoved === true) {
    btn.remove()
  }
}

removeList()

  renderNoteInputs('inputDiv')
  
  handleDefault()
  document.addEventListener('DOMContentLoaded', function() {
    loadSavedLists()
    renderListSelector(inputDiv)
    
    renderList();
    hideListNotesExcept(lists[2]);
    
    renderNotes()
    renderNewNoteBtn()
  })
  
  
  
function handleCLick(event) {
  const clickedElement = event.target
  console.log(clickedElement)
}
document.querySelector('body').addEventListener('click', handleCLick)

