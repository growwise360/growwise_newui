// Compliance disclaimer component for educational tools
export function ComplianceDisclaimer() {
  return (
    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 text-sm">
      <h3 className="font-bold text-yellow-900 mb-3">⚠️ Important Disclaimer</h3>

      <div className="text-yellow-800 space-y-3">
        <p>
          <strong>
            This checklist is a pattern-finding educational tool, not a clinical or educational diagnosis.
          </strong>{' '}
          It is designed to help parents identify potential academic patterns worth investigating further.
        </p>

        <p>
          <strong>This tool should not be used to:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Diagnose learning disabilities (ADHD, dyslexia, dyscalculia, etc.)</li>
          <li>Replace professional evaluation by a school psychologist or clinician</li>
          <li>Determine special education eligibility under IDEA or 504 plans</li>
          <li>Substitute for medical or psychological advice</li>
        </ul>

        <p>
          <strong>If you have concerns:</strong> Please consult with your child's teacher, school counselor,
          school psychologist, or pediatrician for professional evaluation.
        </p>

        <p className="text-xs text-yellow-700">
          By using this checklist, you acknowledge that you have read and understand this disclaimer and agree
          that GrowWise School is not liable for decisions made based on this tool's results.
        </p>
      </div>
    </div>
  )
}
