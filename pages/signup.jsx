import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useUser } from '../lib/hooks';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const SignupPage = () => {
  const [user,  mutate ] = useUser();
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (user) Router.replace('/');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      name: e.currentTarget.name.value,
      password: e.currentTarget.password.value,
    };
    try {
      const res = await axios.post("/api/users", body);
      if (res.status === 201) {
        const userObj = await res.data.user;
        mutate(userObj);
      }
    } catch (err) {
      setErrorMsg(err.response.data);
    }

  };

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <div className="forms-wrapper">
        <Form onSubmit={handleSubmit} >
          {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control id="name"
              name="name"
              type="text"
              placeholder="Your name" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control id="email"
              name="email"
              type="email"
              placeholder="Email address" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control id="password"
              name="password"
              type="password"
              placeholder="Create a password" />
          </Form.Group>

          <Button variant="primary" type="submit">Sign Up</Button>
        </Form>
      </div>
    </>
  );
};

export default SignupPage;