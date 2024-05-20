import { kwmnote } from './kwmnote';
import { kwmtodo } from './kwmtodo';
import { kwmlist } from './kwmlist';
export { kwmnote, kwmtodo, kwmlist };

export class kwmtag {
  constructor(
    public id: number,
    public title: string
  ) {}
}
