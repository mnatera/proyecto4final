import React, { useState } from "react";

import { AgregarContacto, AgregarCanal } from "../../Front/Consulta";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faPlus,
  faTrash,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

let isOpen = true;
function CanalesList(props) {
  const [Mostrar, setMostrar] = useState([]);
  const [Registros, setRegistros] = useState(0);

  const OptContacto = [
    <option key={0} value={0} disabled>
      Seleccione Un Canal
    </option>,
    <option key={1} value={1}>
      Teléfono
    </option>,
    <option key={2} value={2}>
      Whatsapp
    </option>,
    <option key={3} value={3}>
      Instagram
    </option>,
    <option key={4} value={4}>
      Facebook
    </option>,
    <option key={5} value={5}>
      Linkedin
    </option>,
  ];

  const Contacto = [
    "Seleccione Un Canal",
    "Teléfono",
    "Whatsapp",
    "Instagram",
    "Facebook",
    "Linkedin",
  ];

  const OptPreferencia = [
    <option key={0} value={0} disabled>
      Seleccione Una Preferencia
    </option>,
    <option key={1} value={1}>
      Sin preferencia
    </option>,
    <option key={2} value={2}>
      Canal favorito
    </option>,
    <option key={3} value={3}>
      No molestar
    </option>,
  ];

  const Preferencia = [
    "Seleccione Una Preferencia",
    "Sin preferencia",
    "Canal favorito",
    "No molestar",
  ];

  function AgregarCanalFormulario(e) {
    e.preventDefault();

    var elemento;
    switch (e.target.nodeName) {
      case "BUTTON":
        if (isOpen) {
          const ruta = e.nativeEvent.path[4];

          if (
            ruta[10].selectedOptions[0].value !== "0" &&
            ruta[11].value !== "" &&
            ruta[12].selectedOptions[0].value !== "0"
          ) {
            const BaseBody = {
              Canal: parseInt(ruta[10].selectedOptions[0].value),
              Cuenta: ruta[11].value,
              Preferencia: parseInt(ruta[12].selectedOptions[0].value),
            };
            cargar(BaseBody);
          } else {
            console.log("verifica bien");
          }
        } else {
          console.log("Primero dar click en Guardar Cambios");
        }
        document.querySelector(".TxtCanalcontacto").selectedIndex = 0;
        document.querySelector(".TxtCuentaUsuario").value = "";
        document.querySelector(".TxtPreferencias").selectedIndex = 0;
        break;

      case "path":
        elemento = document.getElementById("BtnAgregar");
        elemento.click();
        break;

      case "svg":
        elemento = document.getElementById("BtnAgregar");
        elemento.click();
        break;

      default:
        break;
    }
  }

  const pen = <FontAwesomeIcon icon={faPen} />;
  const trash = <FontAwesomeIcon icon={faTrash} />;
  const save = <FontAwesomeIcon icon={faSave} />;

  function cargar(vector) {
    const AgregarElemento = (
      <li key={Registros} id={Registros} className="Guardado_Canal_Formulario">
        <div className="Guardado_Canalcontacto">
          <select
            className="TxtCanalcontactoGuardado"
            defaultValue={vector.Canal}
            disabled={true}
          >
            {OptContacto[0]}
            {OptContacto[vector.Canal]}
          </select>
        </div>

        <div className="Guardado_CuentaUsuario">
          <input
            className="TxtCuentaUsuarioGuardado"
            autoComplete="off"
            type="text"
            placeholder={vector.Cuenta}
            disabled={true}
          />
        </div>

        <div className="Guardado_Preferencias">
          <select
            className="TxtPreferenciasGuardado"
            defaultValue={vector.Preferencia}
            disabled={true}
          >
            {OptPreferencia[0]}
            {OptPreferencia[vector.Preferencia]}
          </select>
        </div>

        <div className="Boton">
          <button
            id="BtnEditar"
            className="BtnEditar"
            posicion={Registros}
            onClick={EditarCanal}
            type="submit"
          >
            {pen}Editar Canal
          </button>

          <button
            id="BtnGuardarC"
            className="BtnGuardarC"
            posicion={Registros}
            onClick={EditarCanal}
            type="submit"
          >
            {save}Guardar Cambios
          </button>
        </div>

        <div className="Boton">
          <button
            id="BtnEliminar"
            className="BtnEliminar"
            posicion={Registros}
            onClick={EliminarCanal}
            type="submit"
          >
            {trash}Eliminar Canal
          </button>
        </div>
      </li>
    );

    setRegistros([parseInt(Registros) + 1]);
    setMostrar([...Mostrar, AgregarElemento]);
  }

  function EditarCanal(e) {
    e.preventDefault();

    let elemento;

    switch (e.target.nodeName) {
      case "BUTTON":
        const PosicionFilaFormulario = e.target.parentElement.parentElement;

        const SelectCanal = PosicionFilaFormulario.children[0].children[0];
        const NumeroListaCanal = parseInt(SelectCanal.value);

        const SelectPreferencia =
          PosicionFilaFormulario.children[2].children[0];
        const NumeroListaPreferencia = parseInt(SelectPreferencia.value);

        let Posicion = 0;

        if (e.target.id === "BtnGuardarC") {
          Posicion = 1;
        }

        switch (
          PosicionFilaFormulario.children[3].children[Posicion].textContent
        ) {
          case "Editar Canal":
            if (isOpen) {
              isOpen = !isOpen;
              PosicionFilaFormulario.children[3].children[0].style.display =
                "none";
              PosicionFilaFormulario.children[3].children[1].style.display =
                "initial";

              PosicionFilaFormulario.children[0].children[0].disabled = false;
              PosicionFilaFormulario.children[1].children[0].disabled = false;
              PosicionFilaFormulario.children[2].children[0].disabled = false;

              PosicionFilaFormulario.children[1].children[0].value =
                PosicionFilaFormulario.children[1].children[0].attributes[3].value;

              while (SelectCanal.firstChild) {
                SelectCanal.removeChild(SelectCanal.firstChild);
              }

              Contacto.map((elemento, index) => {
                const option = document.createElement("option");
                option.key = index;
                option.text = elemento;
                option.value = index;
                if (index === NumeroListaCanal) {
                  SelectCanal.defaultValue = '"' + NumeroListaCanal + '"';
                  option.selected = true;
                }
                if (index === 0) {
                  option.disabled = true;
                }
                SelectCanal.appendChild(option);
              });

              while (SelectPreferencia.firstChild) {
                SelectPreferencia.removeChild(SelectPreferencia.firstChild);
              }

              Preferencia.map((elemento, index) => {
                const option = document.createElement("option");
                option.key = index;
                option.text = elemento;
                option.value = index;

                if (index === NumeroListaPreferencia) {
                  SelectPreferencia.defaultValue =
                    '"' + NumeroListaPreferencia + '"';
                  option.selected = true;
                }
                if (index === 0) {
                  option.disabled = true;
                }
                SelectPreferencia.appendChild(option);
              });
            } else {
              console.log("Primero dar click en Guardar Cambios");
            }

            break;

          case "Guardar Cambios":
            if (isOpen === false) {
              isOpen = !isOpen;

              PosicionFilaFormulario.children[3].children[0].style.display =
                "initial";
              PosicionFilaFormulario.children[3].children[1].style.display =
                "none";

              PosicionFilaFormulario.children[1].children[0].attributes[3].value =
                PosicionFilaFormulario.children[1].children[0].value;
              PosicionFilaFormulario.children[1].children[0].value = "";
              PosicionFilaFormulario.children[0].children[0].disabled = true;
              PosicionFilaFormulario.children[1].children[0].disabled = true;
              PosicionFilaFormulario.children[2].children[0].disabled = true;

              for (let i = 5; i > -1; i--) {
                if (i !== NumeroListaCanal && i !== 0) {
                  SelectCanal.removeChild(SelectCanal.children[i]);
                }
              }

              for (let i = 3; i > -1; i--) {
                if (i !== NumeroListaPreferencia && i !== 0) {
                  SelectPreferencia.removeChild(SelectPreferencia.children[i]);
                }
              }
            }

            break;

          default:
            break;
        }

        break;

      case "path":
        switch (e.target.id) {
          case "BtnGuardarC":
            elemento = document.getElementById("BtnGuardarC");
            elemento.click();
            break;

          case "BtnEditar":
            elemento = document.getElementById("BtnEditar");
            elemento.click();
            break;

          default:
            break;
        }

        break;

      case "svg":
        switch (e.target.id) {
          case "BtnGuardarC":
            elemento = document.getElementById("BtnGuardarC");
            elemento.click();
            break;

          case "BtnEditar":
            elemento = document.getElementById("BtnEditar");
            elemento.click();
            break;

          default:
            break;
        }

        break;

      default:
        break;
    }
  }

  function EliminarCanal(e) {
    e.preventDefault();

    var elemento;
    switch (e.target.nodeName) {
      case "BUTTON":
        if (isOpen) {
          const nodo = e.target.parentNode.parentNode;
          nodo.parentNode.removeChild(nodo);
        } else {
          console.log("Primero dar click en Guardar Cambios");
        }
        break;

      case "path":
        elemento = document.getElementById("BtnEliminar");
        elemento.click();
        break;

      case "svg":
        elemento = document.getElementById("BtnEliminar");
        elemento.click();
        break;

      default:
        break;
    }
  }

  async function GuardarContacto(e) {
    e.preventDefault();

    const Ruta = e.target.form;

    if (
      Ruta[0].value !== "" &&
      Ruta[1].value !== "" &&
      Ruta[2].value !== "" &&
      Ruta[3].value !== "" &&
      Ruta[4].selectedOptions[0].value !== "0" &&
      Ruta[5].selectedOptions[0].value !== "0" &&
      Ruta[6].selectedOptions[0].value !== "0" &&
      Ruta[7].selectedOptions[0].value !== "0" &&
      Ruta[8].value !== "" &&
      Ruta[9].selectedOptions[0].value !== "0"
    ) {
      let BaseBody = {
        NombreContacto: Ruta[0].value,
        ApellidoContacto: Ruta[1].value,
        CargoContacto: Ruta[2].value,
        EmailContacto: Ruta[3].value,
        ID_CompañiaContacto: Ruta[4].selectedOptions[0].value,

        ID_RegionContacto: Ruta[5].selectedOptions[0].value,
        ID_PaisContacto: Ruta[6].selectedOptions[0].value,
        ID_CiudadContacto: Ruta[7].selectedOptions[0].value,

        DireccionContacto: Ruta[8].value,
        InteresContacto: Ruta[9].selectedOptions[0].value,
        Foto: "./default.png",
      };

      let canales = document.querySelectorAll(".Guardado_Canal_Formulario");

      if (canales.length === 0) {
        console.log("ingrese por lo menos un canal de contacto");
      } else {
        const result = await AgregarContacto(BaseBody);

        if ((await result.estado) === "Correcto") {
          GuardarContactoCanal(result.msj[0]);
        } else {
          console.log(result.estado);
        }

        async function GuardarContactoCanal(ID) {
          const Coleccion = document.querySelectorAll(
            ".Guardado_Canal_Formulario"
          );

          Coleccion.forEach(async (elemento) => {
            let Canales = {
              Canal: elemento.children[0].children[0].selectedOptions[0].value,
              Cuenta: elemento.children[1].children[0].placeholder,
              Preferencia:
                elemento.children[2].children[0].selectedOptions[0].value,
              ID_Contacto: ID,
            };

            const resultado = await AgregarCanal(Canales);
            if ((await resultado.estado) === "Correcto") {
              console.log(resultado.estado);
            } else {
              console.log(resultado.estado);
            }
          });
        }

        document.querySelector(".cierreetiqueta").click();
      }
    } else {
      console.log("tienes datos vacios");
    }
  }

  const Plus = <FontAwesomeIcon icon={faPlus} />;

  return (
    <React.Fragment>
      <div className="Canal_Formulario">
        <div className="Formulario_Canal">
          <div className="Canalcontacto">
            <label>Canal de contacto</label>

            <select className="TxtCanalcontacto" defaultValue={0}>
              {OptContacto}
            </select>
          </div>

          <div className="CuentaUsuario">
            <label>Cuenta de Usuario</label>
            <input
              className="TxtCuentaUsuario"
              autoComplete="off"
              type="text"
              placeholder="@ejemplo"
            />
          </div>

          <div className="Preferencias">
            <label>Preferencias</label>

            <select className="TxtPreferencias" defaultValue={0}>
              {OptPreferencia}
            </select>
          </div>

          <div className="Boton">
            <button
              id="BtnAgregar"
              onClick={AgregarCanalFormulario}
              type="submit"
            >
              {Plus} Agregar canal
            </button>
          </div>

          <div className="Espacio"></div>
        </div>
      </div>

      <div className="Contenedor">
        <ul className="ContenedorUL">{Mostrar}</ul>
      </div>

      <div>
        <input
          className="BtnGuardar"
          type="submit"
          value="Guardar Contacto"
          onClick={GuardarContacto}
        />
      </div>
    </React.Fragment>
  );
}
export default CanalesList;
