import { Component, inject, OnInit, signal } from '@angular/core';
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
  method = signal<CoffeeMethodDetailsDto | null>(null);
  loading = signal(true);

  private service: CoffeeMethodService = inject(CoffeeMethodService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id && !isNaN(id)) {
      this.loadMethod(id);
    } else {
      this.router.navigate(['/coffee-methods']);
    }
  }

  edit(methodId: number) {
    this.router.navigate(['coffee-methods/edit', methodId]);
  }

  loadMethod(id: number) {
    this.loading.set(true);
    this.service.findById(id).subscribe({
      next: (data) => {
        this.method.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
        this.router.navigate(['/coffee-methods']);
      },
    });
  }

  delete(methodId: number) {
    if (confirm('Quer deletar esse metodo?')) {
      this.service.delete(methodId).subscribe({
        next: () => {
          this.router.navigate(['coffee-methods']);
        },
        error: (err) => {
          console.error(err);
          alert('erro deletando este metodo.');
        },
      });
    }
  }

  getTotalWater(): number {
    const method = this.method();
    if (!method) return 0;
    return method.steps.reduce((sum, step) => sum + step.amountGrams, 0);
  }

  getCoffeeWaterRatio(): string {
    const method = this.method();
    if (!method) return '0';
    const totalWater = this.getTotalWater();
    const coffeeGrams = method.coffeeDescription.coffeeGrams;
    if (coffeeGrams === 0) return '0';
    return (totalWater / coffeeGrams).toFixed(1);
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
