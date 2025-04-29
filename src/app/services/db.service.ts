import { Injectable, NgZone } from '@angular/core';

import { serverTimestamp } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importación corregida
import { AngularFireDatabase } from '@angular/fire/compat/database'; // <- Añadir este import
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  
  constructor(
    private afs: AngularFirestore,      // Para Firestore
    private db: AngularFireDatabase,
    private ngZone: NgZone // Inyectar NgZone
  ) { }

  // ================== Firestore Methods ==================
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

  // ================== Realtime Database Methods ==================
  // Método seguro para Realtime Database
  saveRealtimeDataSafe(path: string, data: any): Observable<void> {
    return new Observable(subscriber => {
      const ref = this.db.database.ref(path);
      ref.set(data)
        .then(() => {
          subscriber.next();
          subscriber.complete();
        })
        .catch(error => subscriber.error(error));
    });
  }

  // Método para leer datos
  getRealtimeDataSafe(path: string): Observable<any> {
    return new Observable(subscriber => {
      const ref = this.db.database.ref(path);
      ref.on('value', snapshot => {
        subscriber.next(snapshot.val());
      });
    });
  }

  // Método para actualizar datos
  updateRealtimeData(path: string, updates: any): Observable<void> {
    return new Observable(subscriber => {
      this.ngZone.run(() => {
        this.db.object(path).update(updates)
          .then(() => {
            subscriber.next();
            subscriber.complete();
          })
          .catch(error => subscriber.error(error));
      });
    });
  }

  // ================== Métodos Adicionales ==================
  // Método genérico para agregar clave-valor
  addKeyValue(path: string, key: string, value: any): Observable<void> {
    const updates = { [key]: value };
    return from(this.db.object(path).update(updates));
  }

  // Para guardar múltiples cálculos con IDs únicos
  guardarCalculo(numero: number, multiples: any) {
    const path = `/calculos/${Date.now()}`; // Clave = timestamp
    const data = { numero, multiples };
    return this.saveRealtimeDataSafe(path, data);
  }
}
