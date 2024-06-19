import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../constants';
import { PlantRequest, PlantResponse, PlantUpdate } from '../model/common.model';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private _http: HttpClient) { }

  getAllPlants() {
    return this._http.get<PlantResponse[]>(ApiEndpoints.Plant.GetAllPlants)
  }

  getPlantById(id:string) {
    return this._http.get<PlantResponse>(ApiEndpoints.Plant.GetPlantById(id))
  }

  createPlant(payload: PlantRequest) {
    return this._http.post<PlantResponse>(ApiEndpoints.Plant.CreatePlant, payload)
  }

  deletePlantById(id:number) {
    return this._http.delete<void>(ApiEndpoints.Plant.DeletePlant(id))
  }

  updatePlantById(id:number, payload: PlantUpdate) {
    return this._http.put<PlantResponse>(ApiEndpoints.Plant.UpdatePlant(id), payload)
  }
}
