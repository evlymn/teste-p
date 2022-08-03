import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CadastroService} from "./cadastro.service";
import {MatCheckbox, MatCheckboxChange} from "@angular/material/checkbox";
import CadastroAnimations from "./animations/cadastroAnimations";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  animations: CadastroAnimations,

})
export class CadastroComponent implements OnInit {
  @ViewChildren("fields") fields!: QueryList<MatInput>;
  @ViewChildren("checkboxes") checkboxes!: QueryList<MatCheckbox>;


  clientes: any;
  cliente: any;
  planos = new Array<any>;
  dados = new Map<string, []>;
  titulo = '';
  itemsChecks = new Map<string, { index: number, nome: string, campos: [], checked: boolean, colecao: string }>;
  openClosed = true;
  totalRegistros = 1;
  inputs = new Array<any>;

  constructor(private _service: CadastroService) {
    this._service.authState.subscribe(u => {
      this.getPlanos();
      this.getCliente();
    })
  }

  salvar() {
    this.inputs = [];
    this.fields.forEach(f => {
      this.inputs.push(f)
    })

    const controls = new Map<string,any>();
    this.itemsChecks.forEach(items => {
      if (items.checked) {
        for (let i = 0; i < this.totalRegistros; i++) {
          let j = 0;
          const data = new Map<string, any>()
          items.campos.forEach((c: any) => {
            const field = this.inputs.filter(f => f.nativeElement.id.includes(c.key + '#' + i.toString() + '#'))[0];
            controls.set(c.key + '#' + i.toString() + '#', field);
            data.set(c.key, field.nativeElement.value)
            j++
          })

         this._service.gravarDados(Object.fromEntries(data),items.colecao);
        }
      }
    })
    controls.forEach(c=> {
      c.nativeElement.value = '';
    })
  }

  setArrayFromNumber(i: number) {
    return new Array(i);
  }

  logout() {
    this._service.logout();
  }

  checkPlano(item: any, e: MatCheckboxChange, index: number) {

    this.openClosed = false;
    this.itemsChecks.set(item.nome, {
      index,
      campos: item.campos,
      nome: item.nome,
      checked: e.checked,
      colecao: item.colecao
    });


    this.planos = [];
    this.itemsChecks.forEach(item => {
      if (item.checked) {
        this.planos.push(...item.campos)
      }
    })

    const unicos = new Array<any>();
    this.planos.forEach(u => {
      if (!unicos.some(s => s.key == u.key)) {
        unicos.push(u);
      }
    })
    this.planos = unicos;

    if (this.planos.length == 0) {
      this.planos = this.itemsChecks.values().next().value.campos
      this.checkboxes.first.checked = true;
    }

    setTimeout(() => {
      this.openClosed = true;
    }, 100)

  }

  async getCliente() {
    this.cliente = await this._service.getCliente();
    this.titulo = this.cliente.val().nome;
  }

  async getPlanos() {
    this._service.getPlanos().subscribe((p: any) => {

      if (p.length > 0) {
        this.clientes = p;
        let i = 0;
        p.forEach((d: any) => {
          if (i == 0) {
            p[i].colecao = d.colecao;
            this.itemsChecks.set(d.nome, {
              index: i,
              campos: d.campos,
              nome: d.nome,
              checked: true,
              colecao: d.colecao
            })
            p[0].checked = true;
          } else {
            this.itemsChecks.set(d.nome, {
              index: i,
              campos: d.campos,
              nome: d.nome,
              checked: false,
              colecao: d.colecao
            })

          }
          i++;
        })
        this.planos = p[0].campos;
      }
    })
  }

  ngOnInit(): void {


  }
}
