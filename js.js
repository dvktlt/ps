
    	$(document).ready(function(){
				
		if (localStorage.saveIt) {
			
			refreshNames(); // mame kapely, dej je do vypisu
      refreshTable();
      
			
		} else { 
			
			// jeste jsme neulozili zadnou kapelu
			
			$("#list").text("no bands yet");
			
		}
		
	});
	

	function saveName(){
	
		
		var yourName = $("#yourName").val();
		var result = $("#result").val();
		
		saveIt = JSON.parse(localStorage.getItem('saveIt'));
		    access.disabled = true;
		if (!saveIt){ 
			saveIt = JSON.parse('[]');
		}
		      
    
		
		newName = {yourName: yourName, result: result}
		
		
		saveIt.push(newName);
		
		localStorage.setItem("saveIt", JSON.stringify(saveIt));
		
    
	   document.getElementById('displayTable').style.display = 'table';
		
		refreshNames();
    refreshTable();
	}
	
	
	//aktualizuj seznam jmen
	function refreshNames(){
		var namesAsText = ""
		
		$.each(JSON.parse(localStorage.getItem('saveIt')), function(i, val) {
		  namesAsText = namesAsText + "name: "+val.yourName+", result: "+val.result+"<br>";
		});
		
		//aktualizujeme seznam jmen
		$("#list").html(namesAsText);		
	}
  
calc.onclick = function(){
    formular.result.value = +formular.question1.value+ + formular.question2.value+ + formular.question3.value+ + formular.question4.value
    + + formular.question5.value+ + formular.question6.value+ + formular.question7.value + + formular.question8.value; 
     access.disabled = false;
     calc.disabled = true;
      yourName.disabled = true;
     
	
}
reset.onclick = function(){
     access.disabled = true;
      calc.disabled = false;
      yourName.disabled = false;
     
     scroll(300,300);
     document.getElementById('displayTable').style.display = 'none';
}




function refreshTable() {
    let table = document.getElementById("list");
    table.createTHead();
    table.innerHTML = "<th>Jméno</th><th>Body</th>";
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






     