export type Role = "global_admin" | "super_admin" | "supervisor";
export type TwoFactorType = "none" | "email" | "authenticator";

export interface User {
  employeeId: string;
  phoneNumber: string;
  username: string;
  role: Role;
  email: string;
  twoFactorType: TwoFactorType;
  name?: string;
  designation?: string;
  avatar?: string;
  // Additional profile fields
  location?: string;
  vendor?: string;
  reportingManagerId?: string;
  reportingManagerName?: string;
  joinedOn?: string; // ISO date string
  status?: "Active" | "Inactive";
  department?: string;
  lastLogin?: string;
}

export const dummyUsers: User[] = [
  {
    employeeId: "SUP-000001",
    phoneNumber: "+919876543210",
    username: "globaladmin",
    role: "global_admin",
    email: "globaladmin@aixcollectpro.com",
    twoFactorType: "authenticator",
    name: "Global Admin",
    designation: "Global Administrator",
    avatar: "",
    location: "Bangalore",
    vendor: "ITCart",
    reportingManagerName: undefined, // Global admin has no reporting manager
    reportingManagerId: undefined,
    joinedOn: "2022-01-15",
    status: "Active",
    department: "Administration",
    lastLogin: "2025-08-22T06:41:30Z",
  },
  {
    employeeId: "SUP-000002",
    phoneNumber: "+919876543211",
    username: "superadmin",
    role: "super_admin",
    email: "superadmin@aixcollectpro.com",
    twoFactorType: "email",
    name: "Super Admin",
    designation: "Super Administrator",
    avatar: "",
    location: "Bangalore",
    vendor: "ITCart",
    reportingManagerName: undefined, // Global admin has no reporting manager
    reportingManagerId: undefined,
    joinedOn: "2022-03-01",
    status: "Active",
    department: "Field Operations",
  },
  {
    employeeId: "SUP-000003",
    phoneNumber: "+919876543212",
    username: "supervisor1",
    role: "supervisor",
    email: "supervisor1@aixcollectpro.com",
    twoFactorType: "none",
    name: "John Supervisor",
    designation: "Supervisor",
    avatar: "",
    location: "Bangalore",
    vendor: "ITCart",
    reportingManagerName: "Super Admin", // Global admin has no reporting manager
    reportingManagerId: "SUP-000002",
    joinedOn: "2022-03-01",
    status: "Active",
    department: "Field Operations",
  },
  {
    employeeId: "SUP-000004",
    phoneNumber: "8135978063",
    username: "rezwan_hussain",
    role: "global_admin",
    email: "rezwan.h@aixcollectpro.com",
    twoFactorType: "none",
    name: "Rezwan Hussain",
    designation: "Global Administrator",
    avatar: "",
    location: "Bangalore",
    vendor: "ITCart",
    reportingManagerName: undefined,
    reportingManagerId: undefined,
    joinedOn: "2022-03-01",
    status: "Active",
    department: "Field Operations",
  },
  {
    employeeId: "SUP-000005",
    phoneNumber: "9678062213",
    username: "mashud_ahmed",
    role: "supervisor",
    email: "mashud.a@aixcollectpro.com",
    twoFactorType: "email",
    name: "Mashud Ahmed",
    designation: "Supervisor",
    avatar: "",
    location: "Bangalore",
    vendor: "ITCart",
    reportingManagerName: "Rezwan Hussain",
    reportingManagerId: "SUP-000004",
    joinedOn: "2022-03-01",
    status: "Active",
    department: "Field Operations",
  },
  {
    employeeId: "SUP-000006",
    phoneNumber: "8660828132",
    username: "muskan_sonda",
    role: "supervisor",
    email: "muskan.s@aixcollectpro.com",
    twoFactorType: "authenticator",
    name: "Muskan Sonda",
    designation: "Supervisor",
    avatar: "",
    location: "Bangalore",
    vendor: "ITCart",
    reportingManagerName: "Rezwan Hussain",
    reportingManagerId: "SUP-000004",
    joinedOn: "2022-03-01",
    status: "Active",
    department: "Field Operations",
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

// Helper function to get user by username
export function getUserByUsername(username: string): User | null {
  // api call
  // if user && return real data or else fallback dummy
  return dummyUsers.find((user) => user.username === username) || null;
}

// Helper function to get display name based on role
export function getDisplayDesignation(role: Role): string {
  switch (role) {
    case "global_admin":
      return "Global Administrator";
    case "super_admin":
      return "Super Administrator";
    case "supervisor":
      return "Supervisor";
    default:
      return "User";
  }
}

// Helper function to format name for display
export function getDisplayName(user: User): string {
  if (user.name) return user.name;

  // Fallback: convert username to readable name
  return user.username
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
