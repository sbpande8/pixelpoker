import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { signInWithGoogle } = useAuth()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 px-4">
      {/* Logo */}
      <div className="text-center">
        <div className="flex justify-center gap-1 mb-6">
          {['P', 'I', 'X', 'E', 'L'].map((c, i) => (
            <span
              key={i}
              className="text-2xl font-pixel"
              style={{ color: `hsl(${260 + i * 15}, 80%, 70%)` }}
            >
              {c}
            </span>
          ))}
          <span className="text-2xl font-pixel text-pixel-yellow mx-2">▶</span>
          {['P', 'O', 'K', 'E', 'R'].map((c, i) => (
            <span
              key={i}
              className="text-2xl font-pixel"
              style={{ color: `hsl(${40 + i * 10}, 90%, 65%)` }}
            >
              {c}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-400 font-pixel leading-6">
          8-bit planning poker for agile teams
        </p>
      </div>

      {/* Card */}
      <div className="card-pixel w-full max-w-sm text-center">
        <div className="text-4xl mb-4">🃏</div>
        <h2 className="text-sm font-pixel text-pixel-accent mb-6">SIGN IN</h2>
        <p className="text-xs text-gray-400 leading-6 mb-8">
          Connect with Google to save your pixel avatar and join sessions.
        </p>

        <button
          onClick={signInWithGoogle}
          className="btn-pixel w-full flex items-center justify-center gap-3"
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>
      </div>

      <p className="text-xs text-gray-600 font-pixel text-center leading-6">
        No account needed — Google sign-in creates one automatically.
      </p>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}
