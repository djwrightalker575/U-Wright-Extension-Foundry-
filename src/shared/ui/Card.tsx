import { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{
  title: string;
  description?: string;
}>;

export function Card({ title, description, children }: CardProps) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {description && <p className="muted">{description}</p>}
      {children}
    </section>
  );
}
