const
    formular = document.getElementById("formular"),
    nxtBtn = document.getElementById("nxtBtn");

let
    i = 0,
    correctCount = 0;

$(document).ready(() => {
    localStorage.saveIt ?
        refreshTable() :
        document.getElementById('displayTable').style.display = 'none';
});

reset.onclick = () => location.reload();


calc.onclick = () => {
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
    if (jsonData.length - 1 < i) {

        const scoreResult = document.getElementById("scoreResult");
        scoreResult.innerHTML = `Your score is: ${correctCount}`;
        scoreResult.classList.toggle("scoreResultShow");
        nxtBtn.classList.add("hiddenClass");


    }
    // callback to generate
    generate(i);
}

//initialize the first question
generate(i);
// generate from json array data with index
function generate(index) {
    const questions = document.getElementsByClassName("questionForm");
    [].forEach.call(questions, (element, i) => {
        let currentJsonData = jsonData[index];
        element.innerHTML = currentJsonData[Object.keys(currentJsonData)[i]];
    });
}

function saveName() {

    const yourName = $("#yourName").val() || "No name";

    saveIt = JSON.parse(localStorage.getItem('saveIt')) || {};
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

function refreshTable() {
    let
        table = document.getElementById("list"),
        scores = JSON.parse(localStorage.saveIt);

    table.createTHead();
    table.innerHTML = "<th>Name</th><th>Score</th>";

    for (let pomoc in scores) {
        let
            row = table.insertRow(pomoc),
            cell2 = row.insertCell(0),
            cell3 = row.insertCell(1);

        cell2.innerText = scores[pomoc].yourName;
        cell3.innerHTML = scores[pomoc].result;
    }

}