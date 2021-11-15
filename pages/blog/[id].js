import { client } from "../../libs/client";
import { css } from "@emotion/react";
import HEAD from "next/head";
import React from "react";

export default function BlogId({ blog }) {
  return (
    <React.Fragment>
      <HEAD>
        <title>{blog.title}</title>
      </HEAD>
      <main css={main}>
        <h1 css={title}>{blog.title}</h1>
        <p css={publishedAt}>{blog.publishedAt}</p>
        <p>{blog.category && `${blog.category.name}`}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: `${blog.body}`,
          }}
          css={post}
        />
      </main>
    </React.Fragment>
  );
}

const main = css`
  width: 960px;
  margin: 0 auto;
`;
const title = css`
  margin-bottom: 20px;
`;
const publishedAt = css`
  margin-bottom: 40px;
`;
const post = css`
  & > h1 {
    font-size: 30px;
    font-weight: bold;
    margin: 40px 0 20px;
    background-color: #eee;
    padding: 10px 20px;
    border-radius: 5px;
  }

  & > h2 {
    font-size: 24px;
    font-weight: bold;
    margin: 40px 0 16px;
    border-bottom: 1px solid #ddd;
  }

  & > p {
    line-height: 1.8;
    letter-spacing: 0.2px;
  }

  & > ol {
    list-style-type: decimal;
    list-style-position: inside;
  }
`;

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
