import { Injectable } from '@angular/core';

import { serverTimestamp } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importación corregida

import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  
  constructor(private afs: AngularFirestore) { }
  // Método para guardar una solicitud de múltiplos en la base de datos
  saveRequest(inputNumber: number, multiples: {
    multiples3: number[],
    multiples5: number[],
    multiples7: number[]
  }): Observable<void> {
    // Crea un objeto con el número ingresado, los múltiplos y la fecha de creación
    const request = {
      inputNumber,
      ...multiples,
      createdAt: new Date()
    };
    
    // Muestra en consola lo que se va a guardar (útil para depuración)
    console.log('Guardando en Firestore:', request);

    // Genera un ID único para la nueva solicitud
    const id = this.afs.createId();

    // Guarda el objeto en la colección 'numberRequests' usando el ID generado
    return from(
      this.afs.collection('numberRequests').doc(id).set(request)
    ).pipe(
      map(() => {}) // Devuelve un observable vacío cuando termina
    );
  }

  // Método para obtener el historial de las últimas 10 solicitudes guardadas
  getHistory(): Observable<any> {
    // Consulta la colección 'numberRequests', ordena por fecha descendente y limita a 10 resultados
    return this.afs.collection('numberRequests', ref => 
      ref.orderBy('createdAt', 'desc').limit(10)
    ).valueChanges({ idField: 'id' }); // Devuelve los datos y el ID de cada documento
  }
  
  // Método de prueba para guardar un documento simple en otra colección
  saveTest(): Observable<void> {
    return from(
      this.afs.collection('testCollection').add({ test: true, createdAt: serverTimestamp() })
    ).pipe(
      map(() => {})
    );
  }
}
