export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[480px] min-w-[360px] h-screen m-auto flex flex-col justify-center px-4">
      {children}
    </div>
  );
}
