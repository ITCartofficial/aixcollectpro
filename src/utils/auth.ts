// Utility for role-based access and session management

export type Role = "global_admin" | "super_admin" | "supervisor";

export interface User {
  employeeId: string;
  phoneNumber: string;
  username: string;
  role: Role;
}

export const dummyUsers: User[] = [
  {
    employeeId: "SUP-000001",
    phoneNumber: "+919876543210",
    username: "globaladmin",
    role: "global_admin",
  },
  {
    employeeId: "SUP-000002",
    phoneNumber: "+919876543211",
    username: "superadmin",
    role: "super_admin",
  },
  {
    employeeId: "SUP-000003",
    phoneNumber: "+919876543212",
    username: "supervisor1",
    role: "supervisor",
  },
  {
    employeeId: "SUP-000004",
    phoneNumber: "8135978063",
    username: "rezwan_hussain",
    role: "global_admin",
  },
  {
    employeeId: "SUP-000005",
    phoneNumber: "9678062213",
    username: "mashud_ahmed",
    role: "supervisor",
  },
  {
    employeeId: "SUP-000006",
    phoneNumber: "8660828132",
    username: "muskan_sonda",
    role: "supervisor",
  },
];

export function getCurrentUser(): User | null {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated(): boolean {
  return localStorage.getItem("isAuthenticated") === "true";
}

export function logout() {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("user");
}