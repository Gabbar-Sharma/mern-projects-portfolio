import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  address: z.string().min(6),
  city: z.string().min(2),
  payment: z.enum(['card', 'cod', 'quote']),
})

type FormType = z.infer<typeof schema>

export default function CheckoutPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: { payment: 'card' },
  })

  const onSubmit = (values: FormType) => {
    alert(`Demo checkout submitted for ${values.name}. This does not create a real payment or order.`)
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-primary">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 rounded-xl border border-border bg-white p-5">
          <div>
            <h2 className="text-xl font-semibold text-primary">Customer details</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Input label="Full name" {...register('name')} error={errors.name?.message} />
              <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary">Shipping address</h2>
            <div className="mt-4 space-y-4">
              <Input label="Address" {...register('address')} error={errors.address?.message} />
              <Input label="City" {...register('city')} error={errors.city?.message} />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary">Payment method</h2>
            <div className="mt-4 space-y-2">
              {['card', 'cod', 'quote'].map((option) => (
                <label key={option} className="flex items-center gap-3 rounded-md border border-border p-3 text-sm text-primary">
                  <input type="radio" value={option} {...register('payment')} />
                  <span className="capitalize">{option === 'quote' ? 'Quotation purchase' : option === 'cod' ? 'Cash on delivery' : 'Online payment'}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <aside className="rounded-xl border border-border bg-white p-5">
          <h2 className="text-xl font-semibold text-primary">Order summary</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between"><span>Atlas 24V DC Servo Drive</span><span>₹4,200</span></div>
            <div className="flex justify-between"><span>HydraFlex 1000 Pneumatic Valve</span><span>₹1,350</span></div>
            <div className="flex justify-between border-t border-border pt-3 font-semibold text-primary"><span>Total</span><span>₹5,550</span></div>
          </div>
          <Button type="submit" className="mt-6 w-full">Place order</Button>
        </aside>
      </form>
    </div>
  )
}
