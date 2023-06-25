
  const lists = []
  const createNewList = (name) => {
      lists.push(name)
  }
//default lists
let viewAllList = createNewList('all')
let personalList = createNewList('personal')
let professionalList = createNewList('professional')
let completeList = createNewList('complete')

const priorityLevel = ['Low', 'Medium', 'High', 'Urgent']  
const notes = []

//factory functions
function createNote(title, description, dueDate, time, priority, list, id, checkList) {
    const note = {
        title: title,
        description: description,
        dueDate: dueDate,
        time: time,
        priority: priority,
        list: list,
        id: id,
        checkList: [],
        array: [title, description, dueDate, time, priority, list, id, checkList],        
        setTitle(title) {
            this.title = title
        },
        setDescription(description) {
            this.description = description
        },
        setDueDate(dueDate) {
            this.dueDate = dueDate
        },
        setTime(time) {
            this.time = time
        },
        setPriority(priority) {
            this.priority = priority
        },
        setList(list) {
            this.list = list
        },
        setId(id) {
            this.id = id
        },
        setCheckList(listItem) {
          this.checkList.push(listItem);
        },
    }

    notes.push(note)
    return note
}

 //test variables 
//  let description = 'Teeth cleaning and x-ray'
// const dentistApt = createNote('Dentist', description, '11/24/23', '12:00', priorityLevel[1], lists[1], 'dp', false)
// const hairApt = createNote('Hair did', 'Pubes', '11/25/23', '1:00', priorityLevel[0], lists[0], 'hp', true)
// const welcomeArray = ['Welcome', 'The bestest todo list app', 'firstEvent.setArray(work.array)', 'renderNotes(work.array)']
// const emptyNote = createNote('New note', 'description', 'date', 'time', priorityLevel[3], lists[0], 'newNote', false)

//DOM stuff
const containerDiv = document.getElementById('container')
const listDiv = document.getElementById('listDiv')
listDiv.classList.add('flex')
const inputDiv = document.getElementById('inputDiv')
const menuDiv = document.getElementById('menuDiv')


class SuperElement {
    constructor(parent, elementType, innerHTML = '', className = '', id = '') {
      const element = document.createElement(elementType)
      element.innerHTML = innerHTML
      element.className = className
      element.id = id
      if (parent) {
        parent.appendChild(element)
      } else {
        throw new Error('Parent element does not exist.')
      }
    }
  }
  
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

 let displayedList
 const renderList = () => {
  listDiv.innerHTML = ''
  loadSavedLists()
    lists.map(item => {              
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
  renderNewListInput(parent)
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
    if (notes[i].list != 'complete') {
      handlePriorityColor(displayedPriority, notes[i])
      handlePriorityColor(displayedTitle, notes[i])
      handlePriorityColor(displayedDesc, notes[i])
      handlePriorityColor(displayedDate, notes[i])
      handlePriorityColor(displayedTime, notes[i])    
    }
    //checklist
    let checkListDiv =  new SuperElement(noteDiv, 'div', '', 'checkListDiv', `checkListDiv-${notes[i].id}`)
   checkListDiv.textContent = 'Check List'

  //remove Btn
  const removeBtnId = `removeBtn-${notes[i].id}`
  console.log(removeBtnId)
  new SuperElement(listElement, 'button', 'Completed', 'removeBtn', removeBtnId)
  const removeBtn = document.getElementById(removeBtnId)
  removeBtn.addEventListener('click', () => {
    const noteToRemove = document.getElementById(noteId)
    if (notes[i].list != 'complete') {      
      changeList(notes[i], 'complete')
    } else {
      noteToRemove.remove()
      notes.splice(i, 1)
      renderNotes()
    }
      saveToLocalStorage()
      removeBtn.remove()
    })
    // Checklist Input
    new SuperElement(listElement, 'input', '', 'listItemInput', 'listItemInput-' + i)

    const listItemInputs = document.querySelectorAll('.listItemInput')
    const listInput = listItemInputs[i]
    listInput.placeholder = 'Checklist Item'

    // CheckList button
    new SuperElement(listElement, 'button', 'Add List Item', 'addCLBtn', 'addCLBtn-' + i)
    const addCLBtn = document.getElementById('addCLBtn-' + i)
    addCLBtn.addEventListener('click', () => {
      addCheckList(notes[i], listInput.value)
      renderCheckList()
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
        const noteId = `note-${Date.now()}`
        createNote(
          titleInput.value, 
          descInput.value, 
          dateInput.value, 
          timeInput.value, 
          prioritySelect.value, 
          listSelect.value,  
          `note-${Date.now()}`, 
          ''
          )
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
  })
  // Add options to the listSelect element
  options.forEach(option => {
  listSelect.add(option)
  })
}

const renderNewListInput = (parent) => {
  //Title input
  new SuperElement(parent, 'input', '', 'newListInput', 'newListInput')
  const newListInput = document.getElementById('newListInput')
  newListInput.placeholder = 'New List'
  //Add list button
  new SuperElement(parent, 'button', 'Add List', 'addListBtn', 'addListBtn')
  const addListBtn = document.getElementById('addListBtn')
  addListBtn.addEventListener('click', () => {
    createNewList(newListInput.value)        
    saveToLocalStorage()    
    renderList(lists)
    //menuDiv add removeBtn
    removeList()
    handleDefault()
    //add name to selector option
    renderListSelector(parent)
    renderNotes()
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
}

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

const addCheckList = (note, listItem) => {
  note.setCheckList(listItem)
}

const renderNewNoteBtn = () => {
  new SuperElement(containerDiv, 'button', '+', 'newNoteBtn', 'newNoteBtn')
  const newNoteBtn = document.getElementById('newNoteBtn')
  newNoteBtn.addEventListener('click', () => {
    inputDiv.classList.remove('hide')
    inputDiv.classList.add('flexColumn')
  })
}

//localStorage stuff
const saveToLocalStorage = () => {
  const savedNotes = localStorage.getItem('savedNotes')
  const savedLists = localStorage.getItem('savedLists')
  if (JSON.stringify(notes) !== savedNotes) {
    localStorage.setItem('savedNotes', JSON.stringify(notes))
  }
  if (JSON.stringify(lists) !== savedLists) {
    localStorage.setItem('savedLists', JSON.stringify(lists))
  }
  console.log(`Saved to local storage: ${savedNotes}`)
}
  
  
const removeItemLocalStorage = (key) => {
  localStorage.removeItem(key)
}

const loadSavedLists = () => {  
  const savedLists = JSON.parse(localStorage.getItem('savedLists'))
  if (savedLists) {
    lists.length = 0; // Clear the lists array
    savedLists.forEach(item => {
      lists.push(item);
    })
  }
}

const loadSavedNotes = () => {
  const savedNotes = JSON.parse(localStorage.getItem('savedNotes'))
  if (savedNotes) {
    savedNotes.forEach(savedNote => {
      createNote(
        savedNote.title,
        savedNote.description,
        savedNote.dueDate,
        savedNote.time,
        savedNote.priority,
        savedNote.list,
        savedNote.id,
        savedNote.checkList,
        savedNote.array,        
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
    location.reload()
  })
}

const removeList = () => {
  menuDiv.innerHTML = ''
  lists.forEach((list, index) => {    
    if (list !== 'complete' && list !== 'all') {
      const capitalList = capitalizeFirstLetter(list)
      new SuperElement(menuDiv, 'button', `Remove ${capitalList} List`, 'removeBtn', `removeListBtn${index}`)
      const removeListBtn = document.getElementById(`removeListBtn${index}`)
      removeListBtn.addEventListener('click', () => {
        const listIndex = lists.findIndex(item => item === list)
        if (listIndex !== -1) {
          lists.splice(listIndex, 1)
          saveToLocalStorage()
          renderList()
          renderListSelector(inputDiv)
          renderNotes()
          removeListBtn.remove()
        }
      })
    }
  })
}

const handlePriorityColor = (el, note) => {
  if (note.priority === 'Urgent') {
    el.classList.add('red')
  } else if (note.priority === 'High') {
    el.classList.add('redish')
  } else if (note.priority === 'Medium') {
    el.classList.add('yellowish')
  } else {
    el.classList.add('greenish')
  }
}

const handleRemoveBtn = () => {
  //the remove btns were persistant even if the default lists had been disabled
  const personalList = document.getElementById('personal')
  const professionalList = document.getElementById('professional')
  //check for element
  if (!professionalList) {
    const removeListBtn1 = document.getElementById('removeListBtn2')
    removeListBtn1.remove()
  }
  if (!personalList) {
    const removeListBtn2 = document.getElementById('removeListBtn1')
    removeListBtn2.remove()
  }
}

const renderCheckList = () => {
  const noteDivs = document.getElementsByClassName('noteDiv')
  Array.from(noteDivs).forEach(noteDiv => {
    const noteId = noteDiv.id
    const checkListDiv = document.getElementById(`checkListDiv-${noteId}`)
    const note = notes.find(note => note.id === noteId)
    if (note.checkList.length > 0) {      
        checkListDiv.innerHTML = ''
        note.checkList.forEach((checkListItem, index) => {
        new SuperElement(checkListDiv, 'p', checkListItem, 'checkList', `checkList-${noteId}-${index}`)
      })
    } 
  })
}


// checkListDiv-note-1687708536409
// checkListDiv-note-1687708555384






document.addEventListener('DOMContentLoaded', function() {
  removeList()
  renderNoteInputs('inputDiv')  
  handleDefault()
  loadSavedLists()
  renderListSelector(inputDiv)
  renderNewListInput(inputDiv)
  renderList();
  hideListNotesExcept(lists[0])
  loadSavedNotes()
  renderNotes()
  renderNewNoteBtn()
  handleRemoveBtn()
 
})
  
//diagnostic tools


function handleCLick(event) {
  const clickedElement = event.target
  console.log(clickedElement)
}
document.querySelector('body').addEventListener('click', handleCLick)

