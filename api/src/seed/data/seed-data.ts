import * as bcrypt from 'bcrypt';
import { User } from 'src/auth/entities/user.entity';
import { RaffleStatus } from 'src/raffle/entities/raffle.entity';
// Generated by https://quicktype.io

interface RaffleSeed {
  title: string;
  description: string;
  deadLine: string;
  prizes: Prize[];
  winner?: User;
  status?: RaffleStatus;
  participants?: User[];
}

interface Prize {
  title: string;
}

interface SeedUser {
  email: string;
  password: string;
  roles: string[];
  isGuildMember: boolean;
  discordId: string;
  username: string;
}

interface SeedData {
  raffles: RaffleSeed[];
  users: SeedUser[];
}
export const initialData: SeedData = {
  raffles: [
    {
      title: 'Sorteo de la Comunidad de Desarrolladores Web',
      description:
        '¡Participa en nuestro sorteo de la comunidad de desarrolladores web y podrías ganar premios que te ayudarán a impulsar tus habilidades!',
      deadLine: '2024-04-30',
      prizes: [
        {
          title: 'Un curso en línea de desarrollo web',
        },
        {
          title: 'Una suscripción premium a una plataforma de desarrollo',
        },
        {
          title: 'Una membresía a una comunidad exclusiva de desarrolladores',
        },
      ],
    },
    {
      title: 'Gran Sorteo de la Comunidad de Diseñadores UX/UI',
      description:
        '¡Únete al gran sorteo de la comunidad de diseñadores UX/UI y podrías ganar premios que mejorarán tu experiencia en el diseño web!',
      deadLine: '2024-06-30',
      prizes: [
        {
          title: 'Un libro sobre principios de diseño UX/UI',
        },
        {
          title: 'Una suscripción a herramientas de prototipado',
        },
      ],
    },
    {
      title: 'Sorteo de la Comunidad de Desarrolladores Frontend',
      description:
        '¡Participa en el sorteo de la comunidad de desarrolladores frontend y podrías ganar herramientas que optimizarán tu desarrollo web!',
      deadLine: '2024-09-30',
      prizes: [
        {
          title: 'Una licencia de un framework popular de frontend',
        },
      ],
    },
  ],

  users: [
    {
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['admin'],
      isGuildMember: true,
      discordId: '12345',
      username: 'Administrador Real',
    },

    {
      email: 'user@gmail.com',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['user'],
      isGuildMember: true,
      discordId: '3212',
      username: 'Desarrollador incomprendido',
    },
    {
      email: 'user777@gmail.com',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['user'],
      isGuildMember: true,
      discordId: '13212',
      username: 'SuperHtmlFase3',
    },
    {
      email: 'user2@gmail.com',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['user'],
      isGuildMember: true,
      discordId: '3212',
      username: 'NoAngularNoLife',
    },
    {
      email: 'user3@gmail.com',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['user'],
      isGuildMember: true,
      discordId: '32112',
      username: 'el pepe',
    },
  ],
};
