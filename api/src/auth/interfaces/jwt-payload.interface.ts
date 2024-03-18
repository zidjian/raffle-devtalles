export interface JwtPayload {
  id: string;
  discordId: string;
  isGuildMember: boolean;
  roles: string[];
  //TODO: añadir todo lo que quiere grabar
}
