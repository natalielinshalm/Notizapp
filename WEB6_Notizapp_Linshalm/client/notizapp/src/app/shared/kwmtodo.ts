import { kwmnote } from './kwmnote';
import { kwmlist } from './kwmlist';
import { kwmtag } from './kwmtag';
export { kwmnote, kwmlist, kwmtag };


export class kwmtodo {
  constructor(
    public id: number,
    public title: string,
    public dueDate: Date,
    public note_id: number, // Fremdschlüssel, der auf die Notiz verweist
    public description?: string, //optional
  ) {}
}
