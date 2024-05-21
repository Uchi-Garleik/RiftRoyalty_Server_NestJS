import { Controller, Get, Query } from '@nestjs/common';
import { LeagueoflegendsService } from './leagueoflegends.service';

@Controller('leagueoflegends')
export class LeagueoflegendsController {
    constructor(private readonly leagueoflegendsService: LeagueoflegendsService) { }

    @Get('allChampions')
    findAllChampions(
        @Query('languageCode') languageCode: string = 'en_US',
        @Query('patchVersion') patchVersion: string = '14.8.1'
    ) {
        return this.leagueoflegendsService.findAllChampions(languageCode, patchVersion);
    }
}
