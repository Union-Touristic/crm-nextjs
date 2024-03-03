export type NavLink = {
  href: string;
  name: string;
};

export type FormFields = {
  firstName: string;
  phoneNumber: string;
  isAccept: boolean;
};

export type FieldState = {
  dirty: boolean;
  error: boolean;
  message: string;
};

export type FormErrors = Record<keyof FormFields, FieldState>;
