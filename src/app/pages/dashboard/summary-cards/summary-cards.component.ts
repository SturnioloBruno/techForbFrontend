import { Component, Input, OnInit } from '@angular/core';
import { PlantService } from '../../../core/services/plant.service';
import { PlantResponse } from '../../../core/model/common.model';

@Component({
  selector: 'app-summary-cards',
  standalone: true,
  imports: [],
  templateUrl: './summary-cards.component.html',
  styleUrl: './summary-cards.component.scss'
})
export class SummaryCardsComponent{

  @Input()
  totalReadings ?: number;
  @Input()
  totalMediumAlerts ?: number;
  @Input()
  totalRedAlerts ?: number;
  @Input()
  totalSensorsDisabled ?: number;
  @Input()
  plants: PlantResponse[] = [];

}
