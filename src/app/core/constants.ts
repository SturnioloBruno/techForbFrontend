const apiUrl: string = 'http://localhost:8088/api/v1';

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
    }
}

export const LocalStorage = {
    token: 'USER_TOKEN',
}