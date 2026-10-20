import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const quoteSchema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  company: z.string().min(2, 'Please enter your company name.'),
  email: z.string().email('Enter a valid work email.'),
  phone: z.string().optional(),
  details: z.string().min(10, 'Please include a few details about what you need.'),
})
type QuoteValues = z.infer<typeof quoteSchema>

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<QuoteValues>({ resolver: zodResolver(quoteSchema) })
  return <section className="container page-section"><div className="quote-layout"><div className="quote-copy"><span className="eyebrow">PERSONALIZED SOURCING</span><h1>Tell us what you’re <em>looking for.</em></h1><p>Share a few details and our team can help with volume pricing, sourcing, or product questions.</p><div className="quote-points"><span>✓ Volume and project pricing</span><span>✓ Help finding the right specification</span><span>✓ Support for hard-to-source items</span></div><p className="demo-note">This form is a UI demonstration. It does not send or save your information.</p></div><div className="form-card"><h2>Request a quote</h2><form className="stack-form" onSubmit={handleSubmit(() => setSubmitted(true))} noValidate><Input label="Your name" autoComplete="name" placeholder="Full name" error={errors.name?.message} {...register('name')} /><Input label="Company" autoComplete="organization" placeholder="Company name" error={errors.company?.message} {...register('company')} /><Input label="Work email" type="email" autoComplete="email" placeholder="you@company.com" error={errors.email?.message} {...register('email')} /><Input label="Phone (optional)" type="tel" autoComplete="tel" placeholder="+1 (555) 000-0000" error={errors.phone?.message} {...register('phone')} /><div className="field"><label htmlFor="quote-details">What are you looking for?</label><textarea id="quote-details" rows={4} placeholder="Product, quantity, timeline, or project details…" aria-invalid={Boolean(errors.details)} {...register('details')} /><span className="field-error">{errors.details?.message}</span></div><Button type="submit" className="full-width">Review quote request →</Button>{submitted && <p className="form-notice" role="status">Your information passed demo validation. No request has been sent.</p>}</form></div></div></section>
}
