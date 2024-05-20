import { kwmnote } from './kwmnote';
import { kwmtag} from "./kwmtag";
import { kwmtodo} from "./kwmtodo";
export { kwmnote, kwmtodo, kwmtag };

export class kwmlist {
  constructor(
    public id: number,
    public name: string,
    public user_id: number, // Fremdschlüssel auf kwmusers
    public createdAt: Date
  ) {}
}
