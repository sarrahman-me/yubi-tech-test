interface ILabel {
  children: React.ReactNode;
  htmlFor?: string;
}

export default function Label({ htmlFor, children }: ILabel) {
  return (
    <label
      htmlFor={htmlFor}
      className="capitalize antialiased text-secondary-medium/70"
    >
      {children}
    </label>
  );
}
