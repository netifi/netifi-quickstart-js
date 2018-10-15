const {runHello, runPing} = require('./runner');

function addMessage(message) {
    var ul = document.getElementById('messages');
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(message));
    if(ul.childElementCount >= 10){
        ul.removeChild(ul.childNodes[0]);
    }
    ul.appendChild(li);
}

//Run the Hello Service, "as server" injected by config, false by default. Client subscriber injected
runPing(__AS_SERVER__, addMessage);
