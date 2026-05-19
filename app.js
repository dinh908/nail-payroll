let tickets=
JSON.parse(
localStorage.getItem(
"tickets"
)
)||[];


let editIndex=null;


function showTab(tab){

document
.getElementById(
"tickets"
)
.style.display=
tab=="tickets"
?"block":"none";


document
.getElementById(
"payroll"
)
.style.display=
tab=="payroll"
?"block":"none";

}


function quickFill(name){

document
.getElementById(
"service"
)
.value=name;

}


function saveTicket(){

let service=
document
.getElementById(
"service"
).value;

let amount=
parseFloat(
document
.getElementById(
"amount"
).value
)||0;

let tip=
parseFloat(
document
.getElementById(
"tip"
).value
)||0;


let date=
document
.getElementById(
"date"
).value;


let now=
new Date()
.toLocaleString();


let obj={

service,
amount,
tip,
date,
created:now

};


if(editIndex===null){

tickets.push(obj);

}

else{

tickets[editIndex]=obj;

editIndex=null;

}


localStorage
.setItem(
"tickets",
JSON.stringify(
tickets
)
);

clearInputs();

render();

}


function clearInputs(){

service.value="";
amount.value="";
tip.value="";
date.value="";

}


function render(){

let list=
document
.getElementById(
"ticketList"
);

list.innerHTML="";


let totalService=0;

let totalTip=0;

let workDays=
new Set();


tickets.forEach(

(t,index)=>{

totalService+=
t.amount;

totalTip+=
t.tip;

workDays
.add(
t.date
);

list.innerHTML+=`

<div
class="ticket"
onclick=
"editTicket(${index})">

<b>
${t.service}
</b>

<br>

$${t.amount}

+

Tip
$${t.tip}

<br>

${t.created}

</div>

`;

}

);


document
.getElementById(
"totalService"
)
.innerText=
"$"+
totalService
.toFixed(2);


document
.getElementById(
"totalTip"
)
.innerText=
"$"+
totalTip
.toFixed(2);


let profit=
totalService
*.55;


document
.getElementById(
"profit"
)
.innerText=
"$"+
profit
.toFixed(2);


document
.getElementById(
"paid"
)
.innerText=
"$"+
(
profit+
totalTip
)
.toFixed(2);


document
.getElementById(
"days"
)
.innerText=
workDays.size;

}


function editTicket(index){

let t=
tickets[index];

service.value=
t.service;

amount.value=
t.amount;

tip.value=
t.tip;

date.value=
t.date;

editIndex=index;

}


render();
