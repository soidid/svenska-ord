'use strict'
var lesson = window.location.pathname.split('.html')[0].split('/')[1]
if(lesson === "svenska-ord")
	lesson = window.location.pathname.split('.html')[0].split('/')[2]

if(lesson === "index" || !lesson)
	lesson = 1;

var lesson_n = document.querySelector("#lesson");
var lesson_t = document.createTextNode("Page "+lesson)
lesson_n.appendChild(lesson_t)

var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", './json/'+lesson+'.json', false ); // false for synchronous request
xmlHttp.send( null );
var json = JSON.parse(xmlHttp.responseText);

var content = document.querySelector("#content");
json.map(d=>{
	var node = document.createElement("div")
	node.classList.add('node')

	var title = document.createElement("div")
	title.classList.add("title")
	node.appendChild(title)

	var swedish = document.createElement("h2")
	swedish.classList.add("swedish")
	var swedish_t = document.createTextNode(d.vocabulary)
	swedish.appendChild(swedish_t)
	title.appendChild(swedish)

	var phonetic = document.createElement("div")
	phonetic.classList.add("phonetic")
	var phonetic_t = document.createTextNode(d.phonetic)
	phonetic.appendChild(phonetic_t)
	title.appendChild(phonetic)

	var audio = document.createElement("audio")
	audio.setAttribute("controls", true)
	var source = document.createElement("source")
	source.setAttribute("src", d.audio)
	audio.appendChild(source)
	node.appendChild(audio)

	var meaning = document.createElement("div")
	var meaning_t = document.createTextNode(d.meaning)
	meaning.appendChild(meaning_t)
	meaning.classList.add("meaning")
	node.appendChild(meaning)

	content.appendChild(node)
})

function toggle(){
	var nav = document.querySelector('#nav')
	nav.classList.toggle("visible")
}
