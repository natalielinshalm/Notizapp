import { FormControl, ValidationErrors } from '@angular/forms';
export class ListValidators {


  //hier wird geprüft ob die Eingabe eine Zahl ist und ob diese größer als 0 ist
  static userIdFormat(control: FormControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    return control.value > 0 ? null : { userIdFormat: { valid: false } };
  }
}
