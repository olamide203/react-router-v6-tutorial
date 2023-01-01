import { Outlet, Link, useLoaderData, Form, redirect } from 'react-router-dom';
import { createContact, getContacts } from '../contacts';

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

// route action for handling form submission with client-side redirect
export async function action() {
  const contact = await createContact();
  // return { contact };
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form action="" id="search-form" role="search">
            <input
              type="search"
              id="q"
              placeholder="Search"
              name="q"
              aria-label="Search contacts"
            />
            <div id="search-spinner" aria-hidden hidden={true}></div>
            <div className="sr-only" aria-live="polite"></div>
          </form>
          {/* Form prevents the browser from sending the request to your server and sends it to your route `action` instead and react-router uses this to automatically revalidate the data on the page after the action finishes*/}
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
