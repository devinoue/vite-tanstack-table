import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    console.log("はい");
    const getPosts = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data);
    };

    getPosts();
  }, []);

  const columns = [
    {
      accessorKey: "userId",
      header: "User ID",
    },
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "body",
      header: "Body",
    },
  ];

  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 30,
      },
    },
  });

  return (
    <div style={{ margin: "2em" }}>
      <h1>Posts List</h1>
      <p>Page Count:{table.getPageCount()}</p>
      <div style={{ display: "flex", marginBottom: "1em" }}>
        {Array.from({ length: table.getPageCount() }, (_, i) => i).map(
          (index) => (
            <div
              key={index}
              style={{
                backgroundColor:
                  table.getState().pagination.pageIndex === index ? "blue" : "",
                color:
                  table.getState().pagination.pageIndex === index
                    ? "white"
                    : "black",
                padding: "0 0.5em 0 0.5em",
                margin: "0 0.2em 0 0.2em",
                cursor: "pointer",
              }}
              onClick={() => table.setPageIndex(index)}
            >
              {index + 1}
            </div>
          )
        )}
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
