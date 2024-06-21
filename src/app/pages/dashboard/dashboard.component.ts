import { Component, Input, OnInit, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ApiResponse, PlantResponse, Sensor, SensorType, User } from '../../core/model/common.model';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SummaryCardsComponent } from './summary-cards/summary-cards.component';
import { PlantsTableComponent } from './plants-table/plants-table.component';
import { SensorCardComponent } from './sensor-card/sensor-card.component';
import { PlantService } from '../../core/services/plant.service';
import { BanderaService } from '../../core/services/bandera.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UserProfileComponent, SummaryCardsComponent, PlantsTableComponent, SensorCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);
  user!: User;

  totalReadings ?: number;
  totalMediumAlerts ?: number;
  totalRedAlerts ?: number;
  totalSensorsDisabled ?: number;
  plants: PlantResponse[] = [];

  sensors: Sensor[] = [
    { id: 1, sensorType: SensorType.TEMPERATURA, readings: 150, mediumAlerts: 10, redAlerts: 2, isEnabled: true, icon:'../../../../assets/icons/temperatura.png' },
    { id: 2, sensorType: SensorType.PRESION, readings: 200, mediumAlerts: 20, redAlerts: 5, isEnabled: true, icon:'../../../../assets/icons/presion.png' },
    { id: 3, sensorType: SensorType.ENERGIA, readings: 120, mediumAlerts: 5, redAlerts: 1, isEnabled: true, icon:'../../../../assets/icons/energia.png' },
    { id: 4, sensorType: SensorType.TENSION, readings: 180, mediumAlerts: 15, redAlerts: 3, isEnabled: true, icon:'../../../../assets/icons/tension.png' },
    { id: 5, sensorType: SensorType.VIENTO, readings: 160, mediumAlerts: 8, redAlerts: 0, isEnabled: true, icon:'../../../../assets/icons/viento.png' },
    { id: 6, sensorType: SensorType.NIVELES, readings: 130, mediumAlerts: 12, redAlerts: 4, isEnabled: true, icon:'../../../../assets/icons/niveles.png' },
    { id: 7, sensorType: SensorType.MONOXIDO_DE_CARBONO, readings: 140, mediumAlerts: 10, redAlerts: 2, isEnabled: true, icon:'../../../../assets/icons/monoxido.png' },
    { id: 8, sensorType: SensorType.OTROS_GASES, readings: 170, mediumAlerts: 6, redAlerts: 1, isEnabled: true, icon:'../../../../assets/icons/otros-gases.png' },
  ];
  
  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.authService.me().subscribe({
      next: (response: User) => {
        if (response) {
          this.user = response as User;
        }
      },
      error: (error) => {
        console.error('Error fetching user profile:', error);
      }
    });

    this.loadPlants();
  }

  loadPlants() {
    this.plantService.getAllPlants().subscribe(plants => {
      this.plants = plants;
      this.calculateTotals();      
    })
  }

  calculateTotals() {
    this.totalReadings = this.plants.reduce((sum, plant) => sum + plant.totalReadings, 0);
    this.totalMediumAlerts = this.plants.reduce((sum, plant) => sum + plant.totalMediumAlerts, 0);
    this.totalRedAlerts = this.plants.reduce((sum, plant) => sum + plant.totalRedAlerts, 0);
    this.totalSensorsDisabled = this.plants.reduce((sum, plant) => sum + plant.sensorsDisabled, 0);
  }

  logout(){
    this.authService.logout();
  }
}
