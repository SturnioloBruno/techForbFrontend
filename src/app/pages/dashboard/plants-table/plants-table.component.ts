import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlantRequest, PlantResponse } from '../../../core/model/common.model';
import { PopupCreateComponent } from './popup-create/popup-create.component';
import { SwitchService } from './switch.service';
import { PopupEditComponent } from './popup-edit/popup-edit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { PopupDeleteComponent } from './popup-delete/popup-delete.component';


@Component({
  selector: 'app-plants-table',
  standalone: true,
  imports: [
    PopupCreateComponent,
    PopupEditComponent,
    PopupDeleteComponent,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './plants-table.component.html',
  styleUrl: './plants-table.component.scss'
})
export class PlantsTableComponent implements OnInit {
  @Output() eventPlantsModified = new EventEmitter<void>();


  switchCreate?: boolean;
  switchEdit?: boolean;
  switchDelete ?: boolean;
  @Input()
  plants?: PlantResponse[];
  selectedPlant !: PlantResponse;

  constructor(private switchService: SwitchService) { }

  ngOnInit(): void {
    this.switchService.$modalCreate.subscribe((valor) => {
      this.switchCreate = valor;
    });
    this.switchService.$modalEdit.subscribe((valor) => {
      this.switchEdit = valor;
    });
    this.switchService.$modalDelete.subscribe((valor) => {
      this.switchDelete = valor;
    })
  }

  openCreate() {
    this.switchCreate = true;
  }

  openEdit(plant: PlantResponse) {
    this.selectedPlant = plant;
    this.switchEdit = true;
  }

  openDelete(plant: PlantResponse) {
    this.selectedPlant = plant;
    this.switchDelete = true;
  }

  addPlant(plant: PlantResponse) {
    this.plants?.push(plant);
    this.eventPlantsModified.emit();
  }

  deletePlant(plant: PlantResponse) {
    if (this.plants) {
      const index = this.plants.findIndex(p => p.id === plant.id);
      if (index !== -1) {
        this.plants.splice(index, 1);
      }

      this.eventPlantsModified.emit();
    }
  }

  editPlant(plant:PlantResponse) {
    if (this.plants) {
      const index = this.plants.findIndex(p => p.id === plant.id);
      if (index !== -1) {
        this.plants[index] = plant;
      }
      
      this.eventPlantsModified.emit();
    }
  }
  

}
