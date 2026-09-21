import { Link } from 'react-router-dom';

export default function EmptyState({ title, message, actionLabel = 'Explore Menu', actionTo = '/shop' }) {
  return (
    <section className="empty-state">
      <h2>{title}</h2>
      <p>{message}</p>
      <Link className="button primary" to={actionTo}>
        {actionLabel}
      </Link>
    </section>
  );
}
