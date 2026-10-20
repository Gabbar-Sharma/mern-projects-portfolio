import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const schema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, { path: ['confirmPassword'], message: 'Passwords do not match' })

type FormType = z.infer<typeof schema>

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const { register, handleSubmit, formState: { errors } } = useForm<FormType>({ resolver: zodResolver(schema) })

  const onSubmit = () => {
    if (!token) alert('Invalid or expired reset token.')
    else alert('Password reset successful in demo mode.')
  }

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-bold text-primary">Reset password</h1>
        <p className="mt-2 text-sm text-slate-600">{token ? 'Reset token detected.' : 'This demo has no valid reset token.'}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <Input label="New password" type="password" {...register('password')} error={errors.password?.message} />
          <Input label="Confirm password" type="password" {...register('confirmPassword')} error={errors.confirmPassword?.message} />
          <Button type="submit" className="w-full">Update password</Button>
        </form>
      </div>
    </div>
  )
}
