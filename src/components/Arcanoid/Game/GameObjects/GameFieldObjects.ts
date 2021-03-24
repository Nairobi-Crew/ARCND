import { GameWindowProps, IGameFieldObjectProps } from 'Components/Arcanoid/Game/types';

export default class GameFieldObjects {
  data: IGameFieldObjectProps[] = [];

  add(item: IGameFieldObjectProps): void {
    this.data.push(item);
  }

  render(ctx: GameWindowProps | null = null): void {
    this.data
      .forEach((item) => {
        item.object.render(ctx);
      });
  }
}
