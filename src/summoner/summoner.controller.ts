import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SummonerService } from './summoner.service';

@Controller('summoner')
export class SummonerController {
  constructor(private readonly summonerService: SummonerService) {}

  @Get('summoner-puiid')
  getSummonerPuiid(
    @Query('gameName') gameName:string,
    @Query('tagLine') tagLine:string,
    @Query('region') region:string,
  ){
    return this.summonerService.getSummonerPuiid(tagLine, gameName, region);
  }
}
