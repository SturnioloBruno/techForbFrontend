import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { PlantResponse, PlantWithFlag } from '../../../core/model/common.model';
import { PopupCreateComponent } from './popup-create/popup-create.component';
import { SwitchService } from './switch.service';
import { PopupEditComponent } from './popup-edit/popup-edit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { PopupDeleteComponent } from './popup-delete/popup-delete.component';
import { BanderaService } from '../../../core/services/bandera.service';
import { forkJoin, map, of } from 'rxjs';

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
export class PlantsTableComponent implements OnInit, OnChanges {
  @Output() eventPlantsModified = new EventEmitter<void>();

  switchCreate?: boolean;
  switchEdit?: boolean;
  switchDelete?: boolean;
  @Input()
  plants: PlantResponse[] = [];
  selectedPlant!: PlantResponse;
  plantsWithFlag: PlantWithFlag[] = [];
  countries: { [key: string]: string } = {};

  constructor(private switchService: SwitchService, private banderaService: BanderaService) { }

  ngOnInit(): void {
    this.switchService.$modalCreate.subscribe((valor) => {
      this.switchCreate = valor;
    });
    this.switchService.$modalEdit.subscribe((valor) => {
      this.switchEdit = valor;
    });
    this.switchService.$modalDelete.subscribe((valor) => {
      this.switchDelete = valor;
    });

    this.banderaService.cargarPaisesYCodigo().subscribe({
      next: (response) => {
        this.countries = response;
        this.syncPlantsWithFlag();
      },
      error: (error) => {
        console.error('Error al cargar códigos de países:', error);
      }
    });
  }

  ngOnChanges(): void {
    // Aquí puedes manejar los cambios en la propiedad plantsWithFlag
    console.log('Se detectaron cambios en plantsWithFlag:', this.plantsWithFlag);
    console.log('Se detectaron cambios en plants:', this.plants);
    // Puedes realizar acciones adicionales aquí si es necesario
    this.syncPlantsWithFlag();
  }

  syncPlantsWithFlag() {
    // Limpiar plantsWithFlag para sincronizar desde cero
    this.plantsWithFlag = [];
    if (this.plants.length > this.plantsWithFlag.length) {
      const observables = this.plants.map(plant => {
        const exists = this.plantsWithFlag.some(p => p.id === plant.id);
        if (!exists) {
          return this.banderaService.obtenerImagen(plant.country).pipe(
            map(flagUrl => {
              const plantWithFlag: PlantWithFlag = {
                ...plant,
                flag: flagUrl
              };
              return plantWithFlag;
            })
          );
        }
        return of(null);
      });

      forkJoin(observables).subscribe({
        next: (results) => {
          results.forEach(result => {
            if (result) {
              this.plantsWithFlag.push(result);
            }
          });
        },
        error: (error) => {
          console.error('Error al obtener las banderas:', error);
        }
      });
    }
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

  addPlant(plantWithFlag: PlantWithFlag) {
    this.plantsWithFlag.push(plantWithFlag);
    const plant: PlantResponse = {
      id: plantWithFlag.id,
      name: plantWithFlag.name,
      country: plantWithFlag.country,
      totalReadings: plantWithFlag.totalReadings,
      totalMediumAlerts: plantWithFlag.totalMediumAlerts,
      totalRedAlerts: plantWithFlag.totalRedAlerts,
      sensorsDisabled: plantWithFlag.sensorsDisabled
    };
    this.plants.push(plant);
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

  editPlant(plant: PlantResponse) {
    if (this.plants) {
      const index = this.plants.findIndex(p => p.id === plant.id);
      if (index !== -1) {
        this.plants[index] = plant;
      }
      this.eventPlantsModified.emit();
    }
  }

}
