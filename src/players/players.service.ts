import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import {v4 as uuidv4} from 'uuid'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDTO } from './dtos/update-player.dto';
@Injectable()
export class PlayersService {

    private players: Player[] = [];

    constructor(@InjectModel('Player') private readonly playerModule: Model<Player>){}

    private readonly logger = new Logger(PlayersService.name);
    
    async createPlayer(createPlayerDTO : CreatePlayerDTO) : Promise<Player>{
        const {email} = createPlayerDTO;

        const playerExits = await this.playerModule.findOne({email}).exec();

        if(playerExits){
            throw new BadRequestException(`Jogador com o e-mail ${email} já cadastrado.`)
           
        }
        const playerCreated = new this.playerModule(createPlayerDTO);
        return await playerCreated.save();
    }

    async updatePlayer(_id: string,updatePlayerDTO : UpdatePlayerDTO) : Promise<void>{

        const playerExits = await this.playerModule.findOne({_id}).exec();

        if(!playerExits){
            throw new NotFoundException(`Jogador com o id ${_id} não encontrado.`)
        }
         await this.playerModule.findOneAndUpdate({_id}, {$set: updatePlayerDTO}).exec();
    }

    async searchPlayers() : Promise<Player[]>{
        return await this.playerModule.find().exec();
    }

    async deletePlayer(_id: string) : Promise<any>{
        const playerExits = await this.playerModule.findOne({_id}).exec();

        if(!playerExits){
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
        }

        return await this.playerModule.deleteOne({_id}).exec();
    }

    async searchPlayersById(_id: string) : Promise<Player>{
        const playerExits = await this.playerModule.findOne({_id}).exec();
        if(!playerExits){
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
        }
        return playerExits;
    }
}
