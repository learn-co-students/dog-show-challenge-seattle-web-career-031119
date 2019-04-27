document.addEventListener('DOMContentLoaded', main)
const DOGS_URL = 'http://localhost:3000/dogs'

function populateDogsTable() {
  fetch(DOGS_URL)
  .then(res => res.json())
  .then(addDogs)
}

function addDogs(dogs) {
  dogs.forEach(dog => {
    addDog(dog)
  })
}

function addDog(dog) {
  const table = document.getElementById('table-body')
  const row = document.createElement('tr')

  table.appendChild(row)

  let name = document.createElement('td')
  name.textContent = dog.name
  name.classList.add("name")

  let breed = document.createElement('td')
  breed.textContent = dog.breed
  breed.classList.add("breed")

  let sex = document.createElement('td')
  sex.textContent = dog.sex
  sex.classList.add("sex")

  let edit = document.createElement('td')
  let editButton = document.createElement('button')
  editButton.textContent = 'edit'
  editButton.addEventListener('click', () => {
    startDogEdit(dog, row)
  })
  edit.appendChild(editButton)

  appendChildren(row, name, breed, sex, edit)
}

function startDogEdit(dog, row) {
  let form = document.getElementById('dog-form')
  form.elements['name'].value = dog.name
  form.elements['breed'].value = dog.breed
  form.elements['sex'].value = dog.sex

  form.addEventListener('submit', function _func(ev) {
    editDog(dog.id, ev)
    .then( json => {
      form.removeEventListener('submit', _func)
      row.querySelector(".name").textContent = json.name
      row.querySelector(".breed").textContent = json.breed
      row.querySelector(".sex").textContent = json.sex

    })
  })
}

function editDog(id, ev) {
  ev.preventDefault()
  return fetch(DOGS_URL +'/'+id, {
    method: "PATCH",
    headers: {
      "content-type": 'application/json'
    },
    body: JSON.stringify({
      name: ev.target.elements['name'].value,
      breed: ev.target.elements['breed'].value,
      sex: ev.target.elements['sex'].value
    })
  })
  .then( res => res.json())
}

function appendChildren(target, ...args){
  args.forEach(arg => target.appendChild(arg))
}


function main() {
  populateDogsTable()
}
