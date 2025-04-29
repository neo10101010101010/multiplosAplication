// Importa los módulos necesarios de Angular y el servicio de base de datos
import { Component } from '@angular/core';
import { DbService } from './services/db.service';

// Decorador que define el componente principal de la aplicación
@Component({
  selector: 'app-root', // Nombre de la etiqueta para usar este componente
  templateUrl: 'app.component.html', // Archivo HTML asociado
  styleUrls: ['app.component.scss'], // Archivo(s) de estilos asociado(s)
  standalone: false,
})
export class AppComponent {
  // Nueva variable para el tema oscuro
  darkMode = false;

  // Inyección del servicio de base de datos en el constructor
  constructor(private dbService: DbService) {
    // Cargar configuración al iniciar
    this.cargarConfiguracion();
  }

  // Método para cargar configuración
  cargarConfiguracion() {
    this.dbService.getRealtimeDataSafe('/config/appSettings')
      .subscribe(config => {
        if (config) {
          this.darkMode = config.darkMode || false;
          this.aplicarTema();
        }
      });
  }

  // Aplicar tema visual
  aplicarTema() {
    document.body.classList.toggle('dark-theme', this.darkMode);
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
    if (this.numero !== undefined && this.numero >= 0) {
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

      // Guardar en Realtime Database
      this.dbService.saveRealtimeDataSafe(`/calculos/${Date.now()}`, {
        numero: this.numero,
        multiples: this.multiples
      }).subscribe(() => console.log('Guardado seguro exitoso'));
    } else {
      // Si el número no es válido, reinicia los arreglos de múltiplos
      this.multiples = { multiples3: [], multiples5: [], multiples7: [] };
    }
  }

  // Método para alternar el tema oscuro
  toggleTema() {
    this.darkMode = !this.darkMode;
    this.dbService.updateRealtimeData('/config/appSettings', {
      darkMode: this.darkMode
    }).subscribe(() => {
      this.aplicarTema();
    });
  }
}