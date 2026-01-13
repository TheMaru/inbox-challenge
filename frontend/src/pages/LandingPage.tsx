import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Message } from '../types';
import { Link, NavLink, useNavigate } from 'react-router';
import { formatDate } from '../utils/date';
import { Pages } from '../utils/pages';
import { EmptyInbox } from '../components/EmptyInbox';
import { MessageTable } from '../components/MessagesTable';

export const LandingPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        {messages.length === 0 ? (
          <EmptyInbox />
        ) : (
          <MessageTable messages={messages} />
        )}
      </main>
    </>
  );
};
