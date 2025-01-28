export const APP_NAME = 'CRM Pro';

export const ROLES = {
  ADMIN: 'admin',
  COMMERCIAL: 'commercial',
  EMPLOYEE: 'employee',
} as const;

export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'Administrateur',
  [ROLES.COMMERCIAL]: 'Commercial',
  [ROLES.EMPLOYEE]: 'Employé',
} as const;