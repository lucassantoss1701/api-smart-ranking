import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class PlayersValidationParametersPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        if(value == null || value == ""){
            throw new BadRequestException(`O valor do parâmetro ${metadata.data} deve ser informado`)
        }
        return value;
    }

}