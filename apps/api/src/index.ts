import { defineAbilityFor, projectSchema } from '@saas/auth'

const ability = defineAbilityFor({ role: 'MEMBER', id: 'user-id' })

const project = projectSchema.parse({ id: 'project-id', ownerId: 'use2-id' })

console.log(ability.can('get', 'User'))
console.log(ability.can('create', 'Invite'))
console.log(ability.can('delete', 'Project'))
