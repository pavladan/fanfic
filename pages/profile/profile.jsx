import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useUser } from '../../lib/hooks';
import { ButtonToolbar, ButtonGroup, Button, Table, Form } from 'react-bootstrap';

const ProfilePage = () => {
  const [user] = useUser();
  const {
    name, email, bio, profilePicture,
  } = user || {};

  if (!user) {
    return (
      <p>Please sign in</p>
    );
  }
  return (
    <>
      <style jsx>
        {`
          h2 {
            text-align: left;
            margin-right: 0.5rem;
          }
          button {
            margin: 0 0.25rem;
          }
          img {
            width: 10rem;
            height: auto;
            border-radius: 50%;
            box-shadow: rgba(0, 0, 0, 0.05) 0 10px 20px 1px;
            margin-right: 1.5rem;
          }
          div {
            color: #777;
            display: flex;
            align-items: center;
          }
          p {
            font-family: monospace;
            color: #444;
            margin: 0.25rem 0 0.75rem;
          }
          a {
            margin-left: 0.25rem;
          }
        `}
      </style>
      <Head>
        <title>{name}</title>
      </Head>
      <div>
        {profilePicture ? (
          <img src={profilePicture} width="256" height="256" alt={name} />
        ) : null}
        <section>
          <div>
            <h2>{name}</h2>
            <Link href="/profile/settings">
              <button type="button">Edit</button>
            </Link>
          </div>
          {/* Bio
          <p>{bio}</p> */}
          Email
          <p>
            {email}
          </p>
        </section>
      </div>

      <div>
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="mr-2" aria-label="First group">
            <Link href="/profile/addElement">
              <Button variant="secondary">Create new element</Button>
            </Link>
          </ButtonGroup>
        </ButtonToolbar>


      </div>
      <div className="users">
        <Table striped bordered hover variant="dark">

          <thead className="users">
            <tr>
              <th><Form.Check type="checkbox" onChange="" checked="" /> </th>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Registration data</th>
              <th>Last login </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {() => {
              return (
                <tr key={val.id}>
                  <td> <Form.Check checked="" onChange="" type="checkbox" /> </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )
            }}
          </tbody>
        </Table>

      </div>
    </>
  );
};

export default ProfilePage;