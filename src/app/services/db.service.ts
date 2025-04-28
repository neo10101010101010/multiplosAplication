import { Injectable } from '@angular/core';

import { serverTimestamp } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importación corregida

import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  
  constructor(private afs: AngularFirestore) { }
  // Guardar solicitud
  saveRequest(inputNumber: number, multiples: {
    multiples3: number[],
    multiples5: number[],
    multiples7: number[]
  }): Observable<void> {
    const request = {
      inputNumber,
      ...multiples,
      createdAt: new Date()
    };
    
    console.log('Guardando en Firestore:', request);

    

    // Genera un ID único
    const id = this.afs.createId();

    return from(
      this.afs.collection('numberRequests').doc(id).set(request)
    ).pipe(
      map(() => {})
    );
  }

  // Obtener historial
  getHistory(): Observable<any> {
    return this.afs.collection('numberRequests', ref => 
      ref.orderBy('createdAt', 'desc').limit(10)
    ).valueChanges({ idField: 'id' });
  }
  
  saveTest(): Observable<void> {
    return from(
      this.afs.collection('testCollection').add({ test: true, createdAt: serverTimestamp() })
    ).pipe(
      map(() => {})
    );
  }
}
