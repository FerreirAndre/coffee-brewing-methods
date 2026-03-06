import { Component, inject, OnInit } from '@angular/core';
import {
  CoffeeMethodDetailsDto,
  CoffeeMethodType,
  CoffeeMethodTypeLabels,
  GrindSize,
  GrindSizeLabels,
  RoastLevel,
  RoastLevelLabels,
} from '../../models';
import { CoffeeMethodService } from '../../services/service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-coffee-method-details',
  imports: [RouterLink],
  templateUrl: './coffee-method-details.html',
  styleUrl: './coffee-method-details.css',
})
export class CoffeeMethodDetails implements OnInit {
  method: CoffeeMethodDetailsDto | null = null;
  id!: number;

  private service: CoffeeMethodService = inject(CoffeeMethodService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.findById(this.id).subscribe((data) => {
      this.method = data;
    });
  }

  edit(methodId: number) {
    this.router.navigate(['coffee-methods/edit', methodId]);
  }

  delete(methodId: number) {
    if (confirm("Quer deletar esse metodo?")) {
      this.service.delete(methodId).subscribe({
        next: () => {
          this.router.navigate(['coffee-methods'])
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

  getGrindSizeLabel(size: GrindSize): string {
    return GrindSizeLabels[size];
  }

  getRoastLevelLabel(level: RoastLevel): string {
    return RoastLevelLabels[level];
  }
}
