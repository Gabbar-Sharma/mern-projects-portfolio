import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  phone: z.string().min(8),
  product: z.string().min(2),
  quantity: z.coerce.number().min(1),
  requirements: z.string().min(10),
})

type FormType = z.infer<typeof schema>

export default function RequestQuotePage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormType>({ resolver: zodResolver(schema) })

  const onSubmit = () => {
    alert('Demo quote request captured locally. This is not sent to a real sales team.')
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-primary">Request a quote</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 max-w-3xl space-y-5 rounded-xl border border-border bg-white p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Customer name" {...register('name')} error={errors.name?.message} />
          <Input label="Business email" type="email" {...register('email')} error={errors.email?.message} />
          <Input label="Company" {...register('company')} error={errors.company?.message} />
          <Input label="Phone" {...register('phone')} error={errors.phone?.message} />
          <Input label="Product or SKU" {...register('product')} error={errors.product?.message} />
          <Input label="Requested quantity" type="number" {...register('quantity')} error={errors.quantity?.message} />
        </div>
        <label className="block text-sm text-primary">
          <span className="mb-1.5 block font-medium">Additional requirements</span>
          <textarea {...register('requirements')} className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm text-primary" rows={5} />
          {errors.requirements ? <span className="mt-1 block text-xs text-red-600">{errors.requirements.message}</span> : null}
        </label>
        <div className="rounded-lg bg-[#eef4ff] p-4 text-sm text-slate-600">This form is a frontend-only demo and does not send a real quote to any sales team.</div>
        <Button type="submit">Submit request</Button>
      </form>
    </div>
  )
}
