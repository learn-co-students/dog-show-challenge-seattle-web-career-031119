

const DOGS_URL = "http://localhost:3000/dogs"
const tableBody = document.getElementById('table-body')
const form = document.getElementById('dog-form')


document.addEventListener('DOMContentLoaded', () => {
  fetch(DOGS_URL)
  .then(res => res.json())
  .then(json => displayDogs(json))
})

function displayDogs(json) {
  json.forEach( (dog) => {
    const tr = document.createElement('tr')
    tableBody.appendChild(tr)

    const tdName = document.createElement('td')
    tdName.setAttribute('data-id', dog.id)
    tdName.setAttribute('name', 'name')
    tdName.textContent = dog.name
    tr.appendChild(tdName)

    const tdBreed = document.createElement('td')
    tdBreed.setAttribute('name', 'breed')
    tdBreed.textContent = dog.breed
    tr.appendChild(tdBreed)

    const tdSex = document.createElement('td')
    tdSex.setAttribute('name', 'sex')
    tdSex.textContent = dog.sex
    tr.appendChild(tdSex)

    const editButton = document.createElement('button')
    editButton.textContent = "Edit Dog"
    editButton.addEventListener('click', () => editForm(tr))
    tr.appendChild(editButton)
  })
}


function editForm(tr) {
  form.name.value = tr.children['name'].textContent
  form.breed.value = tr.children['breed'].textContent
  form.sex.value = tr.children['sex'].textContent


  const id = tr.children['name'].getAttribute('data-id')


  form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    handleSubmit(id, ev.target.name.value, ev.target.breed.value, ev.target.sex.value)
    .then(json => {
      tr.children['name'].textContent = json.name
      tr.children['breed'].textContent = json.breed
      tr.children['sex'].textContent = json.sex
    })

  })
}

function handleSubmit(id, name, breed, sex) {
  return fetch("http://localhost:3000/dogs/" + id, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      breed: breed,
      sex: sex
    })
  })
  .then(res => res.json())
}
