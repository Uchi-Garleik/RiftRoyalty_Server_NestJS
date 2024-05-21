import { Injectable } from '@nestjs/common';
import { response } from 'express';
import { ConfigModule } from '@nestjs/config';

@Injectable()
export class SummonerService {
    async getSummonerPuiid(tagLine: string, gameName: string, region: string) {
        // console.log(`tagLine: ${tagLine}, gameName: ${gameName}, region: ${region}`);
        const URL = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${process.env.API_KEY}`;
        const response =
            await fetch(`${URL}`, {
                method: 'GET',
                headers: {
                },
            });
        const data = await response.json();
        console.log(data);
        return data;
    }

    // function called by native to get top 5 players of the selected region
    async getTopPlayersWorld(region: string) {
        const regions = ["BR1", "EUN1", "EUW1", "JP1", "KR", "LA1", "LA2", "NA1", "OC1", "PH2", "RU", "SG2", "TH2", "TR1", "TW2", "VN2"];
        let URL = "";
        URL = `https://${region}.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${process.env.API_KEY}`;
        console.log(URL);
        // retrieves summonerId, wins, losses, leaguePoints, uses regions euw1, na1...
        const response = await fetch(URL, {});
        const data = (await response.json()).entries;
        const sortedData = data.sort((a, b) => b.leaguePoints - a.leaguePoints).slice(0, 5);
        const promises = sortedData.map(async element => {
            const summonerData = await this.getSummonerBySummonerID(element.summonerId, region);
            const detailsData = await this.getSummonerByPuuid(region, summonerData.puuid);
            return {
                summonerLevel: summonerData.summonerLevel,
                leaguePoints: element.leaguePoints,
                tagLine: detailsData.tagLine,
                gameName: detailsData.gameName,
                wins: element.wins,
                losses: element.losses,
                profileIconId: summonerData.profileIconId,
            };
        });

        const results = await Promise.all(promises);
        let json = '[';
        let counter = 1;
        results.forEach(result => {
            json += `{"id": ${counter++}, "summonerLevel": ${result.summonerLevel}, "leaguePoints": ${result.leaguePoints}, "tagLine": "${result.tagLine}", "gameName": "${result.gameName}", "wins": ${result.wins}, "losses": ${result.losses}, "profileIconId": "${result.profileIconId}"},`;
        });
        json = json.substring(0, json.length - 1);
        json += ']';
        console.log(json);
        return json;
    }

    async getSummonerBySummonerID(summonerId: string, region: string) {
        const URL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}?api_key=${process.env.API_KEY}`;
        const response = await fetch(URL, {});
        const data = (await response.json());
        return data;
        // retrieves puuid, profileIconId, summonerLevel, uses regions euw1, na1...
    }

    async getSummonerByPuuid(region: string, puuid: string) {
        // BR1", "EUN1", "EUW1", "JP1", "KR", "LA1", "LA2", "NA1", "OC1", "PH2", "RU", "SG2", "TH2", "TR1", "TW2", "VN2
        if (region == "BR1" || region == "LA1" || region == "LA2" || region == "NA1") {
            region = "AMERICAS";
        } else if (region == "EUN1" || region == "EUW1" || region == "RU" || region == "TR1") {
            region = "EUROPE"
        }else{
            region = "ASIA"
        }
        const URL = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}?api_key=${process.env.API_KEY}`;
        const response = await fetch(URL, {});
        const data = (await response.json());
        console.log(data);
        return data;
        // retrieves gameName, tagLine, uses continents: EUROPE, AMERICAS, ASIA, ESPORTS
    }

}
