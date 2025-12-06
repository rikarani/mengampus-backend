import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";
import { username, admin as adminPlugin } from "better-auth/plugins";

import { prisma } from "@/prisma/prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { accessControl, admin, user } from "./permission";

export const auth = betterAuth({
  plugins: [
    expo(),
    username({
      schema: {
        user: {
          modelName: "User",
          fields: {
            username: "nim",
            displayUsername: "nim",
          },
        },
      },
    }),
    adminPlugin({
      ac: accessControl,
      roles: { admin, user },
      defaultRole: "user",
    }),
  ],
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
  trustedOrigins: ["exp://", "mengampus://"],
  account: {
    modelName: "Account",
    fields: {
      userId: "user_id",
      accountId: "account_id",
      providerId: "provider_id",
      accessToken: "access_token",
      refreshToken: "refresh_token",
      idToken: "id_token",
      accessTokenExpiresAt: "access_token_expires_at",
      refreshTokenExpiresAt: "refresh_token_expires_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  session: {
    modelName: "Session",
    fields: {
      userId: "user_id",
      ipAddress: "ip_address",
      userAgent: "user_agent",
      expiresAt: "expires_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  user: {
    modelName: "User",
    fields: {
      emailVerified: "email_verified",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    additionalFields: {
      nim: {
        type: "string",
        required: true,
      },
      prodi: {
        type: "string",
        required: true,
      },
    },
  },
  verification: {
    modelName: "Verification",
    fields: {
      expiresAt: "expires_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
});
