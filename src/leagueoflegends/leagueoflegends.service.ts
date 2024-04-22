import { Injectable } from '@nestjs/common';

@Injectable()
export class LeagueoflegendsService {
    async findAllChampions(languageCode: string = 'en_US', patchVersion: string  = '14.8.1'){
        const URL = `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/data/${languageCode}/champion.json`;
        const response = await fetch(URL,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        });
        const data = response.json();
        return data;
    }
}



