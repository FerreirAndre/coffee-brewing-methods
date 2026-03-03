import { Component, OnInit } from '@angular/core';
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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coffee-method-list',
  imports: [RouterLink],
  templateUrl: './coffee-method-list.html',
  styleUrl: './coffee-method-list.css',
})
export class CoffeeMethodList implements OnInit {
  methods: CoffeeMethod[] = [];
  loading: boolean = true;
  constructor(private service: CoffeeMethodService) {}

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
