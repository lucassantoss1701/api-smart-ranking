import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import {v4 as uuidv4} from 'uuid'
@Injectable()
export class PlayersService {

    private players: Player[] = [];
    private readonly logger = new Logger(PlayersService.name);
    
    async createUpdatePlayer(createPlayerDTO : CreatePlayerDTO) : Promise<void>{
        const {email} = createPlayerDTO;

        const playerExits =  this.players.find(player => player.email === email);

        if(playerExits){
            this.updatePlayer(playerExits, createPlayerDTO);
        }else{
            this.create(createPlayerDTO);
        }
    }

    async searchPlayers() : Promise<Player[]>{
        return this.players;
    }

    async deletePlayer(email: string) : Promise<void>{
        const playerExits =  this.players.find(player => player.email === email);
        if(!playerExits){
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }
        this.players = this.players.filter(player => player.email !== playerExits.email);
    }

    async searchPlayersByEmail(email: string) : Promise<Player>{
        const playerExits =  this.players.find(player => player.email === email);
        if(!playerExits){
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }
        return playerExits;
    }

    private create(createPlayerDTO: CreatePlayerDTO): void{
        const { name, email, phoneNumber} = createPlayerDTO;

        const player: Player = {
            _id: uuidv4(),
            name,
            phoneNumber,
            email,
            ranking: "A",
            rankingPosition: 1,
            urlPlayerPhoto: "www.google.com.br/photo123.jpg"
        };

        this.logger.log(`createPlayerDTO: ${JSON.stringify(player)}`)

        this.players.push(player);
    }

    private updatePlayer(playerExits: Player, createPlayerDTO: CreatePlayerDTO): void{
        const { name } = createPlayerDTO;
        playerExits.name = name;
    }
}
