const apiUrl: string = 'http://tech-forb-production.up.railway.app/api/v1';

export const ApiEndpoints = {
    Auth:{
        Register: `http://tech-forb-production.up.railway.app/api/v1/auth/register`,
        Login: `http://tech-forb-production.up.railway.app/api/v1/auth/authenticate`
    },
    User:{
        Me: `${apiUrl}/users/me`
    },
    Plant:{
        GetAllPlants: `http://tech-forb-production.up.railway.app/api/v1/plants`,
        GetPlantById: (id: string) => `http://tech-forb-production.up.railway.app/api/v1/plants/${id}`,
        CreatePlant: `http://tech-forb-production.up.railway.app/api/v1/plants`,
        DeletePlant: (id: number) => `http://tech-forb-production.up.railway.app/api/v1/plants/${id}`,
        UpdatePlant: (id: number) => `http://tech-forb-production.up.railway.app/api/v1/plants/${id}`
    }
}

export const LocalStorage = {
    token: 'USER_TOKEN',
}