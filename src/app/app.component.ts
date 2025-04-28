import { Component } from '@angular/core';
import { DbService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private dbService: DbService) {}
  numero: any;
  // ... existing code ...
  // ... existing code ...
  multiplesTypes: ('multiples3' | 'multiples5' | 'multiples7')[] = ['multiples3', 'multiples5', 'multiples7'];
  // ... existing code ...
  multiples: { 
    multiples3: number[],
    multiples5: number[],
    multiples7: number[] 
  } = { multiples3: [], multiples5: [], multiples7: [] };
  // ... existing code ...
  numbers: { 
      value: number; 
      color: string | undefined; 
      multiples: number[]; 
    }[] = [];
    resultado: any;


  calcularMultiplos() {
    if (this.numero !== undefined && this.numero >= 0) {
      this.multiples = { multiples3: [], multiples5: [], multiples7: [] };

      for (let i = 1; i <= this.numero; i++) {
        if (i % 3 === 0) this.multiples.multiples3.push(i);
        if (i % 5 === 0) this.multiples.multiples5.push(i);
        if (i % 7 === 0) this.multiples.multiples7.push(i);
      }
      
      this.dbService.saveRequest(this.numero, this.multiples)
        .subscribe({
          next: () => console.log('Guardado exitoso'),
          error: (err) => console.error('Error al guardar:', err)
        });
    } else {
      this.multiples = { multiples3: [], multiples5: [], multiples7: [] };
    }
  }
}