import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import Home from "./posts";

const fakePosts ={data: [
  {
    body: "take a look at my lovely cat dobby &#128525;",
    date: "2024-04-17T02:09:01.249Z",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "dobby",
    user: { userName: "abrarhussien" },
    _id: "661f2f3db392f5b8642da583",
  },
  {
    body: "this is a test",
    date: "2024-04-18T20:37:54.756Z",
    image: "https://m.media-amazon.com/images/I/51jyxatdxAL._AC_SL1000_.jpg",
    title: "hello",
    user: { userName: "zero" },
    _id: "662184a2cca980b92fa50a10",
  },
]};

const server = setupServer(
  http.get("*/posts", () => {
    return HttpResponse.json(fakePosts);
  })
);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<Home/>", () => {
  test("loading", () => {
    render(<Home />);
    expect(screen.getByTitle("loading")).toBeInTheDocument();
    expect(screen.queryByText(/there is no posts/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

  });

  test("fetch data", async () => {
    render(<Home />);
    await waitForElementToBeRemoved(() => screen.getByTitle("loading"));
    screen.debug()
    expect(screen.getAllByRole('post')).toHaveLength(fakePosts.data.length);

    fakePosts.data.forEach(post => {
      expect(
        screen.getByRole('heading', { level: 1, name: post.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(post.body)).toBeInTheDocument();
    });


   

  });

  test("error handling", async () => {
    server.use(
      http.get('*/posts', () => {
        return HttpResponse.json({}, { status: 500 });
      }),
    );
    render(<Home />);
    await waitForElementToBeRemoved(() => screen.getByTitle("loading"));

    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');
    expect(screen.queryByText(/there is no posts/i)).not.toBeInTheDocument();


  });

  test("no posts", async () => {
    server.use(
      http.get('*/posts', () => {
        return HttpResponse.json({data:[]});
      }),
    );
    render(<Home />);
    await waitForElementToBeRemoved(() => screen.getByTitle("loading"));

    expect(screen.getByText(/there is no posts/i)).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()


  });
});
