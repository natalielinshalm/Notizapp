import { kwmlist } from './kwmlist';
import { kwmtag} from "./kwmtag";
import { kwmtodo} from "./kwmtodo";
export { kwmtodo, kwmlist, kwmtag };

export class kwmnote {
  constructor(
    public id: number,
    public list_id: number, // Fremdschlüssel, der auf die Liste verweist
    public title: string,
    public description?: string //optional
  ) {}
}
