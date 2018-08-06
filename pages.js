var content = document.getElementById("info");

function loadContent(f) {
	var client = new XMLHttpRequest();
	client.open('GET', 'page/' + f + '.html');
	client.onreadystatechange = function() {
	  content.innerHTML = client.responseText;
	}
	client.send();
}