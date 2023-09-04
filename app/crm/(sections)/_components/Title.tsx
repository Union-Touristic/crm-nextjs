type Props = {
  children: React.ReactNode;
};

export default function Title({ children }: Props) {
  return (
    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
      {children}
    </h1>
  );
}
