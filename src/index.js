const DOG_URL = 'http://localhost:3000/dogs'
let THE_DOG = null
let THE_ROW = null

document.addEventListener('DOMContentLoaded', () => {

  loadDogs()

})

  function loadDogs () {
    fetch (DOG_URL)
      .then (res => res.json())
      .then (dogs => {
        console.log('dogs:', dogs)
        displayDogs(dogs)
      })
  }

  function displayDogs(dogs) {
    dogs.forEach((dog) => {
      addDogToPage(dog)
    })
  }

  function addDogToPage(dog) {
    const table = document.getElementById("table-body")
    const row = document.createElement('tr')

    const name = document.createElement('td')
    const breed = document.createElement('td')
    const sex = document.createElement('td')
    const edit = document.createElement('td')

    name.textContent = dog.name
    breed.textContent = dog.breed
    sex.textContent = dog.sex

    const button = document.createElement('button')
    button.textContent = 'Edit Dog'

    row.appendChild(name)
    row.appendChild(breed)
    row.appendChild(sex)
    row.appendChild(edit)
    edit.appendChild(button)
    table.appendChild(row)

    button.addEventListener('click', () => {
      populateEditForm(dog,row)
    })

  }

  function populateEditForm(dog, row) {
    const form = document.getElementById('dog-form')
    THE_DOG = dog
    THE_ROW = row
    form.addEventListener('submit', (ev) => {
        handleSubmit(ev)
    })

    form.elements['name'].value = dog.name
    form.elements['breed'].value = dog.breed
    form.elements['sex'].value = dog.sex
  }

  function handleSubmit(ev) {
    ev.preventDefault()

    fetch(DOG_URL + '/' + THE_DOG.id, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: ev.target.elements['name'].value,
        breed: ev.target.elements['breed'].value,
        sex: ev.target.elements['sex'].value
      })
    })
    .then(res => res.json)
    .then(json => {
      updateRow(ev)
    })
  }

  function updateRow(ev) {
    let tds = document.getElementsByTagName('td')
    tds[0].textContent = ev.target.elements['name'].value
    tds[1].textContent = ev.target.elements['breed'].value
    tds[2].textContent = ev.target.elements['sex'].value
  }
