import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/features/auth/context/AuthContext'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type FormType = z.infer<typeof schema>

export default function LoginPage() {
  const { login } = useAuth()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormType>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (values: FormType) => {
    await login(values.email)
  }

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-bold text-primary">Login</h1>
        <p className="mt-2 text-sm text-slate-600">Demo mode: use any email ending in admin to access the admin view.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
          <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
          <div className="flex items-center justify-between text-sm">
            <Link className="text-accent" to="/forgot-password">Forgot password?</Link>
            <Link className="text-accent" to="/register">Create account</Link>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? 'Logging in...' : 'Login'}</Button>
        </form>
      </div>
    </div>
  )
}
