import { DocumentType } from 'src/app/interfaces/document-type.interface';
import { Gender } from 'src/app/interfaces/gender.interface';

type CustomFieldNames = {
    [key: string]: string;
};

export const CUSTOM_FIELD_NAMES: CustomFieldNames = {
    'document_type': 'Tipo de documento',
    'document_number': 'Número de documento',
    'document_issue_date': 'Fecha de emisión del documento',
    'birth_date': 'Fecha de nacimiento',
    'gender': 'Género',
    'email': 'correo electrónico',
    'email_confirmation': 'correo electrónico',
    'pin': 'PIN',
    'pin_confirmation': 'PIN'
};

export const DOCUMENT_TYPES: DocumentType[] = [
    {
        "id": 1,
        "notation": "CC",
        "description": "Cédula de Ciudadanía"
    },
    {
        "id": 2,
        "notation": "TI",
        "description": "Tarjeta de Identidad"
    },
    {
        "id": 8,
        "notation": "NIT",
        "description": "NIT"
    },
    {
        "id": 9,
        "notation": "SE",
        "description": "Sociedad Extranjera"
    },
    {
        "id": 10,
        "notation": "OTPJ",
        "description": "Otro PJ"
    }
];

export const GENDERS: Gender[] = [
    { id: 1, description: 'Masculino' },
    { id: 2, description: 'Femenino' }
];
