import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import type { Message } from '../types';
import { api } from '../api';
import { Pages } from '../utils/pages';
import { formatDate } from '../utils/date';

export const MessageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const messageRes = await api.getOne(id);
          setMessage(messageRes);
        } catch (error) {
          setError('Message not found.');
          console.error('error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!message?.id) {
      return;
    }

    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.delete(message.id);
        navigate(Pages.LANDING_PAGE);
      } catch (error) {
        setError('Failed to delete the message.');
      }
    }
  };

  if (loading) {
    return <div>Loading message...</div>;
  }
  if (error || !message) {
    return <div>{error || 'Message not found.'}</div>;
  }

  return (
    <>
      <header>
        <nav>
          <Link to={Pages.LANDING_PAGE}>Back to Inbox</Link>
        </nav>
      </header>
      <main>
        <article>
          <header>
            <h1>{message.subject}</h1>
            <p>{formatDate(message.createdAt)}</p>
          </header>
          <p>{message.text}</p>
          <footer>
            <button className="delete-btn" onClick={handleDelete}>
              Delete message
            </button>
          </footer>
        </article>
      </main>
    </>
  );
};
