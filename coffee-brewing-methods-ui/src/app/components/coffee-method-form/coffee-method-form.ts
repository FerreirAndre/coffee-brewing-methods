import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoffeeMethodService } from '../../services/service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CoffeeMethodSaveDto, CoffeeMethodType, GrindSize, RoastLevel } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coffee-method-form',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './coffee-method-form.html',
  styleUrl: './coffee-method-form.css',
})
export class CoffeeMethodForm implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(CoffeeMethodService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  methodId?: number;

  coffeeMethodTypes = Object.values(CoffeeMethodType);
  grindSizes = Object.values(GrindSize);
  roastLevels = Object.values(RoastLevel);

  form!: FormGroup;
  isEditMode = false;

  ngOnInit(): void {
    this.initForm();
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.methodId = Number(idParam);
      this.isEditMode = true;
      this.loadMethod(this.methodId);
    }
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      waterTemperature: [90, [Validators.required, Validators.min(50), Validators.max(100)]],
      description: ['', Validators.required],

      coffeeDescription: this.fb.group({
        grindSize: ['', Validators.required],
        roastLevel: ['', Validators.required],
        coffeeGrams: [15, [Validators.required, Validators.min(1), Validators.max(100)]]
      }),

      steps: this.fb.array([])
    });

  }

  get steps(): FormArray {
    return this.form.get('steps') as FormArray;
  }

  get coffeeDescription(): FormGroup {
    return this.form.get('coffeeDescription') as FormGroup;
  }

  createStep(orderNumber?: number, amountGrams?: number, instructions?: string): FormGroup {
    return this.fb.group({
      orderNumber: [orderNumber || this.steps.length + 1],
      amountGrams: [amountGrams || 0, Validators.min(0)],
      instructions: [instructions || '']
    })
  }

  addStep() {
    this.steps.push(this.createStep());
  }

  removeStep(index: number) {
    if (this.steps.length > 1) {
      this.steps.removeAt(index);
      this.reorderSteps();
    }
  }

  reorderSteps() {
    this.steps.controls.forEach((control, index) => {
      control.patchValue({ orderNumber: index + 1 });
    })
  }

  moveStepUp(index: number) {
    if (index > 0) {
      const step = this.steps.at(index);
      this.steps.removeAt(index);
      this.steps.insert(index - 1, step)
      this.reorderSteps();
    }
  }

  moveStepDown(index: number) {
    if (index < this.steps.length - 1) {
      const step = this.steps.at(index);
      this.steps.removeAt(index);
      this.steps.insert(index + 1, step);
      this.reorderSteps();
    }
  }

  loadMethod(id: number) {
    this.service.findById(id).subscribe(data => {
      this.form.patchValue({
        name: data.name,
        type: data.type,
        waterTemperature: data.waterTemperature,
        description: data.description,
        coffeeDescription: {
          grindSize: data.coffeeDescription.grindSize,
          roastLevel: data.coffeeDescription.roastLevel,
          coffeeGrams: data.coffeeDescription.coffeeGrams
        }
      });

      this.steps.clear();
      data.steps.forEach(step => {
        this.steps.push(this.createStep(
          step.orderNumber,
          step.amountGrams,
          step.instructions
        ));
      });
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData: CoffeeMethodSaveDto = this.form.value;

      if (this.isEditMode && this.methodId) {
        this.service.update(this.methodId, formData).subscribe(() => { this.router.navigate(['coffee-methods', this.methodId]) });
      } else {
        this.service.create(formData).subscribe(() => {
          this.router.navigate(['coffee-methods']);
        });
      }
    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onCancel() {
    this.router.navigate(['coffee-methods']);
  }
}
