/*Una empresa Aseguradora requiere un programa para el control de sus pólizas. 

Cada póliza posee un número de identificación único, monto a asegurar y el porcentaje de cobertura.

El monto a pagar por las pólizas de Vida depende la edad del cliente: 

menores de 18 años la póliza es el 5% del monto a asegurar, caso contrario el 10%. 

Para los vehículos, el monto a pagar por la póliza es el 7% si el año es menor que el 2000, y el
12% en otros casos. 

Mostrar el Monto a Pagar por cada Póliza y por la Aseguradora el
Promedio de Monto Pagado*/


class Cl_Polizas
{
  constructor(nIdentificacion, montAsegurar,porcCobertura)
  {
    this.nIdentificacion=nIdentificacion;
    this.montAsegurar=montAsegurar;
    this.porcCobertura=porcCobertura;
  }
  tPagar()
  {
    return this.montAsegurar;
  }
};

class Cl_PolizaDeVida extends Cl_Polizas
{
  constructor(nIdentificacion,montAsegurar,porcCobertura,edad)
  {
  super(nIdentificacion,montAsegurar,porcCobertura)
  this.edad=edad;
  }

  tPagar()
  {
    if(this.edad<18)
    {
      return this.montAsegurar*0.05
    }else{return this.montAsegurar*0.1}
  }
}

class Cl_PolizaVehiculo extends Cl_Polizas
{
  constructor(nIdentificacion, montAsegurar,porcCobertura,año)
  {
    super(nIdentificacion, montAsegurar,porcCobertura)
    this.año=año;
  }

  tPagar()
  {
    if(this.año<2000)
    {
      return this.montAsegurar*0.07
    }else{return this.montAsegurar*0.12}
  }
}

class cl_Aseguradora
{
  constructor()
  {
    this.acumPagar=0;
    this.contPolizas=0
    this.contPolizaVida=0;
    this.contPolizaVehiculo=0;
  }

  procesarPolizas(p)
  {
    this.acumPagar+=p.tPagar();
    this.contPolizas++

    if(p.edad!==null && p.edad !== undefined)
    {
      this.contPolizaVida++
    }
    if(p.año!==null && p.año !== undefined)
    {
      this.contPolizaVehiculo++
    }
  }

  calcPromedio()
  {
    return this.acumPagar/this.contPolizas
  }
}

const ase = new cl_Aseguradora
const salida = document.getElementById("app");

const formulario=document.querySelector("#F1")

formulario.addEventListener("submit",procesarPoliza)

function procesarPoliza(event)
{
  event.preventDefault();
  const nIdentificacion = document.getElementById("nIdentificacion").value;
  const montAsegurar = document.getElementById("montAsegurar").value;
  const porcCobertura = document.getElementById("porcCobertura").value;
  const edad = document.getElementById("edad").value;
  const año = document.getElementById("año").value;

  let p;

  if(nIdentificacion=="" || montAsegurar=="" || porcCobertura=="" )
  {
    alert("Introduzca los datos solicitados")
  }
  
  if(edad!=="")
  {
  p = new Cl_PolizaDeVida(nIdentificacion,montAsegurar,porcCobertura,edad);
  }
  else
  {
  p = new Cl_PolizaVehiculo(nIdentificacion,montAsegurar,porcCobertura,año)
  }

  if(edad !=="" && año!=="")
  {
    alert("Si la poliza es de vida ingrese solo la edad \nSi la poliza es de vehiculo ingese solo el año")
    return;
  }

  ase.procesarPolizas(p)
  salida.innerHTML += "<b>RESULTADOS";
  salida.innerHTML += `<br>El precio a pagar por poliza ${p.nIdentificacion} es: ${Number(p.tPagar().toFixed(2))}`  
  salida.innerHTML += `<br>El total de polizas de vidas procesadas es: ${ase.contPolizaVida}`  
  salida.innerHTML += `<br>El total de polizas de vehiculos procesadas es: ${ase.contPolizaVehiculo}`  
  salida.innerHTML += `<br>El total de polizas procesadas es: ${ase.contPolizas}`  
  salida.innerHTML += `<br>El promedio es: ${Number(ase.calcPromedio().toFixed(2))}<br><br>`  

  formulario.reset()
}



