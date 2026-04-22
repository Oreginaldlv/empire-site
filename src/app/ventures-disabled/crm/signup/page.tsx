import SignupForm from '@/app/auth/signup-form'

export default function SignupPage() {
  return (
    <div className="container">
      <h1>Join LeadLoop CRM</h1>
      <SignupForm venture="crm" />
    </div>
  )
}
