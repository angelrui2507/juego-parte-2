let cartasDestapadas = 0;
let temporizador = false;
let pares = 0;
let timerInicial = 40;
let timer = 40;
let puntaje = 0;
let movimientos = 0;
let mostrarTiempo = document.getElementById('restante');
let mostrarPuntaje = document.getElementById('puntaje');
let mostrarMovimientos = document.getElementById('movimientos');

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(function(){return Math.random() - 0.3})

function contarTiempo(){
  tiempoRegresivo = setInterval(() => {
    mostrarTiempo.innerHTML = `Tiempo restante: ${timer} segundos`;
    timer--;
    if(timer < 0){
      clearInterval(tiempoRegresivo);
      bloquearTarjetas(numeros);
    }
  }, 1000, timer); 
}

function bloquearTarjetas(numeros){
  for(let i = 0; i<=15; i++){
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = numeros[i];
    tarjetaBloqueada.disabled = true;
  }
}

function girar(id){

  if (temporizador == false){
    contarTiempo();
    temporizador = true;
  }
  
  if (cartasDestapadas == 0){
    //Mostrar número
    let card1 = document.getElementById(id);   
    primeraEleccion = numeros[id]; 
    card1.innerHTML = primeraEleccion;
    //Deshabilitar botón
    card1.disabled = true;
    cartasDestapadas++;

    
    primerId = id;

  }else if (cartasDestapadas == 1){
    //Mostrar número
    let card2 = document.getElementById(id);
    segundaEleccion = numeros[id];
    card2.innerHTML = segundaEleccion;
    //Deshabilitar botón
    card2.disabled = true;
    cartasDestapadas++;

    
    segundoId = id;
    
    
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;


    if(primeraEleccion == segundaEleccion){
      cartasDestapadas = 0;
      pares++;
      puntaje++;
      mostrarPuntaje.innerHTML = `Puntaje: ${puntaje}`;
    }else{

      setTimeout(()=>{
        card1 = document.getElementById(primerId);
        card2 = document.getElementById(segundoId);
        card1.innerHTML = ' ';
        card2.innerHTML = ' ';
        card1.disabled = false;
        card2.disabled = false; 
        cartasDestapadas = 0;
      },500)
      
    }
  }
  
  if (pares == 8){
    clearInterval(tiempoRegresivo);
    mostrarTiempo.innerHTML = `Fantastico! 🎉 Sólo demoraste ${timerInicial - timer - 1} segundos`;
    mostrarPuntaje.innerHTML = `Puntaje: ${puntaje} 😱`;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🤟‍‍😎`;
  }
}