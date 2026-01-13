import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { api } from '../api';
import { Pages } from '../utils/pages';

const MAX_SUBJECT_LENGTH = 40;

export const CreateMessage: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (subject.length > MAX_SUBJECT_LENGTH) {
      setError(`Subject must be ${MAX_SUBJECT_LENGTH} characters or less`);
      return;
    }

    try {
      await api.create({ subject, text });
      navigate(Pages.LANDING_PAGE);
    } catch (err) {
      setError('Failed to save message. Please try again.');
    }
  };

  return (
    <>
      <header>
        <nav>
          <Link to={Pages.LANDING_PAGE}>Back to Inbox</Link>
        </nav>
      </header>
      <main>
        <h1>Create new Message</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="message-subject">
              Subject ({subject.length}/{MAX_SUBJECT_LENGTH})
            </label>
            <input
              id="message-subject"
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            {subject.length > MAX_SUBJECT_LENGTH && <p>Too long!</p>}
          </fieldset>
          <fieldset>
            <label htmlFor="message-text">Message Text</label>
            <textarea
              id="message-text"
              required
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </fieldset>

          {error && <p>{error}</p>}

          <div className="button-bar">
            <button
              type="submit"
              disabled={
                subject.length > MAX_SUBJECT_LENGTH || !subject || !text
              }
            >
              Send Message
            </button>
            <button type="button" onClick={() => navigate(Pages.LANDING_PAGE)}>
              Cancel
            </button>
          </div>
        </form>
      </main>
    </>
  );
};
