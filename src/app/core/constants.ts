const apiUrl: string = 'https://tech-forb-production.up.railway.app/api/v1';
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
        GetBandera: (codigo: string) =>`${apiUrl}/proxy/banderas/${codigo}`
    }
}

export const LocalStorage = {
    token: 'USER_TOKEN',
}