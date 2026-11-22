export type UserRole = "admin" | "usuario" | "empresa" | "prestador";
export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};
