import { Component, inject, OnInit } from '@angular/core';
import { CoffeeMethod, CoffeeMethodType, CoffeeMethodTypeLabels, GrindSize, RoastLevel, RoastLevelLabels } from '../../models';
import { CoffeeMethodService } from '../../services/service';

@Component({
  selector: 'app-coffee-method-list',
  imports: [],
  templateUrl: './coffee-method-list.html',
  styleUrl: './coffee-method-list.css',
})
export class CoffeeMethodList implements OnInit {
  methods: CoffeeMethod[] = [];

  constructor(private service: CoffeeMethodService) { }

  ngOnInit() {
    this.service.findAll().subscribe(data => {
      this.methods = data;
    })
  }

  getMethodTypeLabel(type: CoffeeMethodType): string {
    return CoffeeMethodTypeLabels[type];
  }

  getGrindSize(size: GrindSize): string {
    return GrindSize[size];
  }

  getRoastLevelLabel(level: RoastLevel): string {
    return RoastLevelLabels[level];
  }
}
