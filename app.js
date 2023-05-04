"use strict";

//Funcion de calculo
let io = 0;
let eu_inst = 0;
let ctas_inst = 0;

const calculo = (ctas_max, ctas_min, eu_max, eu_min, imax, imin, inst, opt) => {
  console.log(opt);
  if (opt == 1) {
    // Opcion 1: Variable "eu_inst" y obtengo de yapa "io".
    eu_inst =
      ((eu_max - eu_min) / (ctas_max - ctas_min)) * (inst - ctas_min) + eu_min; //
    io = ((imax - imin) / (ctas_max - ctas_min)) * (inst - ctas_min) + imin;

    console.log("La PV en Unidades de Ing es " + eu_inst);
    console.log("La corriente de salida es: " + io + " mA");
    ctas_inst = inst;
    return io, eu_inst, ctas_inst;
  } else if (opt == 2) {
    io=inst;
    ctas_inst =
      ((ctas_max - ctas_min) * (inst - imin)) / (imax - imin) + ctas_min;
    eu_inst =
      ((eu_max - eu_min) / (ctas_max - ctas_min)) * (ctas_inst - ctas_min) +
      eu_min; //
    console.log("Las cuentas de salida es: " + ctas_inst + " cuentas");
    console.log("La PV en Unidades de Ing es " + eu_inst);

    return ctas_inst, eu_inst;
  } else if (opt == 3) {
    // Opcion 1: Variable "io" y obtengo de yapa "ctas_inst".

    io = ((inst - eu_min) * (imax - imin)) / (eu_max - eu_min) + imin;

    ctas_inst =
      ((ctas_max - ctas_min) * (io - imin)) / (imax - imin) + ctas_min;
    console.log("Las cuentas de salida es: " + ctas_inst + " cuentas");
    console.log("La corriente de salida es: " + io + " mA");
    eu_inst = inst;
    return io, ctas_inst, eu_inst;
  }
};

//Selecciono la unidad q elegi

let opt = 0;
function color() {
  opt = Number(document.querySelector('input[name="colors"]:checked').value);
  console.log(opt);
  return opt;
}

// preseleccion

document.getElementById("3000").addEventListener("click", () => {
  event.preventDefault();
  document.getElementById("3000").classList.add("fija");
  if (document.getElementById("1500").classList[0] == "fija") {
    document.getElementById("1500").classList.remove("fija");
  }

  let pt2 = document.querySelector(".ptC");
  let cauda2 = document.getElementById("cauda");
  if (pt2.classList[2] != "botonestado2") {
    pt2.classList.toggle("botonestado2");
  }
  if (cauda2.classList[1] == "caudaC") {
    cauda2.classList.remove("caudaC");
  }

  document.getElementById("eu_max").value = 3000;
});

document.getElementById("1500").addEventListener("click", () => {
  event.preventDefault();
  let pt2 = document.querySelector(".ptC");
  let cauda2 = document.getElementById("cauda");

  document.getElementById("1500").classList.add("fija");
  if (document.getElementById("3000").classList[0] == "fija") {
    document.getElementById("3000").classList.remove("fija");
  }

  if (pt2.classList[2] != "botonestado2") {
    pt2.classList.toggle("botonestado2");
  }
  if (cauda2.classList[1] == "caudaC") {
    cauda2.classList.remove("caudaC");
  }
  document.getElementById("eu_max").value = 1500;
});

document.getElementById("54").addEventListener("click", () => {
  event.preventDefault();
  document.getElementById("54").classList.add("fija");
  if (document.getElementById("30").classList[0] == "fija") {
    document.getElementById("30").classList.remove("fija");
  }

  let pt2 = document.querySelector(".ptC");
  let cauda = document.getElementById("cauda").classList.add("caudaC");
  //verifico si tiene la clase, si=la saco, no=no hago nada
  if (pt2.classList[2] == "botonestado2") {
    pt2.classList.remove("botonestado2");
  }

  document.getElementById("eu_max").value = 54;
});

document.getElementById("30").addEventListener("click", () => {
  event.preventDefault();
  document.getElementById("30").classList.add("fija");
  if (document.getElementById("54").classList[0] == "fija") {
    document.getElementById("54").classList.remove("fija");
  }

  let pt2 = document.querySelector(".ptC");
  let cauda = document.getElementById("cauda").classList.add("caudaC");
  //verifico si tiene la clase, si=la saco, no=no hago nada
  if (pt2.classList[2] == "botonestado2") {
    pt2.classList.remove("botonestado2");
  }

  document.getElementById("eu_max").value = 30;
});

//Envio formulario y copio valores a variables
let res = [];
let desc = [];
document.querySelector("form").addEventListener("submit", () => {
  event.preventDefault();

  let ctas_max = Number(document.getElementById("ctas_max").value);
  let ctas_min = Number(document.getElementById("ctas_min").value);
  let eu_max = Number(document.getElementById("eu_max").value);
  let eu_min = Number(document.getElementById("eu_min").value);
  let imin = Number(document.getElementById("io_min").value);
  let imax = Number(document.getElementById("io_max").value);
  let inst = Number(document.getElementById("inst").value);
  calculo(ctas_max, ctas_min, eu_max, eu_min, imax, imin, inst, opt);
  let div1 = document.createElement("div");
  let div2 = document.createElement("div");

  // desc = `Rango: ${eu_min} - ${eu_max} /  Corriente ${imin} - ${imax}  Cuentas ${ctas_max} - ${ctas_min}`;
  // div1.append(desc);

  res = `La corriente es de  = ${io} [mA] - El valor en cuentas es de = ${ctas_inst}  - El valor en unidades es de ${eu_inst} `;
  div2.append(res);

  let R = document.getElementById("resultado");
  let firstR = R.firstChild;

  R.insertBefore(div2, firstR);
  R.insertBefore(div1, div2);
});

//let inst = document.getElementById("inst").value;

//let ctas_min
// let eu_max
//let eu_min
//let inst
//let opt

const reset = () => {
  window.location.reload();
};

const getValueInput = () => {
  let prueba = document.getElementById("PRUEBA").value;
  document.querySelector(".text").innerHTML = prueba;
  console.log(prueba);
  document.getElementById("eu_max").color = red;
  return prueba;
};

//poner en el html: <p>A common form that includes input tags</p>
//<form action="getform.php" method="get">
//   <label>First name: <input type="text"></label><br>
//    <label>Last name: <input type="text"></label><br>
//       <label>E-mail: <input type="email"></label><br>
//<input type="submit" value="Submit">
//</form
