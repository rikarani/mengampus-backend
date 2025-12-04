import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { expo } from "@better-auth/expo";
import { prisma } from "@/prisma/prisma";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [
    expo(),
    admin({
      defaultRole: "user",
      schema: {
        user: {
          modelName: "User",
          fields: {
            banReason: "ban_reason",
            banExpiresAt: "ban_expires",
          },
        },
        session: {
          modelName: "Session",
          fields: {
            impersonatedBy: "impersonated_by",
          },
        },
      },
    }),
  ],
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["mengampus://*/*", "exp://*/*"],
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
        unique: true,
        required: true,
      },
      prodi: {
        type: "string",
        required: true,
      },
    },
  },
  session: {
    modelName: "Session",
    fields: {
      userId: "user_id",
      expiresAt: "expires_at",
      ipAddress: "ip_address",
      userAgent: "user_agent",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
    expiresIn: 2 * 60 * 60,
    updateAge: 15 * 60,
  },
  account: {
    modelName: "Account",
    fields: {
      userId: "user_id",
      accountId: "account_id",
      providerId: "provider_id",
      accessToken: "access_token",
      refreshToken: "refresh_token",
      accessTokenExpiresAt: "access_token_expires_at",
      refreshTokenExpiresAt: "refresh_token_expires_at",
      idToken: "id_token",
      createdAt: "created_at",
      updatedAt: "updated_at",
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
