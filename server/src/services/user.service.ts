import {
  ProfileVisibility,
  Themes,
  type PrismaClient,
} from "../generated/prisma/client";
import type { OnboardUserProps, UpdateUserProps } from "../validator";

export default class UserService {
  constructor(private prisma: PrismaClient) {}

  async checkExists({
    email,
    id,
  }: {
    email?: string;
    id?: string;
  }): Promise<Partial<{
    id: string;
    email: string;
    name: string;
    isVerified: boolean;
  }> | null> {
    {
      if (id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) return null;
        return {
          id: user?.id,
          email: user?.email,
          name: user?.name,
          isVerified: user?.isVerified,
        };
      }
      if (email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        return {
          id: user?.id,
          email: user?.email,
          name: user?.name,
          isVerified: user?.isVerified,
        };
      }
      return null;
    }
  }

  async getUserById(
    id: string,
    include: {
      socialInfo?: boolean;
      userExtraInfo?: boolean;
      userPreference?: boolean;
    } = {
      socialInfo: false,
      userExtraInfo: false,
      userPreference: false,
    },
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        socialInfo: include.socialInfo ?? false,
        userExtraInfo: include.userExtraInfo ?? false,
        userPreference: include.userPreference ?? false,
      },
    });
    return {
      ...user,
      password: undefined,
    };
  }
  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }
  async onboardUser({
    userId,
    onboardData,
  }: {
    userId: string;
    onboardData: OnboardUserProps;
  }) {
    const {
      primaryGoals,
      experienceLevel,
      areasOfInterest,
      dedicationHoursPerWeek,
      currentRole,
      primaryProgrammingLanguage,
    } = onboardData;
    const userExtraInfo = await this.prisma.userExtraInfo.create({
      data: {
        userId,
        primaryGoals,
        experienceLevel,
        areasOfInterest,
        dedicationHoursPerWeek,
        currentRole,
        primaryProgrammingLanguage,
      },
    });

    return userExtraInfo;
  }
  async updateUser({
    userId,
    updateData,
  }: {
    userId: string;
    updateData: Partial<UpdateUserProps>;
  }) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { socialInfo: true, userExtraInfo: true, userPreference: true },
    });
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        name: updateData.name ?? user?.name,
        username: updateData.username ?? user?.username,
        socialInfo: {
          upsert: {
            create: {
              github: updateData?.socialInfo?.github ?? "",
              linkedin: updateData.socialInfo?.linkedin ?? "",
              twitter: updateData.socialInfo?.twitter ?? "",
              instagram: updateData.socialInfo?.instagram ?? "",
            },
            update: {
              github:
                updateData?.socialInfo?.github ?? user?.socialInfo?.github,
              linkedin:
                updateData?.socialInfo?.linkedin ?? user?.socialInfo?.linkedin,
              twitter:
                updateData?.socialInfo?.twitter ?? user?.socialInfo?.twitter,
              instagram:
                updateData?.socialInfo?.instagram ??
                user?.socialInfo?.instagram,
            },
          },
        },
        userExtraInfo: {
          upsert: {
            create: {
              bio: updateData.bio ?? "",
              location: updateData.location ?? "",
            },
            update: {
              bio: updateData.bio ?? user?.userExtraInfo?.bio,
              location: updateData.location ?? user?.userExtraInfo?.location,
            },
          },
        },
        userPreference: {
          upsert: {
            create: {
              theme: updateData.userPreference?.theme ?? Themes.DARK,
              emailNotifications:
                updateData.userPreference?.emailNotifications ?? true,
              pushNotifications:
                updateData.userPreference?.pushNotifications ?? true,
              profileVisibility:
                updateData.userPreference?.profileVisibility ??
                ProfileVisibility.PUBLIC,
            },
            update: {
              theme:
                updateData.userPreference?.theme ?? user?.userPreference?.theme,
              emailNotifications:
                updateData.userPreference?.emailNotifications ??
                user?.userPreference?.emailNotifications,
              pushNotifications:
                updateData.userPreference?.pushNotifications ??
                user?.userPreference?.pushNotifications,
              profileVisibility:
                updateData.userPreference?.profileVisibility ??
                user?.userPreference?.profileVisibility,
            },
          },
        },
      },
    });
    return updatedUser;
  }
}
