import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { SummonerModule } from './summoner/summoner.module';
import { LeagueoflegendsModule } from './leagueoflegends/leagueoflegends.module';
import { NewsModule } from './news/news.module';
import { SearchesModule } from './searches/searches.module';

// Autorizar comunicacion porque si no dara error
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PWD'),
        database: configService.get('DB_NAME'),
        entities: [join(process.cwd(),'dist/**/*.entity{.ts,.js}')],
        synchronize: true,
        ssl: true,
      }),
    }),
    UsersModule,
    SummonerModule,
    LeagueoflegendsModule,
    NewsModule,
    SearchesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
