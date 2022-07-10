let ws = null;
const fecha  = new Date()
const mensajes = document.getElementById("notificaciones")

addEventListener("load",()=>{
    ws = new WebSocket("wss://chat-ws-j.herokuapp.com/" , "a");

    ws.onopen = function (event) {
        console.log(event)
        message("se ha conectado")

      };
    ws.onmessage = function (event) {
        const data = JSON.parse(event.data)
        if(data.pc){
            for(let i = 0 ; i < data.texto.length ; i++ ){
                message(data.texto[i])

            }
        }else{
            message(data.texto[data.texto.length - 1])
        }
    }

    ws.onclose = function (event) {
        console.log(event)

    }

    ws.onerror = function (event) {
        console.log(event)
        
    }

},false)

  
 

    


function message(msg){
    const p = document.createElement("p")
    const span = document.createElement("span")
    const sMsg = document.createElement("span")
    const img = document.createElement("img")
    sMsg.classList.add("msgB")
    p.classList.add("otros")
    span.classList.add("hora")
    span.classList.add("horaO")
    img.classList.add("img-user")
    span.textContent = fecha.toLocaleDateString()
    img.src = "./Unknown_person.jpg"
    p.appendChild(img)
    sMsg.textContent = msg
    p.appendChild(sMsg)
    p.appendChild(span)
    mensajes.appendChild(p)
    //mensajes.innerHTML += `<p class="otros"><span class="hora horaO">${fecha.toLocaleDateString()}</span><img src="./Unknown_person.jpg" class="img-user" width="25px"/>${msg.toString()}</p>` 
    mensajes.scrollTop  = mensajes.scrollHeight
}


function doSend(msg=document.getElementById("msg").value){
    if(msg===""){
        return;
    }
    const p = document.createElement("p")
    const span = document.createElement("span")
    const img = document.createElement("img")
    p.classList.add("me")
    span.classList.add("hora")
    span.classList.add("horaM")
    img.classList.add("img-user")
    span.textContent = fecha.toLocaleDateString()
    img.src = "./Unknown_person.jpg"
    p.textContent = msg
    p.appendChild(span)
    p.appendChild(img)
    mensajes.appendChild(p)
   // mensajes.innerHTML += `<p class="me"><span class="hora horaM">${fecha.toLocaleDateString()}</span>${msg.toString()}<img src="./Unknown_person.jpg" class="img-user" width="25px"/></p>` 
    ws.send(msg, idx=0)
    document.getElementById("msg").value =""
    mensajes.scrollTop = 5
    mensajes.scrollTop  = mensajes.scrollHeight
    

}