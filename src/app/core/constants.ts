const apiUrl: string = 'https://localhost:8443/api/v1';
// todo usar environment
const nube: string = 'https://tech-forb-production.up.railway.app/api/v1'
const local:string = 'https://localhost:8443/api/v1'

export const ApiEndpoints = {
    Auth:{
        Register: `${apiUrl}/auth/register`,
        Login: `${apiUrl}/auth/authenticate`
    },
    User:{
        Me: `${apiUrl}/users/me`
    },
    Plant:{
        GetAllPlants: `${apiUrl}/plants`,
        GetPlantById: (id: string) => `${apiUrl}/plants/${id}`,
        CreatePlant: `${apiUrl}/plants`,
        DeletePlant: (id: number) => `${apiUrl}/plants/${id}`,
        UpdatePlant: (id: number) => `${apiUrl}/plants/${id}`
    },
    MyProxy:{
        GetCodes: `${apiUrl}/proxy/codes`,
        GetBanderaPorCodigo: (codigo: string) =>`${apiUrl}/proxy/bandera/${codigo}`,
        GetBanderaPorNombre: (nombre: string) =>`${apiUrl}/proxy/banderaAPartirDelNombre/${nombre}`
    }
}

export const LocalStorage = {
    token: 'USER_TOKEN',
}