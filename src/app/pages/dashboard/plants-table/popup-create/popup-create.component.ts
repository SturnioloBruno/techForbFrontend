import { Component, EventEmitter, Output } from '@angular/core';
import { SwitchService } from '../switch.service';
import { PlantRequest, PlantResponse, PlantWithFlag } from '../../../../core/model/common.model';
import { PlantService } from '../../../../core/services/plant.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BanderaService } from '../../../../core/services/bandera.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-popup-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './popup-create.component.html',
  styleUrl: './popup-create.component.scss'
})
export class PopupCreateComponent {

  form: FormGroup;
  plantResponseWithFlag ?: PlantWithFlag;
  urlFlag:string = 'ar';
  
  @Output() eventPlantWithFlag = new EventEmitter<PlantWithFlag>();

  constructor(
    private switchService: SwitchService,
    private plantService : PlantService,
    private fb: FormBuilder,
    private banderaService:BanderaService
  ) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required])
    })
  }

  closeModalCreate() {
    this.switchService.$modalCreate.emit(false);
  }

  onSubmit() {
    const plantRequest : PlantRequest = {
      name: this.form.get('name')!.value,
      country:this.form.get('country')!.value
    };
    this.plantService.createPlant(plantRequest).subscribe({
      next: (response) => {
        // aca deberia de hacer un eventEmmiter para mandarle la planta al padre
        this.actualizarFlag(response);
        const plantWithFlag:PlantWithFlag = {
          ...response,
          flag: this.urlFlag
        }
        this.eventPlantWithFlag.emit(plantWithFlag);
        this.switchService.$modalCreate.emit(false);
      },
      error: (err) => {
        console.log(err.error);
        
      }
    })
  }

  actualizarFlag(plant:PlantResponse){
    return this.banderaService.obtenerImagen(plant.country).pipe(
      map(flagUrl => {
        this.urlFlag = flagUrl;
      })
    );
  }
}
