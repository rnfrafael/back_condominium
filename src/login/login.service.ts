import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { PrismaService } from 'src/conexao/PrismaService';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) { }

  async createNewUser(createLoginDto: CreateLoginDto) {
    let { nomeUsuario, senha, exp } = createLoginDto;
    const saltRounds = 10;
    const hash = bcrypt.hashSync(senha, saltRounds);

    let novoLogin = await this.prisma.login.create({
      data: {
        nomeUsuario,
        senha: hash,
        exp
      }
    });

    return novoLogin;
  }

  async findAll() {
    return await this.prisma.login.findMany();
  }

  async findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  async findUser(nomeUsuario: string, senha: string) {

    const user = await this.prisma.login.findUnique({
      where: {
        nomeUsuario
      }
    });

    if (!user) {
      console.log('Usuario não encontrado');
    }

    if (!bcrypt.compareSync(senha, user.senha)) {
      throw new Error('Credenciais inválidas');
    }
    return user;
  }


  async update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  async remove(id: number) {
    return `This action removes a #${id} login`;
  }
}