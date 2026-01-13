import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Message } from '../types';
import { Link, NavLink } from 'react-router';
import { formatDate } from '../utils/date';
import { Pages } from '../utils/pages';

export const LandingPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const messagesRes = await api.getAll();
        setMessages(messagesRes);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <header>
        <h1>Inbox</h1>
        <nav>
          <NavLink to={Pages.CREATION_PAGE}>
            <button className="create-btn">Create New Message</button>
          </NavLink>
        </nav>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td>{formatDate(msg.createdAt)}</td>
                <td>
                  <Link to={Pages.MESSAGE_PAGE.url(msg.id!)}>
                    {msg.subject}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};
