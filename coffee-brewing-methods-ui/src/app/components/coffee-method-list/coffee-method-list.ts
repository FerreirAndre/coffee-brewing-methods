import { Component, inject, OnInit } from '@angular/core';
import {
  CoffeeMethod,
  CoffeeMethodType,
  CoffeeMethodTypeLabels,
  GrindSize,
  GrindSizeLabels,
  RoastLevel,
  RoastLevelLabels,
} from '../../models';
import { CoffeeMethodService } from '../../services/service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-coffee-method-list',
  imports: [RouterLink],
  templateUrl: './coffee-method-list.html',
  styleUrl: './coffee-method-list.css',
})
export class CoffeeMethodList implements OnInit {
  methods: CoffeeMethod[] = [];
  loading: boolean = true;
  private service: CoffeeMethodService = inject(CoffeeMethodService);
  private router: Router = inject(Router);

  ngOnInit() {
    this.service.findAll().subscribe(
      (data) => {
        this.methods = data;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.loading = false;
      },
    );
  }

  edit(methodId: number) {
    this.router.navigate(['coffee-methods/edit', methodId]);
  }

  delete(methodId: number) {
    if (confirm("Quer deletar esse metodo?")) {
      this.service.delete(methodId).subscribe({
        next: () => {
          this.methods = this.methods.filter((method) => method.id != methodId);
        }, error: (err) => {
          console.error(err);
          alert('erro deletando este metodo.');
        }
      });
    }
  }

  getMethodTypeLabel(type: CoffeeMethodType): string {
    return CoffeeMethodTypeLabels[type];
  }

  getGrindSize(size: GrindSize): string {
    return GrindSizeLabels[size];
  }

  getRoastLevelLabel(level: RoastLevel): string {
    return RoastLevelLabels[level];
  }
}
