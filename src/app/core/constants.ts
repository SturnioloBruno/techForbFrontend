const apiUrl: string = 'https://tech-forb-production.up.railway.app/api/v1';

export const ApiEndpoints = {
    Auth:{
        Register: `https://tech-forb-production.up.railway.app/api/v1/auth/register`,
        Login: `https://tech-forb-production.up.railway.app/api/v1/auth/authenticate`
    },
    User:{
        Me: `https://tech-forb-production.up.railway.app/api/v1/users/me`
    },
    Plant:{
        GetAllPlants: `https://tech-forb-production.up.railway.app/api/v1/plants`,
        GetPlantById: (id: string) => `https://tech-forb-production.up.railway.app/api/v1/plants/${id}`,
        CreatePlant: `https://tech-forb-production.up.railway.app/api/v1/plants`,
        DeletePlant: (id: number) => `https://tech-forb-production.up.railway.app/api/v1/plants/${id}`,
        UpdatePlant: (id: number) => `https://tech-forb-production.up.railway.app/api/v1/plants/${id}`
    }
}

export const LocalStorage = {
    token: 'USER_TOKEN',
}