function Instruction () {
	if (messages.innerHTML != "") {messages.innerHTML = ""}
	else {
		rules.forEach(function(e){
			messages.innerHTML+='<li>'+e+'</li>';
		})
	}
}