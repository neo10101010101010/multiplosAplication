import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-multiplos',
  templateUrl: './multiplos.page.html',
  styleUrls: ['./multiplos.page.scss'],
  
  standalone: false,
})
export class MultiplosPage implements OnInit{
  numero: any;
multiples: { [key: number]: number[] } = { 3: [], 5: [], 7: [] };
numbers: { 
    value: number; 
    color: string | undefined; 
    multiples: number[]; 
  }[] = [];
  resultado: any;
  constructor() {}

  ngOnInit(){
    this.calcularMultiplos();
  }
  calcularMultiplos() {
    if (this.numero !== undefined && this.numero >= 0) {
      this.multiples = { 3: [], 5: [], 7: [] }; // Reinicia los múltiplos

      for (let i = 1; i <= this.numero; i++) {
        [3, 5, 7].forEach(divisor => {
          if (i % divisor === 0) {
            this.multiples[divisor].push(i);
          }
        });
      }
    } else {
      this.multiples = { 3: [], 5: [], 7: [] };
    }
  }
}
