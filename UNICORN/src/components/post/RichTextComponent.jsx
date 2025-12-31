import React from "react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { urlFor } from "../../client"; // Make sure to import urlFor

const CustomNumberedList = ({ children }) => {
  let currentNumber = 1;

  const processChildren = (nodes) => {
    if (!nodes || !Array.isArray(nodes)) return null;

    return nodes
      .map((node, index) => {
        if (node?.listItem === "number") {
          const number = currentNumber++;
          return (
            <li key={node._key || index} value={number}>
              {node.children && <PortableText value={node.children} />}
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
        console.warn("Image asset reference is missing");
        return null;
      }

      try {
        const imageUrl = urlFor(value).url();
        if (!imageUrl) {
          console.warn("Could not generate image URL");
          return null;
        }

        return (
          <div className="position-relative w-100 h-100 my-4" style={{ minHeight: "200px" }}>
            <Image
              className="object-fit-cover"
              src={imageUrl}
              alt={value.alt || " "}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
            {value.caption && (
              <div className="position-absolute bottom-0 start-0 bg-white bg-opacity-75 p-2 small">
                {value.caption}
              </div>
            )}
          </div>
        );
      } catch (error) {
        console.error("Error rendering image:", error);
        return null;
      }
    },
    code: ({ value }) => {
      if (!value?.code) {
        console.warn("Code block content is missing");
        return null;
      }

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
    number: ({ children }) => <CustomNumberedList>{children}</CustomNumberedList>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  block: {
    h1: ({ children }) => (
      <h1 className="display-4 fw-bold my-3">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="display-5 fw-bold my-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="display-6 fw-bold my-3">{children}</h3>
    ),
    h4: ({ children }) => <h4 className="h2 fw-bold my-3">{children}</h4>,
    h5: ({ children }) => <h5 className="h3 fw-bold my-3">{children}</h5>,
    h6: ({ children }) => <h6 className="h4 fw-bold my-3">{children}</h6>,
    blockquote: ({ children }) => (
      <blockquote className="border-start border-4 border-secondary ps-3 py-3 my-3 fst-italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="my-3">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      // Safe href check with fallbacks
      const href = value?.href || "";
      
      // Safe startsWith check
      const rel = href && !href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      
      const target = value?.blank ? "_blank" : undefined;

      // If no href is provided, return the children without a link
      if (!href) {
        console.warn("Link mark missing href property", value);
        return <span className="text-warning">{children}</span>;
      }

      // Use regular <a> tag for external links, Next.js Link for internal
      if (href.startsWith("/") || href.startsWith("#")) {
        return (
          <Link
            href={href}
            rel={rel}
            target={target}
            className="text-primary text-decoration-underline hover-text-primary-dark"
          >
            {children}
          </Link>
        );
      } else {
        return (
          <a
            href={href}
            rel={rel}
            target={target}
            className="text-primary text-decoration-underline hover-text-primary-dark"
          >
            {children}
          </a>
        );
      }
    },
    code: ({ children }) => (
      <code className="bg-light rounded p-1 font-monospace small">
        {children}
      </code>
    ),
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
};

const RichTextComponentDefault = ({ content }) => {
  if (!content || !Array.isArray(content)) {
    console.warn("RichTextComponent: Invalid content provided", content);
    return (
      <div className="text-warning p-4 border border-warning rounded">
        Content not available
      </div>
    );
  }

  return (
    <div className="rich-text-content">
      <PortableText 
        value={content} 
        components={PortableTextComponent} 
        onMissingComponent={(message, options) => {
          console.warn("PortableText missing component:", message, options);
          return <span className="text-muted">[Missing component]</span>;
        }}
      />
    </div>
  );
};

// Provide both a named export (schema/components config) and a default component wrapper
export const RichTextComponent = PortableTextComponent;
export default RichTextComponentDefault;