let ws = null;
const fecha  = new Date()

addEventListener("load",()=>{
    ws = new WebSocket("ws://localhost:3000/" , "a");

    ws.onopen = function (event) {
      };
    ws.onmessage = function (event) {
        message(event.data)
    }

    ws.onclose = function (event) {
        console.log(event)

    }

    ws.onerror = function (event) {
        console.log(event)
        
    }

},false)

  
 

    


function message(msg){
            
            document.getElementById("notificaciones").innerHTML += `<p class="otros"><span class="hora horaO">${fecha.toLocaleDateString()}</span><img src="./Unknown_person.jpg" class="img-user" width="25px"/>${msg}</p>` 
    document.getElementById("notificaciones").scrollTop  = document.getElementById("notificaciones").scrollHeight
}


function doSend(msg=document.getElementById("msg").value){
            document.getElementById("notificaciones").innerHTML += `<p class="me"><span class="hora horaM">${fecha.toLocaleDateString()}</span>${msg}<img src="./Unknown_person.jpg" class="img-user" width="25px"/></p>` 
    ws.send(msg)
    document.getElementById("msg").value =""
    document.getElementById("notificaciones").scrollTop = 5
    document.getElementById("notificaciones").scrollTop  = document.getElementById("notificaciones").scrollHeight
    

}