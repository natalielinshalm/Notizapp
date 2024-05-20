import {kwmlist, kwmtag} from "./kwmtag";

export class TagFactory {
  static empty(): kwmtag {
    return new kwmtag(0, '');
  }

  static fromObject(rawkwmtag: any):kwmtag {
    return new kwmtag(
      rawkwmtag.tag_id,
      rawkwmtag.title
    );
}
}
