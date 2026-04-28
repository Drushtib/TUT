import React from "react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CustomNumberedList = ({ children }) => {
  let currentNumber = 1;

  const processChildren = (nodes) => {
    return nodes
      .map((node) => {
        if (node.listItem === "number") {
          const number = currentNumber++;
          return (
            <li key={node._key} value={number}>
              <PortableText value={node.children} />
            </li>
          );
        }
        return null;
      })
      .filter(Boolean);
  };

  return (
    <ol className="ms-4 my-8 list-decimal">{processChildren(children)}</ol>
  );
};

const PortableTextComponent = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="position-relative w-100 h-100 my-4">
          <Image
            className="object-fit-cover"
            src={urlFor(value).url()}
            alt={value.alt || " "}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
          />
          {value.caption && (
            <div className="position-absolute bottom-0 start-0 bg-white bg-opacity-75 p-2 small">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
    code: ({ value }) => {
      return (
        <SyntaxHighlighter
          language={value.language || "text"}
          style={atomDark}
          className="rounded my-3"
        >
          {value.code}
        </SyntaxHighlighter>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="ms-4 my-3 list-disc">{children}</ul>
    ),
    number: CustomNumberedList,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: CustomNumberedList,
  },
  block: {
    h1: ({ children }) => (
      <h1 style={{ fontSize: '3rem', fontWeight: '800', marginTop: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.3' }}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '2.5rem', marginBottom: '1.25rem', lineHeight: '1.4' }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontSize: '2.25rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', lineHeight: '1.4' }}>{children}</h3>
    ),
    h4: ({ children }) => <h4 style={{ fontSize: '2rem', fontWeight: '700', marginTop: '1.75rem', marginBottom: '0.75rem', lineHeight: '1.4' }}>{children}</h4>,
    h5: ({ children }) => <h5 style={{ fontSize: '1.75rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>{children}</h5>,
    h6: ({ children }) => <h6 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>{children}</h6>,
    blockquote: ({ children }) => (
      <blockquote style={{ borderLeft: '4px solid #6c757d', paddingLeft: '1rem', padding: '0.75rem 1rem', marginTop: '1.5rem', marginBottom: '1.5rem', fontStyle: 'italic', backgroundColor: '#f8f9fa' }}>
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p style={{ marginBottom: '1.25rem', lineHeight: '1.85', textAlign: 'left', width: '100%' }}>{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      const target = value.blank ? "_blank" : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          target={target}
          className="text-primary text-decoration-underline hover-text-primary-dark"
        >
          {children}
        </Link>
      );
    },
    code: ({ children }) => (
      <code className="bg-light rounded p-1 font-monospace small">
        {children}
      </code>
    ),
  },
};

const RichTextComponentDefault = ({ content }) => {
  return <PortableText value={content} components={PortableTextComponent} />;
};

// Provide both a named export (schema/components config) and a default component wrapper
export const RichTextComponent = PortableTextComponent;
export default RichTextComponentDefault;
