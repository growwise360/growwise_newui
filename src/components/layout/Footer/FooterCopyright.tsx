interface FooterCopyrightProps {
  copyright: string;
  curriculumAlignment?: string;
}

export default function FooterCopyright({
  copyright,
  curriculumAlignment,
}: FooterCopyrightProps) {
  return (
    <div className="mt-8 pt-4 text-center text-gray-500">
      {curriculumAlignment ? (
        <p className="mb-3 text-[12px] text-[#aaa]">{curriculumAlignment}</p>
      ) : null}
      <p>{copyright}</p>
    </div>
  );
}
