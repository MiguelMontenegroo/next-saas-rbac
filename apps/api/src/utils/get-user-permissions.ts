import { defineAbilityFor, type Role, userSchema } from "@saas/auth";

export function getUserPermissions(userId: string, role: Role) {
  console.log("🛠️ Checking permissions...");
  console.log("User ID:", userId);
  console.log("Role:", role);

  const authUser = userSchema.parse({
    id: userId,
    role,
  });

  console.log("Parsed authUser:", authUser);

  const ability = defineAbilityFor(authUser);

  console.log("Generated abilities:", ability.rules);

  return ability;
}
