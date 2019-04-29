document.addEventListener('DOMContentLoaded', () => {
let URL = "http://localhost:3000/dogs"
let CURRENTDOG = null
//dont need currentrow if use jank window.reload function in last .then
let CURRENTROW = null

	function getDogs() {
	fetch(URL)
		.then(res => res.json())
		.then(json => createTableDiv(json))
	}

	function createTableDiv(dogs){
		dogs.forEach(createDog)
	}

	function createDog(diggityDog){
		let table = document.getElementById('table-body')
		let row = document.createElement("tr")

		let nameTD = document.createElement("td")
		nameTD.textContent = diggityDog.name

		let breedTD = document.createElement("td")
		breedTD.textContent = diggityDog.breed

		let sexTD = document.createElement("th")
		sexTD.textContent = diggityDog.sex

		let editTD = document.createElement('td')

		let btn = document.createElement("button")
		btn.textContent = "Edit"
		btn.addEventListener( 'click', () => {
			editDog(diggityDog, row)
			//pass in diggityDog because youre passing it in before
			//pass in row because thats where its being edited
		})

		//the row appendetures matter based on structure, above doesn't
		row.appendChild(nameTD)
		row.appendChild(breedTD)
		row.appendChild(sexTD)
		row.appendChild(editTD)
		table.appendChild(row)

		table.appendChild(row)
		editTD.appendChild(btn)
	}

//give dogs ids in the form so you can grab them
	function editDog(diggityDog, row) {
		let dogForm = document.getElementById('dog-form')

		let formName = document.getElementById('form-name')
		let formBreed = document.getElementById('form-breed')
		let formSex = document.getElementById('form-sex')

//rewrite global variables
// now you can only edit one dog at a time
		CURRENTDOG = diggityDog
		CURRENTROW = row


//Sets value to dog being edited and populates field
		formName.value = diggityDog.name
		formBreed.value = diggityDog.breed
		formSex.value = diggityDog.sex
}

	function handleSubmit(ev){
		ev.preventDefault()
		fetch(URL + '/' + CURRENTDOG.id, {
			method: 'PATCH',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify ({
				name: ev.target.elements['name'].value ,
				breed: ev.target.elements['breed'].value ,
				sex: ev.target.elements['sex'].value
			})
		})
		.then(res => res.json())
		.then(_ => window.location.reload())
		}

	function main(){
		getDogs()
		//submit eventlistener action lowercase submit
		//pass in dogForm so it knows whats up
		//normally this goes in the editDog()
		//did it here because of the multiple edit issue
		let dogForm = document.getElementById('dog-form')
			dogForm.addEventListener( "submit", (ev) => {
		 	handleSubmit(ev)})
	}

	main()
})
