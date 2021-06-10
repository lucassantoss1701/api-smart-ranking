import { Body, Controller, Delete, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import {CreatePlayerDTO} from './dtos/create-player.dto'
import { Player } from './interfaces/player.interface';
import { PlayersValidationParametersPipe } from './pipes/players-validation-parameters.pipe';
import {PlayersService} from './players.service';

@Controller('api/v1/players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService){}

    @Post()
    @UsePipes(ValidationPipe)
    async createUpdatePlayer(@Body() createPlayerDTO: CreatePlayerDTO){
        await this.playersService.createUpdatePlayer(createPlayerDTO);
    }

    @Get()
    async searchPlayers( @Query('email', PlayersValidationParametersPipe) email: string) : Promise<Player | Player[]>{
        if(email){
            return await this.playersService.searchPlayersByEmail(email);
        }else{
            return await this.playersService.searchPlayers();
        }
    }

    @Delete()
    async deletePlayer(@Query('email', PlayersValidationParametersPipe) email:string) : Promise<void>{
        this.playersService.deletePlayer(email);
    }
}
