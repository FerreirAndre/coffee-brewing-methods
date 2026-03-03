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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coffee-method-details',
  imports: [],
  templateUrl: './coffee-method-details.html',
  styleUrl: './coffee-method-details.css',
})
export class CoffeeMethodDetails implements OnInit {
  method: CoffeeMethodDetailsDto | null = null;
  id!: string | null;

  private service: CoffeeMethodService = inject(CoffeeMethodService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.findById(this.id).subscribe((data) => {
      this.method = data;
    });
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
