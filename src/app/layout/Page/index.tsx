import Head from 'next/head';

interface Page {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const Page: React.FC<Page> = ({ title, description, children }) => {
  return (
    <>
      {title || description ? (
        <Head>
          {title && <title>{title}</title>}
          {description && <meta name="description" content={description} />}
        </Head>
      ) : null}
      <main>{children}</main>
    </>
  );
};
