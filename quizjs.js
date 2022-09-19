//Variables
var datos = {
    "questions": [
        {
            "question": "What is the scientific name of a butterfly?",
            "answers": [
                "Apis",
                "Coleoptera",
                "Formicidae",
                "Rhopalocera"
            ],
            "correctIndex": 3
        },
        {
            "question": "How hot is the surface of the sun?",
            "answers": [
                "1,233 K",
                "5,778 K",
                "12,130 K",
                "101,300 K"
            ],
            "correctIndex": 1
        },
        {
            "question": "Who are the actors in The Internship?",
            "answers": [
                "Ben Stiller, Jonah Hill",
                "Courteney Cox, Matt LeBlanc",
                "Kaley Cuoco, Jim Parsons",
                "Vince Vaughn, Owen Wilson"
            ],
            "correctIndex": 3
        },
        {
            "question": "What is the capital of Spain?",
            "answers": [
                "Berlin",
                "Buenos Aires",
                "Madrid",
                "San Juan"
            ],
            "correctIndex": 2
        },
        {
            "question": "What are the school colors of the University of Texas at Austin?",
            "answers": [
                "Black, Red",
                "Blue, Orange",
                "White, Burnt Orange",
                "White, Old gold, Gold"
            ],
            "correctIndex": 2
        },
        {
            "question": "What is 70 degrees Fahrenheit in Celsius?",
            "answers": [
                "18.8889",
                "20",
                "21.1111",
                "158"
            ],
            "correctIndex": 2
        },
        {
            "question": "When was Mahatma Gandhi born?",
            "answers": [
                "October 2, 1869",
                "December 15, 1872",
                "July 18, 1918",
                "January 15, 1929"
            ],
            "correctIndex": 0
        },
        {
            "question": "How far is the moon from Earth?",
            "answers": [
                "7,918 miles (12,742 km)",
                "86,881 miles (139,822 km)",
                "238,400 miles (384,400 km)",
                "35,980,000 miles (57,910,000 km)"
            ],
            "correctIndex": 2
        },
        {
            "question": "What is 65 times 52?",
            "answers": [
                "117",
                "3120",
                "3380",
                "3520"
            ],
            "correctIndex": 2
        },
        {
            "question": "How tall is Mount Everest?",
            "answers": [
                "6,683 ft (2,037 m)",
                "7,918 ft (2,413 m)",
                "19,341 ft (5,895 m)",
                "29,029 ft (8,847 m)"
            ],
            "correctIndex": 3
        },
        {
            "question": "When did The Avengers come out?",
            "answers": [
                "May 2, 2008",
                "May 4, 2012",
                "May 3, 2013",
                "April 4, 2014"
            ],
            "correctIndex": 1
        },
        {
            "question": "What is 48,879 in hexidecimal?",
            "answers": [
                "0x18C1",
                "0xBEEF",
                "0xDEAD",
                "0x12D591"
            ],
            "correctIndex": 1
        }
    ]
};

let tuPartida={
    nrespuestas:0,
    respuestas: []
}

//Funciones sesion
function iniciar() {
  
  

    let user=localStorage.getItem("usuari");

    if(user!=null && user!=""){
        document.getElementById("nombre").innerHTML="Welcome "+user;
        document.getElementById("usuari").style.display="none";
        document.getElementById("cambioUsuario").style.display="block";
        
    }
    document.getElementById("respuestasGuardadas").style.display="none";
}
function changeUser() {
    localStorage.setItem("usuari","");
    document.getElementById("nombre").style.display="none";
    document.getElementById("usuari").style.display="block";
    document.getElementById("cambioUsuario").style.display="none";
    document.getElementById("respuestasGuardadas").style.display="none";
}
function jugar() {
      
    /* fetch('http://localhost/JavaScript/Quiz/API/getPreguntes.php')
        .then((response) => response.json())
         .then((data) => console.log(data));*/

    var promise = fetch('http://localhost/JavaScript/Quiz/API/getPreguntes.php');

    var promise2 = promise.then(
        function (response){
            console.log(response);
            return response.json();
        }
    );

    promise.then(
        function(data){
            console.log(data);
            datos = data;
            //pintar el panell de preguntes
        }
    );

       /*  .then((response) =>{
            console.log(response)
            return response.json()
        } ) */
       // .then((respose) => response.json())
       // .then((data) => console.log(data));

       // .then((data) =>{
       //   console.log(data)
       //   datos = data;
       //   init_panel();
       //} );

    




    localStorage.setItem("usuari",document.getElementById("usuari").value);
    mostrarPreguntes(document.getElementById("numPreguntes").value);
}
//Funciones quiz
function renderEstado() {
    htmlStr = `<h4 class="card-title pregunta">Answer ${tuPartida.nrespuestas} / ${document.getElementById("numPreguntes").value} </h4><br>`;
    for (let i = 0; i < tuPartida.respuestas.length; i++) {
        if(tuPartida.respuestas[i]!=undefined)
        htmlStr += `<p>${i+1}. ${datos.questions[i].question} <strong>${datos.questions[i].answers[tuPartida.respuestas[i]]} </strong></p>`;
    }
    if(tuPartida.nrespuestas==document.getElementById("numPreguntes").value){
        htmlStr+='<form method="GET" action="comprova.php"><button type="submit" class="btn btn-secondary" value="Comença">Submit answers</button>';
    }
    document.getElementById("tablero").innerHTML= htmlStr;
}

function checkAnswer(pregunta, respuesta){
    if (tuPartida.respuestas[pregunta] == undefined) {
        tuPartida.nrespuestas++;
    }
    tuPartida.respuestas[pregunta]=respuesta;

    renderEstado();
}

function mostrarPreguntes(total) {
    document.getElementById("respuestasGuardadas").style.display="block";
    document.getElementById("iniciarUsuari").style.display="none";
    let titolPreguntes=`<h4 class="card-title pregunta">Answer ${tuPartida.nrespuestas} / ${document.getElementById("numPreguntes").value}</h4>`;
    let htmlStr = "<h1>Quiz</h1><br><div'>";
    for (let index = 0; index < total; index++) {
        htmlStr += `<h6>${index+1}. ${datos.questions[index].question}</h6>`;
        for (let j = 0; j < 4; j++) {
           htmlStr+=`<button type="button" style="margin: 5px"; class="btn btn-secondary custom" onclick="checkAnswer(${index},${j})" value="${j}">${datos.questions[index].answers[j]}</button>`;
           if(j==1) htmlStr+="<br>"
        }
        htmlStr+='<br><br>'
    }
    htmlStr+='</div>';
    document.getElementById("llistaPreguntes").innerHTML = htmlStr;
    document.getElementById("tablero").innerHTML=titolPreguntes;
}