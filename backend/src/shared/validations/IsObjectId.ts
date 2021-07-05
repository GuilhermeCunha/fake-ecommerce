import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Types } from 'mongoose';

@ValidatorConstraint({ name: 'ObjectId', async: false })
export class IsObjectId implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments): boolean {
    if (!text) return false;

    const stringValue =
      typeof text === 'string' ? text : String(text).toString();
    return Types.ObjectId.isValid(stringValue);
  }

  defaultMessage(args: ValidationArguments): string {
    return `[${args.property}] - '${args.value}' não é um Id do MongoDB válido`;
  }
}
