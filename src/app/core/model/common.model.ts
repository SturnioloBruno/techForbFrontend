export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string[];
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
email: string;
firstname: string;
lastname: string;
password: string;
}

export interface AuthenticationResponse {
    token?: string;
}

export interface PlantRequest {
    name: string;
    country: string;
}

export interface PlantResponse {
    id : number;
    name: string;
    country: string;
    totalReadings: number;
    totalMediumAlerts: number;
    totalRedAlerts: number;
    sensorsDisabled: number;
}

export interface PlantUpdate {
    name: string;
    country: string;
    totalReadings: number;
    sensorsDisabled: number;
    mediumAlerts: number;
    redAlerts: number;
}

export interface Sensor {
    id : number;
    sensorType: string;
    readings: number;
    mediumAlerts: number;
    redAlerts: number;
    isEnabled: boolean;
    icon: string;
}

export enum SensorType {
    TEMPERATURA = 'TEMPERATURA',
    PRESION = 'PRESION',
    ENERGIA = 'ENERGIA',
    TENSION = 'TENSION',
    VIENTO = 'VIENTO',
    NIVELES = 'NIVELES',
    MONOXIDO_DE_CARBONO = 'MONOXIDO_DE_CARBONO',
    OTROS_GASES = 'OTROS_GASES'
  }

export interface ApiResponse<T> {
    status?: boolean;
    message?: string;
    error?: string;
    data: T;
}

export interface ExceptionResponse {
    businessErrorCode : number;
    businessErrorDescription : string;
    error : string;
    validationErrors : Set<String>;
    errors : Map<string, string>;
}