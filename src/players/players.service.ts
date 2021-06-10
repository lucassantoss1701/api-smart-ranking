import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import {v4 as uuidv4} from 'uuid'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class PlayersService {

    private players: Player[] = [];

    constructor(@InjectModel('Player') private readonly playerModule: Model<Player>){}

    private readonly logger = new Logger(PlayersService.name);
    
    async createUpdatePlayer(createPlayerDTO : CreatePlayerDTO) : Promise<void>{
        const {email} = createPlayerDTO;

        //const playerExits =  this.players.find(player => player.email === email);

        const playerExits = await this.playerModule.findOne({email}).exec();

        if(playerExits){
            this.updatePlayer(createPlayerDTO);
        }else{
            this.create(createPlayerDTO);
        }
    }

    async searchPlayers() : Promise<Player[]>{
        return await this.playerModule.find().exec();
    }

    async deletePlayer(email: string) : Promise<any>{
        return await this.playerModule.deleteOne({email}).exec();
    }

    async searchPlayersByEmail(email: string) : Promise<Player>{
        const playerExits = await this.playerModule.findOne({email}).exec();
        if(!playerExits){
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }
        return playerExits;
    }

    private async create(createPlayerDTO: CreatePlayerDTO): Promise<Player>{
        const playerCreated = new this.playerModule(createPlayerDTO);
        return await playerCreated.save();
    }

    private async updatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<Player>{
        return await this.playerModule.findOneAndUpdate({email: createPlayerDTO.email}, {$set: createPlayerDTO}).exec();
    }
}
