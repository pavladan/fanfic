import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '../lib/hooks';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [user, { mutate }] = useUser();
  useEffect(() => {
    if (user) router.replace('/');
  }, [user]);

  async function onSubmit(e) {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrorMsg('Incorrect username or password. Try again!');
    }
  }

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className="forms-wrapper">


        <Form onSubmit={onSubmit}>
          {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control id="email"
              name="email"
              type="email"
              placeholder="Email address" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control id="password"
              type="password"
              name="password"
              placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">Sign In</Button>
          {/* <Link href="/forgetpassword">
          <a>Forget password</a>
        </Link> */}
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
