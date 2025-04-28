import { Component, OnInit} from '@angular/core';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-multiplos',
  templateUrl: './multiplos.page.html',
  styleUrls: ['./multiplos.page.scss'],
  
  standalone: false,
})
export class MultiplosPage implements OnInit{
  // Inyección del servicio de base de datos en el constructor
  constructor(private dbService: DbService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Variable para guardar el número ingresado por el usuario
  numero: any;

  // Tipos de múltiplos que se van a calcular (3, 5 y 7)
  multiplesTypes: ('multiples3' | 'multiples5' | 'multiples7')[] = ['multiples3', 'multiples5', 'multiples7'];

  // Objeto para almacenar los múltiplos encontrados para cada tipo
  multiples: { 
    multiples3: number[],
    multiples5: number[],
    multiples7: number[] 
  } = { multiples3: [], multiples5: [], multiples7: [] };

  // (No se usa en la lógica actual, pero está preparado para manejar números con color y múltiplos)
  numbers: { 
      value: number; 
      color: string | undefined; 
      multiples: number[]; 
    }[] = [];

  // Variable para guardar el resultado (no se usa en la lógica actual)
  resultado: any;

  // Función que calcula los múltiplos de 3, 5 y 7 hasta el número ingresado
  calcularMultiplos() {
    // Solo calcula si el número es válido y mayor o igual a 0
    if (this.numero !== undefined && this.numero >= 0) {
      // Reinicia los arreglos de múltiplos
      this.multiples = { multiples3: [], multiples5: [], multiples7: [] };

      // Recorre todos los números desde 1 hasta el número ingresado
      for (let i = 1; i <= this.numero; i++) {
        // Si el número es múltiplo de 3, lo agrega al arreglo correspondiente
        if (i % 3 === 0) this.multiples.multiples3.push(i);
        // Si el número es múltiplo de 5, lo agrega al arreglo correspondiente
        if (i % 5 === 0) this.multiples.multiples5.push(i);
        // Si el número es múltiplo de 7, lo agrega al arreglo correspondiente
        if (i % 7 === 0) this.multiples.multiples7.push(i);
      }
      
      // Guarda la petición y los resultados en la base de datos usando el servicio
      this.dbService.saveRequest(this.numero, this.multiples)
        .subscribe({
          next: () => console.log('Guardado exitoso'), // Mensaje si se guarda bien
          error: (err) => console.error('Error al guardar:', err) // Mensaje si hay error
        });
    } else {
      // Si el número no es válido, reinicia los arreglos de múltiplos
      this.multiples = { multiples3: [], multiples5: [], multiples7: [] };
    }
  } 
}
