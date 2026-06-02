interface FooterCopyrightProps {
  copyright: string;
  curriculumAlignment?: string;
  legalDisclaimer?: string;
}

export default function FooterCopyright({
  copyright,
  curriculumAlignment,
  legalDisclaimer,
}: FooterCopyrightProps) {
  return (
    <div className="mt-8 pt-4 text-center text-gray-500">
      {curriculumAlignment ? (
        <p className="mb-3 text-[12px] text-[#aaa]">{curriculumAlignment}</p>
      ) : null}
      {legalDisclaimer ? (
        <p className="mb-3 text-[12px] text-[#aaa]">{legalDisclaimer}</p>
      ) : null}
      <p>{copyright}</p>
    </div>
  );
}
