import prisma from '../prisma'
import { IGetProfileReturn, IUpdateProfileReturn } from '../interfaces'
import SafeError from '../safeError'

class ProfileService {
  private prisma = prisma

  constructor() {}

  public _getProfile = async (id: number): Promise<IGetProfileReturn> => {
    const profile = await this.prisma.user.findUnique({
      where: {
        id
      },

      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true
      }
    })

    if (!profile) {
      throw new SafeError('Profile not found', true)
    }

    return profile
  }

  public _updateProfile = async (
    id: number,
    data: { firstName?: string; lastName?: string }
  ): Promise<IUpdateProfileReturn> => {
    const profile = await this.prisma.user.update({
      where: {
        id
      },

      data: {
        firstName: data.firstName,
        lastName: data.lastName
      },

      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true
      }
    })

    if (!profile) {
      throw new SafeError('Profile not found', true)
    }

    return profile
  }
}

export default ProfileService
