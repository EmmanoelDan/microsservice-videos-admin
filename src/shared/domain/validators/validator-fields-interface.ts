export type FieldsErrors = {
    [fields: string]: string[];
};

export interface IValidatorFields<PropsValidated> {
    errors: FieldsErrors | null;
    validatedData: PropsValidated | null;
    validate(data: any): boolean;
}
