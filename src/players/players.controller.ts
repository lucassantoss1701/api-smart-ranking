import { Body, Controller, Get, Post } from '@nestjs/common';
import {CreatePlayerDTO} from './dtos/create-player.dto'
import { Player } from './interfaces/player.interface';
import {PlayersService} from './players.service';

@Controller('api/v1/players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService){}

    @Post()
    async createUpdatePlayer(@Body() createPlayerDTO: CreatePlayerDTO){
        await this.playersService.createUpdatePlayer(createPlayerDTO);
    }

    @Get()
    async searchPlayers() : Promise<Player[]>{
        return this.playersService.searchPlayers();
    }
}
