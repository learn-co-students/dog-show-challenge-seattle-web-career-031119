const DOGS_URL = "http://localhost:3000/dogs"

function getDogs(){
  fetch(DOGS_URL)
    .then( res => res.json() )
    .then( createDogs )
}

function createDogs(dogs) {
  dogs.forEach( createDog )
}

function createDog(dog) {
  let table = document.getElementById("table-body")
  let row = document.createElement("tr")
  let nameTd = document.createElement("td")
  let breedTd = document.createElement("td")
  let sexTd = document.createElement("td")
  let editTd = document.createElement("td")
  let editBtn = document.createElement("button")

  nameTd.textContent = dog.name
  breedTd.textContent = dog.breed
  sexTd.textContent = dog.sex
  editTd.align = "center"
  editBtn.textContent = "Edit"
  row.id = "dog-" + dog.id

  editBtn.addEventListener('click', () => {
    editDog(row, dog)
  })

  editTd.appendChild(editBtn)
  appendChildren(row, nameTd, breedTd, sexTd, editTd)
  table.appendChild(row)
}

function appendChildren(row, ...args) {
  args.forEach ( arg => row.appendChild(arg) )
}

function editDog(row, dog) {
  // pre-populate form
  let form = document.getElementById('dog-form')
  form.children[0].value = dog.name
  form.children[1].value = dog.breed
  form.children[2].value = dog.sex

  let inputId = document.createElement('input')
  inputId.type = "hidden"
  inputId.value = dog.id
  form.appendChild(inputId)
}

function handleSubmit(ev) {
  ev.preventDefault()
  let name = ev.target.children[0].value
  let breed = ev.target.children[1].value
  let sex = ev.target.children[2].value
  let id = ev.target.children[4].value

  fetch(DOGS_URL + '/' + id, {
    method: 'PATCH',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      name  : name,
      breed : breed,
      sex   : sex,
      id    : id
    })
  }).then( res => res.json() )
    .then( _ => updateDog(id, name, breed, sex) )
}

function updateDog(id, name, breed, sex) {
  let row = document.getElementById('dog-' + id)
  row.children[0].textContent = name
  row.children[1].textContent = breed
  row.children[2].textContent = sex
}

function main() {
  let form = document.getElementById('dog-form')
  form.addEventListener('submit', handleSubmit)
  getDogs()
}

main()
