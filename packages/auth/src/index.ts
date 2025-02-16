import {
  createMongoAbility,
  CreateAbility,
  MongoAbility,
  AbilityBuilder,
} from '@casl/ability'
import { User } from './models/user'
import { permissions } from './permissions'
import { UserSubject } from './subjects/user'
import { projectSubject } from './subjects/project'
import { z } from 'zod'
import { organizationSubject } from './subjects/organization'
import { inviteSubject } from './subjects/invite'
import { billingSubject } from './subjects/biling'


const AppAbilitiesSchema = z.union([
  projectSubject,
  UserSubject,
  organizationSubject,
  inviteSubject,
  billingSubject,
  z.tuple([
    z.literal('manage'),
    z.literal('all')
  ])
])

type AppAbilities = z.infer<typeof AppAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for role ${user.role} not found.`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build()

  return ability
}
