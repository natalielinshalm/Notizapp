export class ErrorMessage{
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ){}
}

export const ListFormErrorMessages:ErrorMessage[] = [
  new ErrorMessage('name', 'required', 'Ein Name muss angegeben werden'),
  new ErrorMessage('name', 'minlength', 'Der Name muss mindestens drei Zeichen enthalten'),
  new ErrorMessage('name', 'maxlength', 'Der Name darf höchstens 30 Zeichen enthalten'),
  new ErrorMessage('user_id', 'required', 'Ein User muss angegeben werden'),
  new ErrorMessage('user_id', 'userIdFormat', 'Der User darf nicht unter 1 liegen'),
  new ErrorMessage('createdAt', 'required', 'Ein Datum muss angegeben werden'),
];
