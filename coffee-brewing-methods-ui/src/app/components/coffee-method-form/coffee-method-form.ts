import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  CoffeeMethodSaveDto,
  CoffeeMethodType,
  CoffeeMethodTypeLabels,
  GrindSize,
  GrindSizeLabels,
  RoastLevel,
  RoastLevelLabels,
} from '../../models';
import { CoffeeMethodService } from '../../services/service';

@Component({
  selector: 'app-coffee-method-form',
  templateUrl: './coffee-method-form.html',
})
export class CoffeeMethodForm implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  methodId?: number;
  submitting = false;

  coffeeMethodTypes = Object.values(CoffeeMethodType);
  grindSizes = Object.values(GrindSize);
  roastLevels = Object.values(RoastLevel);

  private fb: FormBuilder = inject(FormBuilder);
  private service: CoffeeMethodService = inject(CoffeeMethodService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.initForm();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.methodId = +params['id'];
        this.loadMethod(this.methodId);
      }
    });
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      waterTemperature: [
        93,
        [Validators.required, Validators.min(50), Validators.max(100)],
      ],
      description: ['', Validators.required],

      coffeeDescription: this.fb.group({
        grindSize: ['', Validators.required],
        roastLevel: ['', Validators.required],
        coffeeGrams: [
          15,
          [Validators.required, Validators.min(1), Validators.max(100)],
        ],
      }),

      steps: this.fb.array([]),
    });

    this.addStep();
  }

  get steps(): FormArray {
    return this.form.get('steps') as FormArray;
  }

  get coffeeDescription(): FormGroup {
    return this.form.get('coffeeDescription') as FormGroup;
  }

  createStep(
    orderNumber?: number,
    amountGrams?: number,
    instructions?: string,
  ): FormGroup {
    return this.fb.group({
      orderNumber: [orderNumber || this.steps.length + 1, Validators.required],
      amountGrams: [amountGrams || 0, [Validators.required, Validators.min(0)]],
      instructions: [instructions || '', Validators.required],
    });
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
    });
  }

  moveStepUp(index: number) {
    if (index > 0) {
      const step = this.steps.at(index);
      this.steps.removeAt(index);
      this.steps.insert(index - 1, step);
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
    this.service.findById(id).subscribe((data) => {
      this.form.patchValue({
        name: data.name,
        type: data.type,
        waterTemperature: data.waterTemperature,
        description: data.description,
        coffeeDescription: {
          grindSize: data.coffeeDescription.grindSize,
          roastLevel: data.coffeeDescription.roastLevel,
          coffeeGrams: data.coffeeDescription.coffeeGrams,
        },
      });

      this.steps.clear();
      data.steps.forEach((step) => {
        this.steps.push(
          this.createStep(
            step.orderNumber,
            step.amountGrams,
            step.instructions,
          ),
        );
      });
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitting = true;
      const formData: CoffeeMethodSaveDto = this.form.value;

      if (this.isEditMode && this.methodId) {
        this.service.update(this.methodId, formData).subscribe({
          next: () => {
            this.submitting = false;
            this.router.navigate(['/coffee-methods', this.methodId]);
          },
          error: (err) => {
            console.error('Erro ao atualizar:', err);
            this.submitting = false;
          },
        });
      } else {
        this.service.create(formData).subscribe({
          next: () => {
            this.submitting = false;
            this.router.navigate(['/coffee-methods']);
          },
          error: (err) => {
            console.error('Erro ao criar:', err);
            this.submitting = false;
          },
        });
      }
    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/coffee-methods']);
  }

  // Helper methods para labels
  getMethodTypeLabel(type: CoffeeMethodType): string {
    return CoffeeMethodTypeLabels[type] || type;
  }

  getGrindSizeLabel(size: GrindSize): string {
    return GrindSizeLabels[size] || size;
  }

  getRoastLevelLabel(level: RoastLevel): string {
    return RoastLevelLabels[level] || level;
  }
}
