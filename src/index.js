const dogsURL = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', () => {

  function getDogs() {
    fetch(dogsURL)
    .then(res => res.json())
    .then(json => displayDogs(json))
  }

  function displayDogs(dogs) {
    dogs.forEach(dog => addDog(dog))
  }

  function addDog(dog) {
    let tableBody = document.getElementById('table-body')

    let newDogTr = document.createElement('tr')

    let dogNameTd = document.createElement('td')
    dogNameTd.textContent = dog.name

    let dogBreedTd = document.createElement('td')
    dogBreedTd.textContent = dog.breed

    let dogSexTd = document.createElement('td')
    dogSexTd.textContent = dog.sex

    let dogEditTd = document.createElement('td')
    dogEditTd.classList.add('center')
    let editButton = document.createElement('button')
    editButton.textContent = 'Edit'
    editButton.addEventListener('click', () => {
      editDog(dog)
    })

    newDogTr.appendChild(dogNameTd)
    newDogTr.appendChild(dogBreedTd)
    newDogTr.appendChild(dogSexTd)
    dogEditTd.appendChild(editButton)
    newDogTr.appendChild(dogEditTd)

    tableBody.appendChild(newDogTr)
  }

  function editDog(dog) {
    let dogForm = document.getElementById('dog-form')

    let formName = document.getElementById('input-name')
    formName.value = dog.name
    let formSex = document.getElementById('input-sex')
    formSex.value = dog.sex
    let formBreed = document.getElementById('input-breed')
    formBreed.value = dog.breed

    dogForm.addEventListener('submit', (ev) => {
      handleEdit(ev, dog.id)
    })
  }

  function handleEdit(ev, dogId) {
    ev.preventDefault()
    let name = ev.target.elements['name'].value
    let breed = ev.target.elements['breed'].value
    let sex = ev.target.elements['sex'].value

    saveEdit(name, breed, sex, dogId)


  }

  function saveEdit (name, breed, sex, dogId) {
    return fetch('http://localhost:3000/dogs/' + dogId, {
      method: "PATCH",
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
    .then(ret => ret.json())
    .then(_ => window.location.reload())
  }

  function main() {
    getDogs()
  }

  main()

})
