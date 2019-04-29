const DOGS_URL = "http://localhost:3000/dogs"
let CURRENT_DOG = null
let CURRENT_ROW = null

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('dog-form')
  form.addEventListener('submit', handleSubmit)

  function getDogs() {
    fetch(DOGS_URL)
      .then(res => res.json())
      .then(dogs => displayDogs(dogs))
  }

  function displayDogs(dogs) {
    dogs.forEach((dog) => {
      putDog(dog)
    })
  }

  function putDog(dog) {
    const table = document.getElementById('table-body')
    const row = document.createElement('tr')
    const name = document.createElement('td')
    const breed = document.createElement('td')
    const sex = document.createElement('td')
    const edit = document.createElement('td')
    const button = document.createElement('button')

    name.textContent = dog.name
    breed.textContent = dog.breed
    sex.textContent = dog.sex
    button.textContent = 'Edit Dog'
    button.addEventListener('click', () => {
      editDog(dog, row)
    })
    edit.appendChild(button)
    row.appendChild(name)
    row.appendChild(breed)
    row.appendChild(sex)
    row.appendChild(edit)
    table.appendChild(row)
  }

  function editDog(dog, row) {
    const form = document.getElementById('dog-form')
    console.log('dog:', dog)
    console.log('row:', row)
    CURRENT_DOG = dog
    CURRENT_ROW = row

    form.elements.name.value = dog.name
    form.elements.breed.value = dog.breed
    form.elements.sex.value = dog.sex
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    fetch(DOGS_URL + '/' + CURRENT_DOG.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: ev.target.elements['name'].value,
        breed: ev.target.elements['breed'].value,
        sex: ev.target.elements['sex'].value
      })
    })
    .then(res => res.json())
    .then(json => {
      refreshDog(ev)
    })
  }

  function refreshDog(ev){
    let tds = CURRENT_ROW.getElementsByTagName('td')
    tds[0].textContent = ev.target.elements['name'].value
    tds[1].textContent = ev.target.elements['breed'].value
    tds[2].textContent = ev.target.elements['sex'].value
  }

  getDogs();

})
