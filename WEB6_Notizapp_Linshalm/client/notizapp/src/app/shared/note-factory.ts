import {kwmnote} from "./kwmnote";

export class NoteFactory {
    static empty() {
        return new kwmnote(0, 0, '', '');
    }
    static fromObject(rawkwmnote: any): kwmnote {
        return new kwmnote(
            rawkwmnote.note_id,
            rawkwmnote.list_id,
            rawkwmnote.title,
            rawkwmnote.description
        );
    }
}
