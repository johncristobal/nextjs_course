interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    createdAt: number;
    status: string;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'ped sldjsl asdaslk asd a',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'prog sldjsl asdaslk asd a',
            status: 'inprogress',
            createdAt: Date.now()
        },
        {
            description: 'finis sldjsl asdaslk asd a',
            status: 'finished',
            createdAt: Date.now() - 100000
        }
    ]
}