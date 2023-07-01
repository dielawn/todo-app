// import { formatDistance, subDays } from 'date-fns'

  const lists = []
  const createNewList = (name) => {
      lists.push(name)
  }
//default lists
let viewAllList = createNewList('all')
let dayList = createNewList('today')
let weekList = createNewList('week')
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
    setCheckList(item, isCompleted = false) {
      this.checkList.push({ item, isCompleted });
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
  constructor(parent, elementType, textContent, className, id) {
    this.element = document.createElement(elementType);
    if (textContent) {
      this.element.textContent = textContent;
    }
    if (className) {
      this.element.classList.add(className);
    }
    if (id) {
      this.element.id = id;
    }
    if (parent) {
      parent.appendChild(this.element);
    }
  }
}

// const handleDate = () => {
//   const currentDate = new Date();
//   const formattedDate = format(currentDate, 'yyyy-MM-dd');
//   console.log(formattedDate); // Output: 2023-06-28
// }
// handleDate()



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
      console.log(item)
      let capitalName
      if (item === 'all') {
        capitalName = 'View All'
      } else {
        capitalName = capitalizeFirstLetter(item)
      } 
      new SuperElement(menuDiv, 'div', capitalName, 'menuName', `menuName-${listHeaderId}`)
      const menuList = document.getElementById(`menuName-${listHeaderId}`)
      menuList.addEventListener('click', () => {
        displayedList = item     
        hideListNotesExcept(displayedList)
openCloseMenu()
      })
      new SuperElement(listDiv, 'div', capitalName, 'listHeader', listHeaderId)
      
      new SuperElement(listDiv, 'div', '', 'list', item)
      listHeader = document.getElementById(listHeaderId)
      listHeader.addEventListener('click', () => {
        displayedList = item     
        hideListNotesExcept(displayedList)
             
      })
    }  
   
  })
}
   
const renderEditNote = (parent, i) => {  
  //title
  const titleInput = new SuperElement(parent, 'input', '', 'editTitleInput', 'editTitleInput').element
  titleInput.value = notes[i].title  
  //description
  const editDescriptInput = new SuperElement(parent, 'input', '', 'editDescriptInput', 'editDescriptInput').element
  editDescriptInput.value = notes[i].description
  //date
  const editDateInput = new SuperElement(parent, 'input', '', 'editDateInput', 'editDateInput').element
  editDateInput.value = notes[i].dueDate
  //time
  const editTimeInput = new SuperElement(parent, 'input', '', 'editTimeInput', 'editTimeInput').element
  editTimeInput.value = notes[i].time
  //priority
  const editPriorityDiv = new SuperElement(parent, 'div', '', 'prioritySelectDiv', 'editPriority').element
  const editPriorityLabel = new SuperElement(editPriorityDiv, 'label', 'Priority', 'editPriorityLabel', 'editPriorityLabel').element
  editPriorityLabel.for = 'editPriority'
  const prioritySelect = new SuperElement(editPriorityDiv, 'select', '', 'prioritySelect', 'editPrioritySeect').element
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
  let listSelectValue = renderListSelector(parent, notes[i].list)
  //save btn
  const saveTitleBtn = new SuperElement(parent, 'button', 'Save', 'saveBtn', 'saveTitleBtn').element
    saveTitleBtn.addEventListener('click', () => {
      changeNote(
        notes[i], 
        titleInput.value, 
        editDescriptInput.value, 
        editDateInput.value, 
        editTimeInput.value, 
        prioritySelect.value, 
        listSelectValue.value, 
        )    
      renderCheckList()
      saveToLocalStorage()
    })   
  }

const renderNotes = () => {
  clearNoteEl()
  for (let i = 0; i < notes.length; i++) {
    let noteId = notes[i].id
    let noteList = notes[i].list
    let listElement = document.getElementById(noteList)
    const noteDiv = new SuperElement(listElement, 'div', '', 'noteDiv', noteId).element
    noteDiv.classList.add('boxShaddow')
    //create edit div
    const editDiv = new SuperElement(listElement, 'div', '', 'editDiv', 'editDiv').element
    editDiv.classList.add('hide')
    editDiv.classList.add('flexColumn')
    //note title
    let displayedTitle = new SuperElement(noteDiv, 'p', notes[i].title, 'note', `${notes[i].id}-noteTitle`).element
    
    
    const displayedDesc = new SuperElement(noteDiv, 'p', notes[i].description, 'note', `${notes[i].id}-noteDesc`).element
    const displayedDate = new SuperElement(noteDiv, 'p', notes[i].dueDate, 'note', `${notes[i].id}-noteDueDate`).element
    const displayedTime = new SuperElement(noteDiv, 'p', notes[i].time, 'note', `${notes[i].id}-noteTime`).element
    const displayedPriority = new SuperElement(noteDiv, 'p', `${notes[i].priority} Priority`, 'note', `${notes[i].id}-notePriority`).element
    //removes background color of note
    if (notes[i].list != 'complete') {     
      handlePriorityColor(noteDiv, notes[i])
    }
    //checklist
    const checkListInputDiv = new SuperElement(listElement, 'div', '', 'checkListInputDiv', `checkListInputDiv-${notes[i].id}`).element
   
      const checkListDiv =  new SuperElement(listElement, 'div', '', 'checkListDiv', `checkListDiv-${notes[i].id}`).element
      // Checklist Input
      new SuperElement(checkListInputDiv, 'input', '', 'listItemInput', 'listItemInput-' + i)
      const listItemInputs = document.querySelectorAll('.listItemInput')
      const listInput = listItemInputs[i]
      if (listInput) {
        listInput.placeholder = 'Checklist Item'
      }
      // CheckList button
      const addCLBtn = new SuperElement(checkListInputDiv, 'button', 'Add Checklist Item', 'addCLBtn', 'addCLBtn-' + i).element
      addCLBtn.addEventListener('click', () => {
        addCheckList(notes[i], listInput.value)
        listInput.value = ''
        renderCheckList()
        saveToLocalStorage()
        console.log(checkListDiv.classList)
        checkListDiv.classList.remove('hide')
      })
   
    
    //edit Btn
    const editIcon = new SuperElement(noteDiv, 'img', '', 'icon', 'editIcon').element
    editIcon.src = 'images/edit_note_FILL0_wght400_GRAD0_opsz48.png'

    editIcon.addEventListener('click', () => {
    //hide p element show titleInput save and cancel btns
      noteDiv.classList.add('hide')
      editDiv.classList.remove('hide')
      renderEditNote(editDiv, i)    
    })
    //remove Btn
    const removeBtnId = `removeBtn-${notes[i].id}`
    const garbageIcon = new SuperElement(listElement, 'img', '', 'icon', removeBtnId).element
    garbageIcon.src = 'images/delete_FILL0_wght400_GRAD0_opsz48.png'
    garbageIcon.addEventListener('click', () => {
      const noteToRemove = document.getElementById(noteId)
      if (notes[i].list != 'complete') {      
      changeList(notes[i], 'complete')
      } else {
        noteToRemove.remove()
        notes.splice(i, 1)
        renderNotes()
      }
      saveToLocalStorage()
      garbageIcon.remove()
    })
  }
}

const renderNoteInputs = () => {     
  inputDiv.classList.add('hide')
  //Title input
  const titleInput = new SuperElement(inputDiv, 'input', '', 'titleInput', 'titleInput').element
  titleInput.placeholder = 'Title'
  // Description input
  const descInput = new SuperElement(inputDiv, 'input', '', 'descInput', 'descInput').element
  descInput.placeholder = 'Description'
  //Date input
  const dateInput = new SuperElement(inputDiv, 'input', '', 'dateInput', 'dateInput').element
  dateInput.placeholder = 'Date'
  //Time input
  const timeInput = new SuperElement(inputDiv, 'input', '', 'timeInput', 'timeInput').element
  timeInput.placeholder = 'Time'
  //Priority Select
  const prioritySelectDiv = new SuperElement(inputDiv, 'div', '', 'prioritySelectDiv', 'prioritySelectDiv').element
  const prioritySelectLabel = new SuperElement(prioritySelectDiv, 'label', 'Priority', 'prioritySelectLabel', 'prioritySelectLabel').element
  prioritySelectLabel.for = 'prioritySelect'
  const prioritySelect = new SuperElement(prioritySelectDiv, 'select', '', 'prioritySelect', 'prioritySelect').element  
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
  const addNoteBtn = new SuperElement(inputDiv, 'button', 'Add Note', 'addNoteBtn', 'addNoteBtn').element
  addNoteBtn.addEventListener('click', () => {
    // const noteId = `note-${Date.now()}`
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
    renderCheckList()
    saveToLocalStorage()        
    listDiv.classList.remove('blur')
    menuDiv.classList.remove('blur')
    toggleScroll()
  })
}

const renderListSelector = (parent, defaultValue) => {
  const listSelectDiv = new SuperElement(parent, 'div', 'Select List:', 'listSelectDiv', 'listSelectDiv').element
  listSelectDiv.innerHTML = ''
  const listSelectLabel = new SuperElement(listSelectDiv, 'label', '', 'listSelectLabel', 'listSelectLabel').element
  listSelectLabel.for = 'listSelectLabel'
  const listSelect = new SuperElement(listSelectDiv, 'select', '', 'listSelect', 'listSelect').element
  listSelect.name = 'listSelectLabel'
  // Create the default option
  const defaultOption = document.createElement('option')
  defaultOption.value = ''
  defaultOption.text = 'Select a List'
  listSelect.add(defaultOption)  
  const options = lists
    .filter(item => item !== 'all' && item !== 'complete') // Exclude the "all" list
    .map(item => {
      const option = document.createElement('option')
      option.value = item
      option.text = item
      return option
    })
  options.forEach(option => {
    listSelect.add(option)
  })
  // Set the default value if provided
  if (defaultValue) {
    listSelect.value = defaultValue
  }
  return listSelect
}

const renderNewListInput = (parent) => {
  //Title input
  const newListInput = new SuperElement(parent, 'input', '', 'newListInput', 'newListInput').element
  newListInput.placeholder = 'New Project'
  //Add list button
  const addListBtn = new SuperElement(parent, 'button', 'Add Project', 'addListBtn', 'addListBtn').element
  addListBtn.addEventListener('click', () => {
    createNewList(newListInput.value)        
    saveToLocalStorage()    
    renderList(lists)
    removeList()
    handleDefault()
    renderListSelector(parent)
    renderNotes()
    renderCheckList()
    renderNewListInput(menuDiv)
  })
}

const hideListNotesExcept = (displayedListId) => {
  const listOfLists = document.querySelectorAll('.list')   
  const listOfHeaders = document.querySelectorAll('.listHeader')
  console.log(displayedListId)
  for (let i = 0; i < listOfHeaders.length; i++) {
    if (displayedListId === 'all') {
      if(displayedListId === listOfHeaders[i].textContent) {
        
      }
    }
    console.log(listOfHeaders[i].textContent)
  }
  for (let i = 0; i < listOfLists.length; i++) {
    const currentList = listOfLists[i]          
    if (currentList.id === displayedListId) {
      currentList.classList.remove('hide')
      underlineToggleElement(listOfHeaders[i])
    } else if (displayedListId === 'all') {
      listOfLists[i].classList.remove('hide')
      
    } else {
      currentList.classList.add('hide')
      
    } 
  }
}
const underlineToggleElement = (el) => {
 const listHeaders = document.querySelectorAll('.listHeader')
console.log(listHeaders) 
for (let i = 0; i < listHeaders.length; i++) {
  console.log(listHeaders[i])
  if (listHeaders[i].classList.contains('underline')) {
    listHeaders[i].classList.remove('underline')
  }
}

  el.classList.add('underline')
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

const changeNote = (note, newTitle, newDescription, newDate, newTime, newPriority, newList) => {
  clearNoteEl()
  note.setTitle(newTitle)
  note.setDescription(newDescription)
  note.setDueDate(newDate)
  note.setTime(newTime)
  note.setPriority(newPriority) 
  note.setList(newList)
  renderNotes()
  return 'note changed'
}

const changeList = (note, newList) => {
  clearNoteEl()
  note.setList(newList)
  renderNotes()
}
const addCheckList = (note, listItem) => {
  note.setCheckList(listItem)
}

const renderNewNoteBtn = () => {
  const newNoteBtn = new SuperElement(containerDiv, 'button', '+', 'newNoteBtn', 'newNoteBtn').element
  newNoteBtn.addEventListener('click', () => {
    inputDiv.classList.remove('hide')
    inputDiv.classList.add('flexColumn')
    listDiv.classList.add('blur')
    menuDiv.classList.add('blur')
    toggleScroll()
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
  for (let i = 0; i < notes.length; i++) {
    const noteId = notes[i].id
    const savedCheckList = JSON.parse(localStorage.getItem(`savedCheckList-${noteId}`))
    if (JSON.stringify(notes[i].checkList) !== JSON.stringify(savedCheckList)) {
      const checkListData = notes[i].checkList.map(item => ({ item}))        
      localStorage.setItem(`savedCheckList-${noteId}`, JSON.stringify(checkListData))      
    }
  }
  // console.log(`Saved to local storage: ${savedNotes}`)
}

const loadSavedCheckList = () => {
  for (let i = 0; i < notes.length; i++) {
    const noteId = notes[i].id;
    const savedCheckList = JSON.parse(localStorage.getItem(`savedCheckList-${noteId}`))
    if (savedCheckList) {
      notes[i].checkList = savedCheckList.map(item => item.item)
    }
  }
}

const removeItemLocalStorage = (key) => {
  localStorage.removeItem(key)
}

const loadSavedLists = () => {  
  const savedLists = JSON.parse(localStorage.getItem('savedLists'))
  if (savedLists) {
    lists.length = 0; // Clear the lists array
    savedLists.forEach(item => {
      lists.push(item)
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
      )
    })
  }  
}

const clearLocalStorage = () => {
  localStorage.clear()
}

const viewHideMenu = () => {
  menuDiv.classList.add('hide')
  const menuIcon = new SuperElement(containerDiv, 'img', '', 'icon', 'menuBtn').element
  menuIcon.src = 'images/menu_FILL0_wght400_GRAD0_opsz48.png'
  menuIcon.addEventListener('click', () => {   
    openCloseMenu()
  })
}
const openCloseMenu = () => {
  menuDiv.classList.toggle('hide')
    menuDiv.classList.toggle('flexColumn')
    listDiv.classList.toggle('blur')
    toggleScroll()
}
function toggleScroll() {
 if (document.body.style.overflow != 'hidden') {
  document.body.style.overflow = 'hidden'
 } else {
  document.body.style.overflow = 'auto'
 }
}

  

const handleDefault = () => {
  const defaultBtn = new SuperElement(menuDiv, 'button', 'RESET', 'defaultBtn', 'defaultBtn').element
  defaultBtn.addEventListener('click', () => {
    clearLocalStorage()
    // Reload the current page
    location.reload()
  })
}

const removeList = () => {
  menuDiv.innerHTML = ''
  lists.forEach((list, index) => {    
    //disable remove list bts for defaults
    if (list !== 'complete' && list !== 'all' && list != 'today' && list != 'week') {
     
      const capitalList = capitalizeFirstLetter(list)
      const removeListBtn = new SuperElement(menuDiv, 'button', `Remove ${capitalList} List`, 'removeBtn', `removeListBtn${index}`).element
      removeListBtn.addEventListener('click', () => {
        const listIndex = lists.findIndex(item => item === list)
        if (listIndex !== -1) {
          lists.splice(listIndex, 1)
          saveToLocalStorage()
          renderList()
          renderListSelector(inputDiv, item)
          renderNotes()
          removeListBtn.remove()
        }
      })
    }
  })
}

const handleRemoveBtn = () => {
  //the remove btns were persistant even if the default lists had been disabled
  const dayList = document.getElementById('today')
  const weeklList = document.getElementById('week')
  //check for element
  if (!weeklList) {
    const removeListBtn1 = document.getElementById('removeListBtn2')
    removeListBtn1.remove()
  }
  if (!dayList) {
    const removeListBtn2 = document.getElementById('removeListBtn1')
    removeListBtn2.remove()
  }
}

const renderCheckList = () => {
  const noteDivs = document.getElementsByClassName('noteDiv')
  Array.from(noteDivs).forEach(noteDiv => {
    const noteId = noteDiv.id
    const checkListDiv = document.getElementById(`checkListDiv-${noteId}`)   
    checkListDiv.classList.add('boxShaddow')    
    const note = notes.find(note => note.id === noteId)
    console.log(note.checkList.length)
   
      checkListDiv.innerHTML = ''
      const checkListHeader = new SuperElement(checkListDiv, 'p', 'Checklist', 'checklistHeader', 'checklistHeader')
      const expandIcon = new SuperElement(checkListDiv, 'img', '', 'icon', 'checkListIcon').element
      expandIcon.src = 'images/expand_more_FILL0_wght400_GRAD0_opsz48.png'
        
        note.checkList.forEach((checkListItem, index) => {
        const checkListRow = new SuperElement(checkListDiv, 'div', '', 'checkListRow', `checkListRow-${noteId}`).element
        checkListRow.classList.add('flex')
        const checkBoxIcon = new SuperElement(checkListRow, 'img', '', 'icon', 'checkBoxIcon').element
        const textElement = new SuperElement(checkListRow, 'p', checkListItem.item, 'checkList', `checkList-${noteId}-${index}`).element
        checkBoxIcon.src = 'images/check_box_outline_blank_FILL0_wght400_GRAD0_opsz48.png'
        
        textElement.classList.add('hide')
        checkBoxIcon.classList.add('hide')
        expandIcon.addEventListener('click', () => {
          textElement.classList.toggle('hide')
          checkBoxIcon.classList.toggle('hide')
          expandIcon.src = 'images/expand_more_FILL0_wght400_GRAD0_opsz48.png'
          if(!textElement.classList.contains('hide')) {
            expandIcon.src = 'images/expand_less_FILL0_wght400_GRAD0_opsz48.png'
          }
        })
        checkCompleted(textElement, noteId, index, checkBoxIcon)
        checkListRow.addEventListener('click', () => {
          textElement.classList.toggle('lineThrough')
          if (textElement.classList.contains('lineThrough')) {
            checkBoxIcon.src = 'images/check_box_FILL0_wght400_GRAD0_opsz48.png'
          } else {
            checkBoxIcon.src = 'images/check_box_outline_blank_FILL0_wght400_GRAD0_opsz48.png'
          }
          
          console.log(index)
          setCheckListItemComplete(noteId, index)
          saveToLocalStorage()                   
        })  
      })
   
  })
}

const checkCompleted = (element, noteId, index, icon) => {
  const note = notes.find(note => note.id === noteId)
  if (note && index >= 0 && index < note.checkList.length) {
    if (note.checkList[index].isCompleted) {
      element.classList.add('lineThrough')
      icon.src = 'images/check_box_FILL0_wght400_GRAD0_opsz48.png'
    }
  }
}

const setCheckListItemComplete = (noteId, index) => {
  const note = notes.find(note => note.id === noteId);
  if (note && index >= 0 && index < note.checkList.length) {
    note.checkList[index].isCompleted = !note.checkList[index].isCompleted
    console.log(note.checkList[index].isCompleted)
  }
}

//style stuff
const handlePriorityColor = (el, note) => {
  if (note.priority === 'Urgent') {
    el.classList.add('reder')
  } else if (note.priority === 'High') {
    el.classList.add('redish')
  } else if (note.priority === 'Medium') {
    el.classList.add('yellowish')
  } else {
    el.classList.add('greenish')
  }
}


document.addEventListener('DOMContentLoaded', function() {  
  removeList()
  renderNoteInputs('inputDiv')  
  
  loadSavedLists()  
  renderNewListInput(menuDiv)
  
  renderList()
  hideListNotesExcept(lists[0])
  loadSavedNotes()
  renderNotes()
  viewHideMenu()
  handleDefault()
  renderNewNoteBtn()
  handleRemoveBtn()
  loadSavedCheckList()
  renderCheckList()
  
})
  
//diagnostic tools
const logCheckList = () => {
  for (let i = 0; i < notes.length; i++) {
    for (let j = 0; j < notes[i].checkList.length; j++) {       
        console.log(notes[i].checkList[j])
    }
  }
}

function handleCLick(event) {
  const clickedElement = event.target
  console.log(clickedElement)
}
document.querySelector('body').addEventListener('click', handleCLick)

