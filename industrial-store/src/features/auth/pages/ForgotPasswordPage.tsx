import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const schema = z.object({ email: z.string().email() })

type FormType = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormType>({ resolver: zodResolver(schema) })

  const onSubmit = () => {
    alert('Demo password reset email would be sent here. No real email is sent from the frontend.')
  }

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-bold text-primary">Forgot password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
          <Button type="submit" className="w-full">Send reset link</Button>
        </form>
      </div>
    </div>
  )
}
