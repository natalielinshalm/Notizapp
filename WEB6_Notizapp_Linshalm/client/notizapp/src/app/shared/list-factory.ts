import {kwmlist} from "./kwmlist";

export class kwmlistFactory {
  static empty(): kwmlist {
    return new kwmlist(0, '',0, new Date());
  }

  static fromObject(rawkwmlist: any):kwmlist {
    return new kwmlist(
      rawkwmlist.list_id,
      rawkwmlist.name,
      rawkwmlist.user_id,
      typeof (rawkwmlist.createdAt) === 'string' ? new Date(rawkwmlist.createdAt) : rawkwmlist.createdAt
    );
  }
}
