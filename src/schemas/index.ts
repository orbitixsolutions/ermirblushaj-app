import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export const RegisterAdminSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.string()
})

export const TeamSchema = z.object({
  name: z.string()
})

export const PlayerSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  date_birthday: z.string(),
  number: z.string(),
  height: z.string(),
  nationality: z.string(),
  position: z.string(),
  team_id: z.string(),
})

export const MatchesSchemas = z.object({
  play_start_date: z.string()
})
