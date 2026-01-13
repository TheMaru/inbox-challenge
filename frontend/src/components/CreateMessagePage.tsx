import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
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
    <main>
      <h2>Create new Message</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Subject ({subject.length}/{MAX_SUBJECT_LENGTH})
          </label>
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          {subject.length > MAX_SUBJECT_LENGTH && <p>Too long!</p>}
        </fieldset>
        <fieldset>
          <label>Message Text</label>
          <textarea
            required
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </fieldset>

        {error && <p>{error}</p>}

        <button
          type="submit"
          disabled={subject.length > MAX_SUBJECT_LENGTH || !subject || !text}
        >
          Send Message
        </button>
        <button type="button" onClick={() => navigate(Pages.LANDING_PAGE)}>
          Cancel
        </button>
      </form>
    </main>
  );
};
