// makes a "Form"-components persist in the localStorage to make it refresh proof
// use this function in the mounted hook
// needs var and string version to function

export default function persistToLocalStorage (componentVar, componentString) {
  
if (!localStorage.getItem(componentString)) {
    localStorage.setItem(componentString, JSON.stringify(componentVar.value))
  }

  componentVar.value =
  JSON.parse(localStorage.getItem(componentString)) ||
  JSON.stringify(this.componentVar.value)
}

