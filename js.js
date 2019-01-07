const
    formular = document.getElementById("formular"),
    nxtBtn = document.getElementById("nxtBtn");

let
    i = 0,
    correctCount = 0;

$(document).ready(function(){
				
		if (localStorage.saveIt) {
			
			 
      refreshTable();
      
			
		} else { 
			$("#list").text("no bands yet");
			
		}
		
	});
reset.onclick = () => location.reload();


calc.onclick = function(){ 
scoreResult.innerHTML = `Your score is: ${correctCount}`; 
//scoreResult.classList.toggle("scoreResultShow"); 
access.disabled = false; 
calc.disabled = true; 
yourName.disabled = true; 

}
nxtBtn.onclick = () => {

    if (document.getElementById("opt1").checked && jsonData[i].opt1 == jsonData[i].answer) {
        correctCount++;
    }
    if (document.getElementById("opt2").checked && jsonData[i].opt2 == jsonData[i].answer) {
        correctCount++;
    }
    if (document.getElementById("opt3").checked && jsonData[i].opt3 == jsonData[i].answer) {
        correctCount++;
    }
    // increment i for next question
    i++;
    if (jsonData.length - 1  < i) {

                nxtBtn.value = "Finish";
		document.getElementsByClassName("lftCss")[0].addEventListener("click", vis);


    }
    // callback to generate

    generate(i);
}
function vis(){

document.getElementsByClassName("lftCss")[0].style.display='none';
}

//initialize the first question
generate(i);
// generate from json array data with index
function generate(index) {
document.getElementById("question").innerHTML = jsonData[index].q;
document.getElementById("optt1").innerHTML = jsonData[index].opt1;
document.getElementById("optt2").innerHTML = jsonData[index].opt2;
document.getElementById("optt3").innerHTML = jsonData[index].opt3;
}
function saveName() {

    const yourName = $("#yourName").val() || "No name";

    saveIt = JSON.parse(localStorage.getItem('saveIt')) || [];
    access.disabled = true;

    newName = {
        yourName: yourName,
        result: correctCount
    }

    saveIt.push(newName);

    localStorage.setItem("saveIt", JSON.stringify(saveIt));

    document.getElementById('displayTable').style.display = 'table';

    refreshTable();
}
submitName.onclick = function() 
{ 
document.getElementById("yourName").style.display='none'; 
document.getElementById("submitName").style.display='none'; 
document.getElementsByClassName("qPanel")[0].style.visibility= 'visible'; 
document.getElementById("calc").style.visibility='visible'; 
document.getElementById("reset").style.visibility='visible'; 
document.getElementById("access").style.visibility='visible'; 
}

function refreshTable() {
    let table = document.getElementById("list");
    table.createTHead();
    table.innerHTML = "<th>Name</th><th>Score</th>";
    let scores = JSON.parse(localStorage.saveIt);
    let rowNumber = 1;
    for (let pomoc in scores) {
        let row = table.insertRow(rowNumber);
        let cell2 = row.insertCell(0);
        let cell3 = row.insertCell(1);

        cell2.innerText = scores[pomoc].yourName;
        cell3.innerHTML = scores[pomoc].result;

        rowNumber++;
    }
}
 document.getElementById('displayTable').style.display = 'none';
