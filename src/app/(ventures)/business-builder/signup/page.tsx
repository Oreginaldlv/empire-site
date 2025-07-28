import SignupForm from '@/app/auth/signup-form'

export default function SignupPage() {
  return (
    <div className="container">
      <h1>Join the Business Builder</h1>
      <SignupForm venture="business-builder" />
    </div>
  )
}
