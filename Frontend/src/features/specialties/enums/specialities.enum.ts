export enum SectionEnum{
    Laboral = "Laboral",
    Civil = "Civil",
    Familiar = "Familiar"
}

export enum InformationTypeEnum{
    section = "section",
    selection = "selection"
}

export enum FormErrorEnum{
    InconsistentDates = "La fecha de entrada es posterior a la de salida",
    EmptyDate = "Ingrese todas las fechas",
    NegativeSalary = "El salario debe ser mayor que 0",
}