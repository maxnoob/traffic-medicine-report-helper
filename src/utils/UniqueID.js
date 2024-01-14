// returns a unique ID. used to connect the labels with the input in the "Form"-components

let UUID = 0

export default function UniqueID () {
  const getID = () => {
    UUID++
    return UUID
  }

  return {
    getID
  }
}