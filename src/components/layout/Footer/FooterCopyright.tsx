interface FooterCopyrightProps {
  copyright: string;
}

export default function FooterCopyright({ copyright }: FooterCopyrightProps) {
  return (
    <div className="mt-8 pt-4 text-center text-gray-500">
      <p>{copyright}</p>
    </div>
  );
}
