import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import{ MongooseModule} from '@nestjs/mongoose'; 
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:930a2e.l@cluster0.06cge.mongodb.net/smartranking?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }),
    PlayersModule,
    CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
