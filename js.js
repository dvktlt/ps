const formular = document.getElementById("formular");

    /*	$(document).ready(function(){
				
		if (localStorage.saveIt) {
			
			refreshNames(); 
      refreshTable();
      
			
		} else { 
			$("#list").text("no bands yet");
			
		}
		
	});
    */
    var nxtBtn = document.getElementById("nxtBtn");

    nxtBtn.addEventListener("click", checkAnswer);
	
	
	
	//aktualizuj seznam jmen
	function refreshNames(){
		var namesAsText = ""
		
		$.each(JSON.parse(localStorage.getItem('saveIt')), function(m, val) {
		  namesAsText = namesAsText + "name: "+val.yourName+", result: "+val.result+"<br>";
		});
		
		//aktualizujeme seznam jmen
		$("#list").html(namesAsText);		
	}



reset.onclick = function(){
location.reload();
     access.disabled = true;
      calc.disabled = false;
      yourName.disabled = false;
     
     scroll(300,300);
     document.getElementById('displayTable').style.display = 'none';
 
}
// json array movement variable
    var i = 0;
var correctCount = 0 ;

//initialize the first question
generate(i);
// generate from json array data with index
function generate(index) {
    document.getElementById("question").innerHTML = jsonData[index].q;
    document.getElementById("optt1").innerHTML = jsonData[index].opt1;
    document.getElementById("optt2").innerHTML = jsonData[index].opt2;
    document.getElementById("optt3").innerHTML = jsonData[index].opt3;
}

function checkAnswer(e) {
    e.preventDefault();

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
    if(jsonData.length-1 < i){
        
  		const scoreResult = document.getElementById("scoreResult");
      scoreResult.innerHTML = `****Your score is: ${correctCount}*****`;
      scoreResult.classList.toggle("scoreResultShow");

        
    }
    // callback to generate
    generate(i);
}
function saveName(){
	
		
		var yourName = $("#yourName").val() || "unknown";
		
		saveIt = JSON.parse(localStorage.getItem('saveIt'));
		    access.disabled = true;
		if (!saveIt){ 
			saveIt = JSON.parse('[]');
		}
		      
    
		
		newName = {yourName: yourName, result: correctCount}
		
		saveIt.push(newName);
		
		localStorage.setItem("saveIt", JSON.stringify(saveIt));
		
    
	   document.getElementById('displayTable').style.display = 'table';
		
		refreshNames();
    refreshTable();
	}

calc.onclick =function(){
scoreResult.innerHTML = `Your score is: ${correctCount}`;
      scoreResult.classList.toggle("scoreResultShow");
access.disabled = false;
     calc.disabled = true;
      yourName.disabled = true;

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
