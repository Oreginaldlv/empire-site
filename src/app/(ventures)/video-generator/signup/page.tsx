import SignupForm from '@/app/auth/signup-form'

export default function SignupPage() {
  return (
    <div className="container">
      <h1>Join Video Generator</h1>
      <SignupForm venture="video-generator" />
    </div>
  )
}
