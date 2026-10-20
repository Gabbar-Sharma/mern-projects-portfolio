import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const schema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    company: z.string().optional(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    terms: z.boolean().refine((value) => value, 'You must accept terms'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

type FormType = z.infer<typeof schema>

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: { terms: false },
  })

  const onSubmit = () => {
    alert('Demo registration only. No real account or email was created.')
  }

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-bold text-primary">Create account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4 md:grid-cols-2">
          <Input label="Full name" {...register('name')} error={errors.name?.message} />
          <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
          <Input label="Company name" {...register('company')} error={errors.company?.message} className="md:col-span-2" />
          <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
          <Input label="Confirm password" type="password" {...register('confirmPassword')} error={errors.confirmPassword?.message} />
          <label className="md:col-span-2 flex items-start gap-3 text-sm text-slate-600">
            <input type="checkbox" {...register('terms')} className="mt-1" />
            <span>I accept the terms and conditions.</span>
          </label>
          {errors.terms ? <span className="md:col-span-2 text-xs text-red-600">{errors.terms.message}</span> : null}
          <div className="md:col-span-2"><Button type="submit" className="w-full">Register</Button></div>
        </form>
      </div>
    </div>
  )
}
