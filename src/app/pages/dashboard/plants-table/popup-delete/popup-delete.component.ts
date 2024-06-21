import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { SwitchService } from '../switch.service';
import { PlantResponse } from '../../../../core/model/common.model';
import { PlantService } from '../../../../core/services/plant.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-popup-delete',
  standalone: true,
  imports: [],
  templateUrl: './popup-delete.component.html',
  styleUrl: './popup-delete.component.scss'
})
export class PopupDeleteComponent{

  

  @Output() eventPlantResponse = new EventEmitter<PlantResponse>();

  @Input()
  plantResponse ?: PlantResponse;

  constructor(
    private switchService : SwitchService,
    private plantService: PlantService
  ){}

  closeModalDelete() {
    this.switchService.$modalDelete.emit(false);
  }

  deletePlant(plant: PlantResponse) {
    if(plant && plant.id) {
      this.plantService.deletePlantById(plant.id).subscribe({
        next: () => {
          this.eventPlantResponse.emit(plant);
          this.switchService.$modalDelete.emit(false);
        },
        error: (err) => {
          console.log(err.error);
        }
      })
    }else{
      console.log("No encuentro la planta a eliminar, prueba refrescar la pagina");     
    }
  }
}
