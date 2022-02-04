import Head from 'next/head';

interface Page {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Page: React.FC<Page> = ({
  title,
  description,
  footer,
  children,
}) => {
  return (
    <>
      {title || description ? (
        <Head>
          {title && <title>{title}</title>}
          {description && <meta name="description" content={description} />}
        </Head>
      ) : null}
      <main className="min-h-screen">{children}</main>
    </>
  );
};
