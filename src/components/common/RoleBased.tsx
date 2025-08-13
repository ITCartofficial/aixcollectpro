import React from "react";
import { getCurrentUser, type Role } from "../../utils/auth";


type RoleBasedProps = {
  allow: Role[];
  children: React.ReactNode;
};

const RoleBased: React.FC<RoleBasedProps> = ({ allow, children }) => {
  const user = getCurrentUser();
  if (!user) return null;
  return allow.includes(user.role) ? <>{children}</> : null;
};

export default RoleBased;