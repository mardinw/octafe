"use client"
import { appInfo  } from '@/app/config/appInfo';
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useState } from 'react';
import { setAccessToken } from '@/app/utils/auth';

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
      </div>
    </main>
  )
}
