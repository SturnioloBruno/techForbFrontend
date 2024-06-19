import { Component, Input } from '@angular/core';
import { Sensor } from '../../../core/model/common.model';

@Component({
  selector: 'app-sensor-card',
  standalone: true,
  imports: [],
  templateUrl: './sensor-card.component.html',
  styleUrl: './sensor-card.component.scss'
})
export class SensorCardComponent {
  @Input()
  sensor ?: Sensor;
}
