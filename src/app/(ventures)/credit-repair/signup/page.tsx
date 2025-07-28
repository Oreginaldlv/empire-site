import SignupForm from '@/app/auth/signup-form'

export default function SignupPage() {
  return (
    <div className="container">
      <h1>Join Credit Repair Empire</h1>
      <SignupForm venture="credit-repair" />
    </div>
  )
}
