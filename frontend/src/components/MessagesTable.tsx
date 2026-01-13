import { Link, useNavigate } from 'react-router';
import type { Message } from '../types';
import { Pages } from '../utils/pages';
import { formatDate } from '../utils/date';

type MessageTableProps = {
  messages: Message[];
};

export const MessageTable: React.FC<MessageTableProps> = ({ messages }) => {
  const navigate = useNavigate();
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Subject</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((msg) => (
          <tr
            key={msg.id}
            onClick={() => {
              navigate(Pages.MESSAGE_PAGE.url(msg.id!));
            }}
          >
            <td>{formatDate(msg.createdAt)}</td>
            <td>
              <Link to={Pages.MESSAGE_PAGE.url(msg.id!)}>{msg.subject}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
