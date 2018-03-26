import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'chamados',
    templateUrl: './chamados.component.html'
})
export class ChamadosComponent {
    public chamados: Chamado[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/chamados').subscribe(result => {

            this.chamados = result.json() as Chamado[];

        }, error => console.error(error));
    }
}

interface Chamado {
    numeroProcesso: number;
    titulo: string;
    urgencia: number;
    categoria: Categoria[];
}


interface Categoria {
    id: number,
    descricao: string
}
