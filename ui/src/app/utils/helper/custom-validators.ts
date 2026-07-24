import { SchemaPath, validate } from "@angular/forms/signals";

export function customMaxLength(path: SchemaPath<string>, options: {max: number}) {
    validate(path, ({value}) => {
        if(value().length > options?.max) {
            return { kind: 'maxlength', message: String(options.max) };
        }
        return null;
    })
}