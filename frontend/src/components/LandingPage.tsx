import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Message } from '../types';
import { Link } from 'react-router';
import { formatDate } from '../utils/Date';

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
          <Link to="/create">
            <button>Create New Message</button>
          </Link>
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
                  <Link to={`/message/${msg.id}`}>{msg.subject}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};
