import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SwitchService } from '../switch.service';
import { PlantResponse, PlantUpdate } from '../../../../core/model/common.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlantService } from '../../../../core/services/plant.service';

@Component({
  selector: 'app-popup-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './popup-edit.component.html',
  styleUrl: './popup-edit.component.scss'
})
export class PopupEditComponent implements OnInit{

  @Output() eventPlantResponse = new EventEmitter<PlantResponse>();

  form!: FormGroup;

  @Input()
  plantResponse !: PlantResponse;

  constructor(private switchService : SwitchService,
    private fb: FormBuilder, private plantService:PlantService){ }


  ngOnInit(): void {
    this.form = this.fb.group({
        name: new FormControl(this.plantResponse.name, [Validators.required]),
        country: new FormControl(this.plantResponse.country, [Validators.required]),
        totalReadings: new FormControl(this.plantResponse.totalReadings, [Validators.required]),
        sensorsDisabled: new FormControl(this.plantResponse.sensorsDisabled, [Validators.required]),
        mediumAlerts: new FormControl(this.plantResponse.totalMediumAlerts, [Validators.required]),
        redAlerts: new FormControl(this.plantResponse.totalRedAlerts, [Validators.required])
      });
  }


  closeModalEdit() {
    this.switchService.$modalEdit.emit(false);
  }

  editPlant(id:number) {
    const plantUpdate: PlantUpdate = {
      name: this.form.get('name')?.value ,
      country: this.form.get('country')?.value ,
      totalReadings: this.form.get('totalReadings')?.value,
      sensorsDisabled: this.form.get('sensorsDisabled')?.value,
      mediumAlerts: this.form.get('mediumAlerts')?.value,
      redAlerts: this.form.get('redAlerts')?.value
    }
    this.plantService.updatePlantById(id, plantUpdate).subscribe({
      next: (response) => {
        this.eventPlantResponse.emit(response);
        this.switchService.$modalEdit.emit(false);
      },
      error: (err) => {
        console.log(err.error);       
      }
    })
  }

}
