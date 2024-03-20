"use client"
import { appInfo  } from '@/app/config/appInfo';
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useMemo, useState } from 'react';
import { setAccessToken } from '@/app/utils/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import RenderPasswordMessage from '@/app/utils/renderPasswordMessage';

export default function Login() {
  const apiUrl = appInfo.apiDomain;

  const [username, setUsername] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [cPassword, setCPassword] = useState<string>("");
  
  const isCPasswordDirty = useMemo(() => {
    return password != cPassword;
  }, [password, cPassword]);

  const [isMutating, setIsMutating] = useState(false);
  const [isVisibleOne, setIsVisibleOne] = useState(false);
  const [isVisibleTwo, setIsVisibleTwo] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string|null>(null);

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@?!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const toggleVisibilityOne = () => setIsVisibleOne(!isVisibleOne);
  const toggleVisibilityTwo = () => setIsVisibleTwo(!isVisibleTwo);

  const router = useRouter();

  async function handleRegister(event: SyntheticEvent) {
    event.preventDefault();

    if(!password.match(passwordRegex)) {
      setErrorMessage(
        "Password harus minimal 8 karakter dan termasuk angka beserta karakter spesial."
      );
      return
    }
    setErrorMessage(null);

    setIsMutating(true);

    try {
      const res = await fetch(`${apiUrl}/v1/auth/register`, {
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
        throw new Error(`Error! status: ${res.status}`)
      }

      const data = await res.json();
     
      localStorage.setItem('username', username);
      router.push('/auth/login');
    } catch(err) {
      console.error('register failed:', err);
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
            <form className="card-body" onSubmit={handleRegister}>
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
                    type={isVisibleOne ? 'text': 'password'} 
                    placeholder="password" 
                    className="join-item input input-bordered w-full max-w-xs" 
                    onChange={(e) =>setPassword(e.target.value)} required />
                  <button
                    type="button"
                    className="join-item btn btn-square btn-success text-white"
                    onClick={toggleVisibilityOne}
                  >
                    {isVisibleOne ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
                {RenderPasswordMessage(errorMessage)}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Konfirmasi Password</span>
                </label>
                <div className="input-group join">
                  <input value={cPassword} 
                    type={isVisibleTwo ? 'text': 'password'} 
                    placeholder="ulangi password" 
                    className="join-item input input-bordered w-full max-w-xs" 
                    onChange={(e) =>setCPassword(e.target.value)} required />
                  <button
                    type="button"
                    className="join-item btn btn-square btn-success text-white"
                    onClick={toggleVisibilityTwo}
                  >
                    {isVisibleTwo ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
                {RenderPasswordMessage(isCPasswordDirty ? 'Password tidak sama.' : null)}
              </div>
              <div className="form-control mt-4">
                {isMutating ? (
                  <button type="submit" disabled={isMutating} className="btn btn-primary text-white">REGISTER...</button>
                ) : (
                  <button type="submit" disabled={isMutating} className="btn btn-primary text-white">REGISTER</button>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <Link href="/auth/login" className="label-text-alt link link-hover">Kembali</Link>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
