interface Column {
  label: string;
  renderCell: (item: any) => any;
  align?: "center" | "left" | "right";
}

interface TableProps {
  datas: any[];
  columns: Column[];
}

const Table = ({ datas = [], columns }: TableProps) => {
  const alignClassName: Record<string, string> = {
    center: "text-center",
    left: "text-left",
    right: "text-right",
  };

  return (
    <div className="relative overflow-x-auto border-x border-secondary-medium/10 rounded">
      <table className="w-full table-auto">
        {/* heading table */}

        <thead>
          <tr>
            {columns.map((column, i) => (
              <th
                key={i}
                className="text-left bg-secondary text-secondary-medium/70 first-letter:uppercase border rounded p-2 text-nowrap text-base font-medium"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* body table */}

        <tbody className="bg-white">
          {datas.map((data, i) => (
            <tr key={i} className="bg-white hover:bg-secondary/50">
              {columns.map((column, j) => (
                <td
                  key={j}
                  className={`${
                    alignClassName[column.align || "left"]
                  } border-b text-base p-2 whitespace-nowrap text-secondary-medium/90`}
                >
                  {column.renderCell(data)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
