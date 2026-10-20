import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const authSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(8, 'Use at least 8 characters.'),
})
type AuthValues = z.infer<typeof authSchema>

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<AuthValues>({ resolver: zodResolver(authSchema) })
  return <form className="stack-form" onSubmit={handleSubmit(() => setSubmitted(true))} noValidate>
    <Input label="Work email" type="email" autoComplete="email" placeholder="you@company.com" error={errors.email?.message} {...register('email')} />
    <Input label="Password" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} placeholder="At least 8 characters" error={errors.password?.message} {...register('password')} />
    {mode === 'register' && <label className="checkbox-field"><input type="checkbox" required /> I agree to receive account-related service communications.</label>}
    <Button type="submit" className="full-width">{mode === 'login' ? 'Continue' : 'Create demo account'} <span aria-hidden="true">→</span></Button>
    {submitted && <p className="form-notice" role="status">Demo only: authentication is not connected and no account or session was created.</p>}
  </form>
}
