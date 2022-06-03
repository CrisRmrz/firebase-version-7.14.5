import db from './firebase/config';
import { mostrarRegistros } from './helpers/mostrarRegistros';

const usuario = {
    nombre : "prueba10",
    activo : true,
    fechaNacimiento : new Date()
}

////////////////////// ADD REGISTROS

/*
db.collection( "usuarios" ) //LA COLECCION A LA QUE AÑADIREMOS LA COLECCION JSON
    .add( usuario ); //EL JSON A AÑADIR
*/

////////////////////// ADD REGISTROS y ademas tirarnos por consola la data de la persona

    /*
db.collection( "usuarios" )
    .add( usuario )
    .then( docRef => {
        console.log( docRef ) //nos da toda la data
    }).catch( e => console.log(e) );
    */

/*
db.collection( "usuarios" )
    .add( usuario )
    .then( docRef => {
        console.log( docRef.id ) //PARA SACAR EL ID
    }).catch( e => console.log(e) );
*/

//////////////////////  UPDATE REGISTROS, MUCHO OJO CON ESTA, ESTA NO ES DESTRUCTIVA COMO CON EL SET
/*
const usuariosRef = db.collection( "usuarios" );
const id = "Y3HTdlnp9atG5sNWQubh";

usuariosRef.doc(id)
    .update({
        nombre : "Nombre cambiado"
    }).catch( e => console.log(e) )
*/

//////////////////////  SET REGISTROS, MUCHO OJO CON ESTA, ESTA SI ES DESTRUCTIVA, SI EJECUTO LO DE ADELANTE DESTRUYE TODO LO
// DEL USUARIO Y SOLO DEJARIA EL NOMBRE AL NOMBRE CAMBIADO

/*
const usuariosRef = db.collection( "usuarios" );
const id = "Y3HTdlnp9atG5sNWQubh";

usuariosRef.doc(id)
    .set({
        nombre : "Nombre cambiado"
    }).catch( e => console.log(e) )
*/

//////////////////////  DELETE REGISTROS,

/*
const idBorrar = "Ct1gFFhpxwsKeaTZv3aR";

const usuariosRef = db.collection( "usuarios" )
    .doc( idBorrar )
    .delete()                //esto tira una promesa
    .then( () => console.log( `Usuario con el id ${ idBorrar } eliminado de la firestore ` ) )
    .catch( e => console.log( e ) );
*/

////////////////////////////////////////////////  HACER UN SELECT DE LOS REGISTROS

const usuariosRef = db.collection( "usuarios" );

/*
usuariosRef
    .onSnapshot( snap => {  //EL SNAPSHOT ES EN TIEMPO REAL, SI ALGO CAMBIA EN FIRESTORE ENTONCES ESTO SE VUELVE A EJECUTAR, PARA ESO MEJOR USAR .GET EN VEZ DE .SNAPSHOT

        mostrarRegistros( snap )
        
    })
*/
/*
usuariosRef  //ESTE ES IGUAL AL .SNAP SHOT SOLO QUE SI CAMBIAMOS ALGO EN FIRESTORE ESTO NO SE VUELVE A EJECUTAR, ADEMAS ESTE DEVUELVE UNA PROMESA
    .get()
    .then( snap => mostrarRegistros( snap ) );      
*/
////////////////////////////////////////////////  HACER UN SELECT DE LOS REGISTROS PERO CON UN WHERE
/*
usuariosRef
    .where('activo', '==', true)
    .get()
    .then( res => mostrarRegistros( res ) )
*/
/*
usuariosRef
    .where('salario', '>', 2000)  //OJO SI SE HACE ASI NOS TIRA UN ERROR PERO ESE ERROR ES PARTE DE LA SOLUCION, EN LA CONSOLA PRESIONAMOS
    .where('activo', '==', true)   //EL LINK QUE NOS TIRA EL ERROR Y AHI REALIZAMOS EL PROCESO PARA CREAR ESTA CONSULTA
    .get()                         // CUALQUIER COSA ESO ESTA EN ESTE VIDEO: fERNANDO HERRRERA PLAYLIST DE FIREBASE VIDEO NUMERO 08
    .then( res => mostrarRegistros( res ) )
*/

////////////////////////////////////////////////  HACER UN SELECT DE LOS REGISTROS PERO CON UN WHERE Y UN ORDER BY
/*
usuariosRef
    .orderBy('salario', 'desc')     //puede ser asc o desc    Y SI ALGO NO TIENE EL CAMPO SALARIO ENTONCES NO NOS TIRA ESE OBJETO EN DATA, LO EXCLUYE
    .get()
    .then( res => mostrarRegistros( res ) );
*/
/*
    usuariosRef
    .orderBy('salario', 'desc')     //SI FUERA ASI NOS TIRA UN ERROR PERO SE SOLUCIONA CON EL LINK QUE NOS DA EN CONSOLA PARA QUE FIREBASE GENERE ESE SCRIPT Y YA FUNCIONE
    .orderBy('nombre', 'desc')
    .get()
    .then( res => mostrarRegistros( res ) );
*/

////////////////////////////////////////////////    LIMIT Y PAGINACION

//btn next
const btnNext = document.createElement('button');
btnNext.innerText = "NEXT";
document.body.appendChild( btnNext );

let firstDocument: any = null;
let lastDocument: any = null;   //ojo aqui, el del btn previous no tiene esto

btnNext.addEventListener("click", () => {
    
    const query = usuariosRef
                    .orderBy('nombre')
                    .startAfter( lastDocument )

    query.limit(2).get().then( snap => {

        firstDocument = snap.docs[ 0 ] || null ;
        lastDocument = snap.docs[ snap.docs.length -1 ] || null ;
        mostrarRegistros( snap );

    })

})

//btn previous
const btnPrevious = document.createElement('button');
btnPrevious.innerText = "PREVIOUS";
document.body.appendChild( btnPrevious );

btnPrevious.addEventListener("click", () => {
    
    const query = usuariosRef
                    .orderBy('nombre')
                    .endBefore( firstDocument )

    query.limit(2).get().then( snap => {

        firstDocument = snap.docs[ 0 ] || null ;
        lastDocument = snap.docs[ snap.docs.length -1 ] || null ;
        mostrarRegistros( snap );

    })

})