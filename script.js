

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
        setList(list) {
            note.list = note.title.push(list)
        }            
     }
 }
 const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  };

  const lists = []
  const createNewList = (name) => {
      lists.push(name)
  }
 //test variables 
 let description = 'Teeth cleaning and x-ray'
const dentistApt = createNote('Dentist', description, '11/24/23', '12:00', 'High' )
const hairApt = createNote('Hair did', 'Pubes', '11/25/23', '1:00', 'Very High' )
const welcomeArray = ['Welcome', 'The bestest todo list app', 'firstEvent.setArray(work.array)', 'renderNotes(work.array)']


//DOM stuff
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
  
//     const bodyElement = document.querySelector('body')
//     const newContainer = new SuperElement(bodyElement, 'div', '', 'container', 'container')
//     const containerDiv = document.getElementById('container')


 
//  let generalList = createNewList('general')


//  let displayedList
//  const renderList = (array) => {
//     new SuperElement(containerDiv, 'div', '', 'listDiv', 'listDiv');
//     const listDiv = document.getElementById('listDiv');
//     let displayedList = null;
  
//     array.map(item => {
//       let capitalName = capitalizeFirstLetter(item);
//       const listHeaderId = item.toLowerCase() + 'Header';
//       let listHeader = document.getElementById(listHeaderId);
  
//       if (!listHeader) {
//         new SuperElement(listDiv, 'div', capitalName, 'listHeader', listHeaderId);
//         new SuperElement(listDiv, 'div', '', 'list', item);
//         listHeader = document.getElementById(listHeaderId);
//       }
  
//       listHeader.addEventListener('click', () => {
//         displayedList = listHeader.id; // Assign the ID of the clicked list header
//         hideListNotesExcept(displayedList);
//       });
//     });
  
//     return displayedList;
//   };
  
  


   

// const renderNotes = (notes, parent, callback) => {
//     const noteId = `note-${Date.now()}`
//     const noteDiv = new SuperElement(parent, 'div', '', 'noteDiv', noteId)        
//     for (let i = 0; i < notes.length; i++) {
//       new SuperElement(noteDiv.el, 'p', notes[i], 'note', '')
//     }    
//     const removeBtn = new SuperElement(parent, 'button', 'X', 'removeBtn', noteId)
//     removeBtn.el.addEventListener('click', () => {
//       console.log('remove')
//       const noteToRemove = document.getElementById(noteId);
//       if (noteToRemove) {
//         noteToRemove.remove()
//       }
//       removeBtn.el.remove()
//     });
    
//     if (typeof callback === 'function') {
//       callback(); // Execute the callback function if provided
//     }
//   }
               
// const renderNoteInputs = () => {
//     new SuperElement(containerDiv, 'div', '', 'inputDiv', 'inputDiv')
//     const inputDiv = document.getElementById('inputDiv')
//     inputDiv.classList.add('flexColumn')
//         //Title input
//         new SuperElement(inputDiv, 'input', '', 'titleInput', 'titleInput')
//         const titleInput = document.getElementById('titleInput')
//         titleInput.placeholder = 'Title'
//         // Description input
//         new SuperElement(inputDiv, 'input', '', 'descInput', 'descInput')
//         const descInput = document.getElementById('descInput')
//         descInput.placeholder = 'Description'
//         //Date input
//         new SuperElement(inputDiv, 'input', '', 'dateInput', 'dateInput')
//         const dateInput = document.getElementById('dateInput')
//         dateInput.placeholder = 'Date'
//         //Time input
//         new SuperElement(inputDiv, 'input', '', 'timeInput', 'timeInput')
//         const timeInput = document.getElementById('timeInput')
//         timeInput.placeholder = 'Time'
//         //Priority Select
//         new SuperElement(inputDiv, 'label', 'Priority', 'prioritySelectLabel', 'prioritySelectLabel')
//         const prioritySelectLabel = document.getElementById('prioritySelectLabel')
//         prioritySelectLabel.for = 'prioritySelect'
//         new SuperElement(inputDiv, 'select', '', 'prioritySelect', 'prioritySelect')
//         const prioritySelect = document.getElementById('prioritySelect')   
//         prioritySelect.name = 'prioritySelectLabel'    
//         // Create option elements and set their values
//         const lowOption = document.createElement('option')
//             lowOption.value = 'Low'
//             lowOption.text = 'Low'

//         const mediumOption = document.createElement('option')
//             mediumOption.value = 'Medium'
//             mediumOption.text = 'Medium'

//         const highOption = document.createElement('option')
//             highOption.value = 'High'
//             highOption.text = 'High'

//         const urgentOption = document.createElement('option')
//             urgentOption.value = 'Urgent'
//             urgentOption.text = 'Urgent'
//         // Append the option elements to the select element
//         prioritySelect.add(lowOption)
//         prioritySelect.add(mediumOption)
//         prioritySelect.add(highOption)
//         prioritySelect.add(urgentOption)

//         new SuperElement(inputDiv, 'button', 'Add Note', 'addNoteBtn', 'addNoteBtn')
//         const addNoteBtn = document.getElementById('addNoteBtn')
//         addNoteBtn.addEventListener('click', () => {
//             const newNote = createNote(titleInput.value, descInput.value, dateInput.value, timeInput.value, prioritySelect.value, )
//             console.log(displayedList)
//             console.log(defaultList)
//             if (displayedList === undefined) {
//                 console.log(defaultList)
//                 displayedList = defaultList
//             }
//             console.log(displayedList)
//             renderNotes(newNote.note.array, general, () => {
//                 console.log(displayedList)
//             })       
//         })
// }

// const renderNewListInput = () => {
//     //Title input
//     new SuperElement(inputDiv, 'input', '', 'newListInput', 'newListInput')
//     const newListInput = document.getElementById('newListInput')
//     newListInput.placeholder = 'New List'
//     //Add list button
//     new SuperElement(inputDiv, 'button', 'Add List', 'addListBtn', 'addListBtn')
//         const addListBtn = document.getElementById('addListBtn')
//         addListBtn.addEventListener('click', () => {
//             const newList = createNewList(newListInput.value)            
//             console.log(newList)
//             renderList(lists)
//         })
// }

// const hideListNotesExcept = (displayedListId) => {
//     const listOfLists = document.querySelectorAll('.list')   
//     for (let i = 0; i < listOfLists.length; i++) {
//       const currentList = listOfLists[i]      
//       if (currentList.id === displayedListId) {
//         currentList.classList.remove('hide')
//       } else {
//         currentList.classList.add('hide')
//       }
//     }
//   };
//   console.log(displayedList)
//   let defaultList = lists[0]
//   console.log(defaultList)
//   renderNoteInputs()
//   renderNewListInput()
//   document.addEventListener('DOMContentLoaded', function() {
//     renderList(lists);
//     hideListNotesExcept(displayedList);
 
//     const parentElement = document.getElementById(displayedList);
//     if (parentElement) {
//       renderNotes(hairApt.note.array, parentElement, () => {
//         console.log(`note rendered ${displayedList}`);
//       });
//     } else {
//       console.log(`Parent element '${displayedList}' does not exist.`);
//     }
//   });
  
  
  


