import { Injectable } from '@nestjs/common';

@Injectable()
export class SummonerService {
  async getSummonerPuiid(tagLine: string, gameName: string, region: string) {
    // console.log(`tagLine: ${tagLine}, gameName: ${gameName}, region: ${region}`);
    const URL = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=RGAPI-3d1dcee4-17df-4f9d-a47a-71d7bde0115a`;
    const response =
    await fetch(`${URL}`,{
      method: 'GET',
      headers: {
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  }
}
