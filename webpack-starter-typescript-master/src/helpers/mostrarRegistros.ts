import firebase from "firebase";

export const mostrarRegistros = ( snapshot: firebase.firestore.QuerySnapshot ) => {

    const documentos: any[] = [];
        
        snapshot.forEach( spanHijo => {
            
            documentos.push({
                id: spanHijo.id,
                ...spanHijo.data()
            })

        })
        console.log( documentos );
        return documentos;
}