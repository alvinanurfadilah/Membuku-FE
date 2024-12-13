export type Role = 'Admin' | 'Customer';

export const rolesLabel: { label: string; value: Role }[] = [
  { label: 'Administrator', value: 'Admin' },
  { label: 'Customer', value: 'Customer' },
];

export type Gender = 'F' | 'M';

export const gendersLabel: { label: string; value: Gender }[] = [
  { label: 'Perempuan', value: 'F' },
  { label: 'Laki-laki', value: 'M' },
];

export interface RegisterCredentials {
  username: string;
  password: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  username: string;
  role: Role;
  token: string;
}
