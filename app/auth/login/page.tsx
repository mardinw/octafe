"use client"
import { appInfo  } from '@/app/config/appInfo';
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useState } from 'react';
import { setAccessToken } from '@/app/utils/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';

export default function Login() {
  const apiUrl = appInfo.apiDomain;

  const [username, setUsername] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const [isMutating, setIsMutating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const router = useRouter();

  async function handleLogin(event: SyntheticEvent) {
    event.preventDefault();

    setIsMutating(true);

    try {
      const res = await fetch(`${apiUrl}/v1/auth/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (!res.ok) {
        if(res.status === 404) {
          setErrorMessage("Password dan Username tidak cocok");
          setIsMutating(false);
          return;
        }
      }

      const data = await res.json();
      setAccessToken(data.access_token);
      localStorage.removeItem("username");
      router.push('/dashboard');
    } catch(err) {
      console.error('Login failed:', err);
      setErrorMessage('Login failed. Please check your credentials');
    } finally {
      setUsername("");
      setPassword("");
      setIsMutating(false);
    }
  }

  return (
    <main>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input value={username} type="text" placeholder="username" className="input input-bordered w-full max-w-xs" onChange={(e) =>setUsername(e.target.value)} required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="input-group join">
                  <input value={password} 
                    type={isVisible ? 'text': 'password'} 
                    placeholder="password" 
                    className="join-item input input-bordered w-full max-w-xs" 
                    onChange={(e) =>setPassword(e.target.value)} required />
                  <button
                    type="button"
                    className="join-item btn btn-square btn-success text-white"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
              </div>
              <div className="form-control mt-4">
                {isMutating ? (
                  <button type="submit" disabled={isMutating} className="btn btn-primary text-white">LOGIN...</button>
                ) : (
                  <button type="submit" disabled={isMutating} className="btn btn-primary text-white">LOGIN</button>
                )}
                <Link href="/auth/register" className="mt-2 label-text-alt link link-hover">Belum punya akun</Link>
              </div>
              {errorMessage && <p className="text-error">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
